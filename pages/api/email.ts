import type { NextApiRequest, NextApiResponse } from 'next'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { validateEmailPayload } from 'utils/emailValidation'

interface SendEmailArgs {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  cc?: string | string[]
  replyTo?: string | string[]
}

async function sendEmail(
  ses: SESClient,
  { to, subject, html, text, cc, replyTo }: SendEmailArgs,
) {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
      ...(cc && { CcAddresses: Array.isArray(cc) ? cc : [cc] }),
    },
    Message: {
      Body: {
        ...(html && { Html: { Charset: 'UTF-8', Data: html } }),
        ...(text && { Text: { Charset: 'UTF-8', Data: text } }),
      },
      Subject: { Charset: 'UTF-8', Data: subject },
    },
    Source: process.env.SES_SENDER_EMAIL,
    ...(replyTo && {
      ReplyToAddresses: Array.isArray(replyTo) ? replyTo : [replyTo],
    }),
  })

  const result = await ses.send(command)
  console.log('Email sent successfully:', result.MessageId)
  return result
}

// --- Simple in-memory, per-IP rate limiter -------------------------------
// NOTE: per-instance only. On a multi-instance / serverless deployment each
// instance keeps its own counter, so this is a best-effort guard, not a hard
// global limit. Fine for this low-traffic contact form.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  )
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requiredVars = [
    'SES_ACCESS_KEY_ID',
    'SES_SECRET_ACCESS_KEY',
    'SES_REGION',
    'SES_SENDER_EMAIL',
    'SES_RECIPIENT_EMAIL',
    'SES_CC_EMAIL',
  ]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars)
    return res.status(500).json({ error: 'Server configuration error' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const forwarded = req.headers['x-forwarded-for']
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Please try again later.' })
  }

  const recipientEmail = process.env.SES_RECIPIENT_EMAIL.split(',').map(
    (email) => email.trim(),
  )

  const ccEmail = process.env.SES_CC_EMAIL.split(',').map((email) =>
    email.trim(),
  )

  try {
    const { subject, html, text, replyTo } = req.body || {}

    const validation = validateEmailPayload({
      recipientEmail,
      subject,
      html,
      text,
    })
    if (!validation.valid) {
      return res.status(validation.status).json({ error: validation.error })
    }

    // Construct the SES client only after env + payload validation.
    const ses = new SESClient({
      region: process.env.SES_REGION,
      credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
      },
    })

    const result = await sendEmail(ses, {
      to: recipientEmail,
      cc: ccEmail,
      subject,
      html,
      text,
      replyTo,
    })

    return res.status(200).json({
      message: 'Email sent successfully!',
      messageId: result.MessageId,
    })
  } catch (error) {
    console.error('Error sending email:', error)

    if (error.name === 'MessageRejected') {
      return res.status(400).json({
        error: 'Email rejected. Please verify your sender email is verified.',
      })
    }

    if (error.name === 'ThrottlingException') {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      })
    }

    return res.status(500).json({
      error: 'Failed to send email',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

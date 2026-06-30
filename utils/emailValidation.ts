export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Upper bounds to guard against abuse / oversized payloads (SES caps the raw
// message at 10MB; these are well under that and generous for a contact form).
export const MAX_SUBJECT_LENGTH = 500
export const MAX_BODY_LENGTH = 100_000

export function isValidEmail(email: string): boolean {
  return typeof email === 'string' && EMAIL_REGEX.test(email)
}

export interface EmailPayload {
  recipientEmail?: string | string[]
  subject?: string
  html?: string
  text?: string
}

export interface ValidationResult {
  valid: boolean
  status?: number
  error?: string
}

/**
 * Pure validation of an outgoing-email request. Returns the HTTP status and
 * message to use on failure, so the API handler stays thin and this logic is
 * unit-testable without pulling in the AWS SDK.
 */
export function validateEmailPayload({
  recipientEmail,
  subject,
  html,
  text,
}: EmailPayload): ValidationResult {
  if (!recipientEmail || !subject || (!html && !text)) {
    return {
      valid: false,
      status: 400,
      error:
        "Missing required fields: 'to', 'subject', and either 'html' or 'text'",
    }
  }

  const emails = Array.isArray(recipientEmail)
    ? recipientEmail
    : [recipientEmail]
  if (!emails.every(isValidEmail)) {
    return { valid: false, status: 400, error: 'Invalid email format' }
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    return { valid: false, status: 413, error: 'Subject is too long' }
  }

  if (
    (html && html.length > MAX_BODY_LENGTH) ||
    (text && text.length > MAX_BODY_LENGTH)
  ) {
    return { valid: false, status: 413, error: 'Message body is too long' }
  }

  return { valid: true }
}

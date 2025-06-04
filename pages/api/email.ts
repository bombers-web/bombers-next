import AWS from "aws-sdk";

const ses = new AWS.SES({
  accessKeyId: process.env.SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
});

async function sendEmail({ to, subject, html, text }) {
  try {
    const params = {
      Destination: {
        ToAddresses: Array.isArray(to) ? to : [to],
      },
      Message: {
        Body: {
          ...(html && {
            Html: {
              Charset: "UTF-8",
              Data: html,
            },
          }),
          ...(text && {
            Text: {
              Charset: "UTF-8",
              Data: text,
            },
          }),
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: process.env.SES_SENDER_EMAIL,
    };

    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  const requiredVars = [
    "SES_ACCESS_KEY_ID",
    "SES_SECRET_ACCESS_KEY",
    "SES_REGION",
    "SES_SENDER_EMAIL",
    "SES_RECIPIENT_EMAIL",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars);
    return res.status(500).json({
      error: "Server configuration error",
    });
  }

  const recipientEmail = process.env.SES_RECIPIENT_EMAIL.split(",").map(
    (email) => email.trim()
  );

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { subject, html, text } = req.body;

    // Input validation
    if (!recipientEmail || !subject || (!html && !text)) {
      return res.status(400).json({
        error:
          "Missing required fields: 'to', 'subject', and either 'html' or 'text'",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emails = Array.isArray(recipientEmail)
      ? recipientEmail
      : [recipientEmail];
    if (!emails.every((email) => emailRegex.test(email))) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const result = await sendEmail({ to: recipientEmail, subject, html, text });

    return res.status(200).json({
      message: "Email sent successfully!",
      messageId: result.MessageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    // Return appropriate error messages based on error type
    if (error.code === "MessageRejected") {
      return res.status(400).json({
        error: "Email rejected. Please verify your sender email is verified.",
      });
    }

    if (error.code === "ThrottlingException") {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Failed to send email",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

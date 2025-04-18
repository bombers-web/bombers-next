import AWS from "aws-sdk";

const ses = new AWS.SES({
  accessKeyId: process.env.SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
});

async function sendEmail({ to, subject, html, text }) {
  const params = {
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to], // Ensure 'to' is an array
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: {
          Charset: "UTF-8",
          Data: text,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.SES_SENDER_EMAIL,
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent:", data);
    return data;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, html, text } = req.body;

    try {
      await sendEmail({ to, subject, html, text });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

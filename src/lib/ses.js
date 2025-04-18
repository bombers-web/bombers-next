// lib/ses.js
import AWS from "aws-sdk";

const ses = new AWS.SES({
  accessKeyId: process.env.SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
});

export async function sendEmail({ to, subject, html, text }) {
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
    // Source: "marcome@stlouisbombers.com",
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

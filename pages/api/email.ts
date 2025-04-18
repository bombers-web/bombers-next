// pages/api/send-email.js
import { sendEmail } from "src/lib/ses.js";

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

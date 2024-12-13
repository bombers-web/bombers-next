import * as sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: "which contains some text",
    // html: "Name: \nEmail: \nPhone Number: \nMessage: ",
    html: req.body.message,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent`);
  } catch (error) {
    console.error(error);
  }
}

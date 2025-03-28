import * as sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  if (req.method === "POST") {
    const { to, from, subject, message } = req.body;
    const msg = {
      to: to,
      from: from,
      subject: subject,
      html: message,
    };
    try {
      await sgMail.send(msg);
      // return NextResponse.json({}, { status: 200 });
      res.status(200).json({ message: "Hello from the API!" });
    } catch (error) {
      res.status(200).json({ message: "Oh No!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

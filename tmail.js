import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const test = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "aryansingh81104@gmail.com",
      subject: "SMTP Test Email",
      text: "This is a test email from Node.js backend.",
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("SMTP Test Error:", err);
  }
};

test();

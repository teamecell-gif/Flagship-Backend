import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({ to, name, ticketNo, pdfBuffer }) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your Event Ticket 🎟",
    text: `Hi ${name},\n\nThanks for registering! Your ticket number is ${ticketNo}.`,
    attachments: [
      {
        filename: `${ticketNo}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

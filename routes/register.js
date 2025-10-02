import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import {generateTicketNo} from "../utils/ticketGenerator.js";

import { createQRCode } from "../services/qrService.js";
import { createPdfBuffer } from "../services/pdfService.js";
import { sendMail } from "../services/mailService.js";

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;
    if (!name || !email || !phone || !college) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // generate ticket
    const ticketNo = await generateTicketNo();

    // save user
    const user = new User({ name, email, phone, college, ticketNo });
    await user.save();

    // make QR
    const qrPayload = JSON.stringify({ name, email, phone, college, ticketNo });
    const qrBuffer = await createQRCode(qrPayload);

    // make PDF
    const pdfBuffer = await createPdfBuffer({ name, email, phone, college, ticketNo, qrBuffer });

    // send mail
    await sendMail({ to: email, name, ticketNo, pdfBuffer });

    res.json({ message: "Registration successful! Ticket sent to email.", ticketNo });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
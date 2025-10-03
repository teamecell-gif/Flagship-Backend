// routes/register.js
import express from "express";
import { User } from "../models/User.js";
import { generateTicketPDFBuffer } from "../services/qrService.js";

const router = express.Router();

function generateTicket() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticket = "";
  for (let i = 0; i < 4; i++) {
    ticket += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticket;
}

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;
    const ticketNo = generateTicket();

    // Save user in DB
    const newUser = new User({ name, email, phone, college, ticketNo });
    await newUser.save();

    // Generate PDF in memory
    const pdfBuffer = await generateTicketPDFBuffer({ name, email, phone, college, ticketNo });

    // Send PDF as download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Ticket-${ticketNo}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(" Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

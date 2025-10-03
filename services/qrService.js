// services/qrService.js
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export async function generateTicketPDFBuffer({ name, email, phone, college, ticketNo }) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      // Collect chunks into buffer
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // QR Data
      const qrData = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCollege: ${college}\nTicket: ${ticketNo}`;
      const qrImage = await QRCode.toDataURL(qrData);

      // Header
      doc.fontSize(22).text("--- Flagship'25 Ticket ---", { align: "center" });
      doc.moveDown();

      // Details
      doc.fontSize(14).text(`Name: ${name}`);
      doc.text(`Email: ${email}`);
      doc.text(`Phone: ${phone}`);
      doc.text(`College: ${college}`);
      doc.text(`Ticket No: ${ticketNo}`);
      doc.moveDown();

      // QR Code
      const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
      const qrBuffer = Buffer.from(base64Data, "base64");
      doc.image(qrBuffer, { fit: [150, 150], align: "center" });

      doc.moveDown();

      // Custom Message
      doc.fontSize(14).text("Congratulations for registering! ", { align: "center" });
      doc.moveDown();
      doc.text(
        "We will be waiting for you at the Auditorium at 5:30 PM.\n" +
        "Please bring this ticket with you for entry.\n\n" +
        " This PDF is your ticket, show it at the counter and enter.",
        { align: "center" }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

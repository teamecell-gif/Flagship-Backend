// ticketTest.js
import PDFDocument from "pdfkit";
import fs from "fs";
import QRCode from "qrcode";

// Ticket generator function
function generateTicket() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticket = "";
  for (let i = 0; i < 4; i++) {
    ticket += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticket;
}

async function generateTicketPDF(name, email, phone, college) {
  const generatedTicketNo = generateTicket(); // Generate ticket number
  console.log("Generated Ticket No:", generatedTicketNo);

  const doc = new PDFDocument();
  const filePath = `Ticket-${generatedTicketNo}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  // QR code data
  const qrData = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCollege: ${college}\nTicket: ${generatedTicketNo}`;
  const qrImage = await QRCode.toDataURL(qrData);

  // Add header
  doc.fontSize(20).text("🎟 Event Ticket 🎟", { align: "center" });
  doc.moveDown();

  // Add details
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Phone: ${phone}`);
  doc.text(`College: ${college}`);
  doc.text(`Ticket No: ${generatedTicketNo}`);
  doc.moveDown();

  // Add QR code
  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(base64Data, "base64");
  doc.image(qrBuffer, { fit: [150, 150], align: "center" });
  doc.moveDown();
  doc.text("✅ Thank you for registering!", { align: "center" });

  doc.end();
  console.log(`✅ PDF generated: ${filePath}`);
}

// Run test
generateTicketPDF("Aryan Singh", "aryan@example.com", "9876543210", "NIT Nagpur");
// qrtest.js
import PDFDocument from "pdfkit";
import fs from "fs";
import QRCode from "qrcode";

async function generateQRTestPDF() {
  const doc = new PDFDocument();
  const filePath = "qrtest.pdf";
  doc.pipe(fs.createWriteStream(filePath));

  // Generate QR code (base64 image)
  const qrData = "Name: Aryan Singh | Email: aryan@example.com | Phone: 1234567890 | College: NIT Nagpur | Tkt: AB12";
  const qrImage = await QRCode.toDataURL(qrData);

  // Add Title
  doc.fontSize(20).text("QR Code Test PDF", { align: "center" });
  doc.moveDown();

  // Embed QR code into PDF
  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(base64Data, "base64");
  doc.image(qrBuffer, {
    fit: [200, 200],
    align: "center",
    valign: "center",
  });

  doc.moveDown();
  doc.fontSize(14).text("Scan the QR above to see embedded details.", { align: "center" });
  doc.moveDown();
  doc.text("Ticket No: AB12", { align: "center" });

  doc.end();
  console.log(` QR PDF generated: ${filePath}`);
}

generateQRTestPDF();
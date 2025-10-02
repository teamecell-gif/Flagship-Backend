import PDFDocument from "pdfkit";

export function createPdfBuffer({ name, email, phone, college, ticketNo, qrBuffer }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      doc.fontSize(22).text("🎟 Event Ticket", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Name: ${name}`);
      doc.text(`Email: ${email}`);
      doc.text(`Phone: ${phone}`);
      doc.text(`College: ${college}`);
      doc.moveDown();

      if (qrBuffer) {
        const qrSize = 150;
        const x = (doc.page.width - qrSize) / 2;
        doc.image(qrBuffer, x, doc.y, { width: qrSize, height: qrSize });
        doc.moveDown(2);
      }

      doc.fontSize(18).text(`Ticket No: ${ticketNo}`, { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(
        "Thank you for registering. Please present this ticket at the entrance.",
        { align: "center" }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

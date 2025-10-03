// pdftest.js (ESM version)
import PDFDocument from "pdfkit";
import fs from "fs";

function generateTestPDF() {
  const doc = new PDFDocument();

  // Save PDF file locally
  const filePath = "test.pdf";
  doc.pipe(fs.createWriteStream(filePath));

  // Add some sample content
  doc.fontSize(20).text("PDF Test File", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("This is just a test to check if PDF generation works.");
  doc.moveDown();
  doc.text("Name: Aryan Singh");
  doc.text("Email: aryan@example.com");
  doc.text("College: NIT Nagpur");

  // Finalize
  doc.end();

  console.log( `PDF generated successfully: ${filePath}`);
}

generateTestPDF();
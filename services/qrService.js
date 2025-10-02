import QRCode from "qrcode";

export async function createQRCode(data) {
  const dataUrl = await QRCode.toDataURL(data);
  const base64 = dataUrl.split(",")[1];
  return Buffer.from(base64, "base64");
}

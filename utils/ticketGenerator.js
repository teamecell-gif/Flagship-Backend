import { User } from "../models/User.js";  // 👈 named import

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode() {
  let s = "";
  for (let i = 0; i < 4; i++) {
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return s;
}

export async function generateTicketNo() {
  while (true) {
    const t = generateCode();
    const exists = await User.findOne({ ticketNo: t });
    if (!exists) return t;
  }
}

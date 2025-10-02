import mongoose from "mongoose";
import { User } from "./models/User.js";

mongoose.connect("t");

const test = async () => {
  const u = new User({ name: "Test User", email: "test@example.com", phone: "1234567890", college: "XYZ", ticketNo: "ABCD" });
  await u.save();
  console.log("Saved successfully");
  mongoose.disconnect();
};

test();

import mongoose from "mongoose";
// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  ticketNo: String,
}, { timestamps: true });

userSchema.index({ name: 1, phone: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
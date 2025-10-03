import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import registerRoute from "./routes/register.js";

const app = express();
app.use(express.json());

// DB connect
connectDB();
app.use(cors({
  origin: ["http://localhost:5173","https://flagship.ecellvnit.org"],  // your frontend URL
  methods: ["GET", "POST"]
}));

// Routes
app.use("/register", registerRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...", process.env.PORT || 5000);
});

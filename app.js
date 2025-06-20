// app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cardsRouter from "./routes/cards.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB..."))
  .catch((err) => console.error("❌ Could not connect to MongoDB...", err));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

// 404 handler for missing endpoints
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));

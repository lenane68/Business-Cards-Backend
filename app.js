// app.js
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cardsRoutes from "./routes/cards.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardsRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

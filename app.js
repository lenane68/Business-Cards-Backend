import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cardsRouter from "./routes/cards.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

app.use((req, res) => res.status(404).send("Endpoint not found"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB…"))
  .catch(console.error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}…`));

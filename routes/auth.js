import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  console.log("🔍 Login attempt:", email, password);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❗ No user found for this email");
    return res.status(400).send("Invalid credentials");
  }

  console.log("🔐 Stored hash:", user.password);

  const valid = await bcrypt.compare(password, user.password);
  console.log("✅ bcrypt.compare result:", valid);

  if (!valid) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_KEY
  );
  console.log("🎟️ Login successful, token:", token);

  res.send({ token });
});

export default router;

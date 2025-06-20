import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY);
  res.send({ token });
});

export default router;

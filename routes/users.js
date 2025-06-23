import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { password, email, ...rest } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already registered.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...rest,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ _id: user._id, email: user.email });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

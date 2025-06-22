import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const payload = {
      _id: user._id,
      email: user.email,
      isBusiness: user.isBusiness|| false,
      isAdmin: user.isAdmin || false,
      name: user.name,
    };

    console.log("USER FROM DB:", user);
    console.log("JWT payload being sent:", payload);

    const token = jwt.sign(payload, process.env.JWT_KEY);

    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;

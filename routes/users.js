import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

router.patch("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send("User not found");
  res.send(updated);
});

export default router;

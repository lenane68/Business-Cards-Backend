import express from "express";
import Card from "../models/Card.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cards = await Card.find();
  res.send(cards);
});

router.post("/", async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.status(201).send(card);
});

export default router;

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const Card = require("../models/card");


const cardSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string().min(5).max(255).required().email(),
  web: Joi.string().min(5).max(255).allow(""),
  image: Joi.string().min(5).max(1024).allow(""),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().allow(null, "")
  }).required()
});


router.post("/", auth, async (req, res) => {
  const { error } = cardSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    ...req.body,
    user_id: req.user._id
  });

  card = await card.save();
  res.status(201).send(card);
});


router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found.");
    res.send(card);
  } catch (err) {
    res.status(400).send("Invalid ID format.");
  }
});


module.exports = router;

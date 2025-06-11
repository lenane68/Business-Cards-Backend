const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
  image: String,
  address: {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number
  },
  user_id: mongoose.Schema.Types.ObjectId
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;

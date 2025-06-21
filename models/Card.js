import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^0[2-9]\d{7,8}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  web: {
    type: String,
    default: "",
    trim: true
  },
  image: {
    url: {
      type: String,
      trim: true,
      default: ""
    },
    alt: {
      type: String,
      trim: true,
      default: ""
    }
  },
  address: {
    state: { type: String, trim: true, default: "" },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    houseNumber: { type: Number, required: true },
    zip: { type: String, trim: true, default: "" },
  },
  bizNumber: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  }
}, {
  timestamps: true
});

const Card = mongoose.model("Card", cardSchema);
export default Card;

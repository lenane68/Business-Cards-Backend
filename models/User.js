import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first: String,
  middle: String,
  last: String,
  phone: String,
  email: String,
  password: String,
  image: String,
  alt: String,
  state: String,
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: String,
  biz: Boolean,
  role: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);

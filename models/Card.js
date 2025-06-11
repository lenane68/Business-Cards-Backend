import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  imageUrl: String,
  biz: Boolean,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Card", cardSchema);

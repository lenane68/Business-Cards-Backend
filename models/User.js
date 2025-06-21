import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true, minlength: 2, trim: true },
    middle: { type: String, trim: true, default: "" },
    last: { type: String, required: true, minlength: 2, trim: true },
  },
  phone: {
    type: String,
    required: true,
    match: /^0[2-9]\d{7,8}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 9,
  },
  image: {
    url: {
      type: String,
      trim: true,
      default: "",
    },
    alt: {
      type: String,
      trim: true,
      default: "",
    },
  },
  address: {
    state: { type: String, trim: true, default: "" },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    houseNumber: { type: Number, required: true },
    zip: { type: String, trim: true, default: "" },
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;

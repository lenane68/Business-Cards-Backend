import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import _ from "lodash";

const router = express.Router();

// Create a new user
router.post("/", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, [
      "first", "middle", "last",
      "phone", "email", "password",
      "image", "alt",
      "state", "country", "city",
      "street", "houseNumber", "zip",
      "biz"
    ]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.status(201).send(_.pick(user, ["_id", "first", "last", "email", "biz"]));
  } catch (err) {
    next(err);
  }
});

export default router;

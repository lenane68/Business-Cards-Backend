const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const _ = require("lodash");

// Register a new user
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "name",
      "phone",
      "email",
      "password",
      "image",
      "address",
      "isBusiness",
      "isAdmin"
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(201).send(
    _.pick(user, ["_id", "name", "email", "isBusiness", "isAdmin"])
  );
});

module.exports = router;

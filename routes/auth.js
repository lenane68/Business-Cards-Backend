const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // adjust to your path

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        biz: user.biz,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        name: user.name,
      },
      process.env.JWT_SECRET
    );

    res.send(token);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;

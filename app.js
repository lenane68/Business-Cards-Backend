const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB..."))
  .catch((err) => console.error("❌ Could not connect to MongoDB...", err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
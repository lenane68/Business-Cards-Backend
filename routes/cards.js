import express from "express";
import auth from "../middleware/auth.js";
import validateCard from "../middleware/validateCard.js";
import Card from "../models/Card.js";
import generateBizNumber from "../utils/generateBizNumber.js";
import permit from "../middleware/permit.js";

const router = express.Router();

// יצירת כרטיס חדש
router.post("/", auth, permit("biz"), validateCard, async (req, res, next) => {
  try {
    const bizNumber = await generateBizNumber();
    const card = new Card({ ...req.body, bizNumber, user_id: req.user._id });
    await card.save();
    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
});

// שליפת כל הכרטיסים
router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

// שליפת כרטיסים של המשתמש המחובר
router.get("/my-cards", auth, async (req, res, next) => {
  try {
    const cards = await Card.find({ user_id: req.user._id });
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

// שליפת כרטיס לפי מזהה
router.get("/:id", async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");
    res.send(card);
  } catch (err) {
    next(err);
  }
});

// עדכון כרטיס
router.put("/:id", auth, permit("biz", "admin"), validateCard, async (req, res, next) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true }
    );
    if (!card) return res.status(404).send("Card not found or access denied");
    res.send(card);
  } catch (err) {
    next(err);
  }
});

// מחיקת כרטיס
router.delete("/:id", auth, permit("biz", "admin"), async (req, res, next) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { user_id: req.user._id },
        req.user.role === "admin" ? {} : null
      ]
    });
    if (!card) return res.status(404).send("Card not found or access denied");
    res.send(card);
  } catch (err) {
    next(err);
  }
});

// לייק/אנלייק
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("Card not found");

    const liked = card.likes.includes(req.user._id);
    if (liked) {
      card.likes = card.likes.filter((id) => id.toString() !== req.user._id);
    } else {
      card.likes.push(req.user._id);
    }

    await card.save();
    res.send(card);
  } catch (err) {
    next(err);
  }
});

export default router;

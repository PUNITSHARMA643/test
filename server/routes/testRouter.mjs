import express from "express";
import { getDb } from "../db/conn.mjs";
import Test from "../models/test.mjs";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDb().connection;
    const tests = await db.collection("tests").find({}).toArray();
    return res.status(200).json(tests);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDb().connection;
    const { subject, numQuestions, mcqCount, shortCount, longCount, duration, instructions, sumQuestions } = req.body;

    const test = new Test({
      subject,
      numQuestions,
      mcqCount,
      shortCount,
      longCount,
      duration,
      instructions,
      sumQuestions,
    });

    await test.save();
    return res.status(201).json({ message: "Test added successfully", _id: test._id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = getDb().connection;
    const { subject, numQuestions, mcqCount, shortCount, longCount, duration, instructions, sumQuestions } = req.body;

    const test = await db.collection("tests").updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        $set: { subject, numQuestions, mcqCount, shortCount, longCount, duration, instructions, sumQuestions },
      }
    );

    if (test.modifiedCount === 0) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ message: "Test updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = getDb().connection;
    const test = await db.collection("tests").deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (test.deletedCount === 0) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
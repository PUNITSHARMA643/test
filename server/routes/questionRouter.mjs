import express from "express";
import { getDb } from "../db/conn.mjs";
import Question from "../models/question.mjs";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await getDb().connection;
    const questions = await db.collection("questions").find({}).toArray();
    return res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = await getDb().connection;
    const { title, type, options, shortAnswer, longAnswer, correctOption, marks, user } = req.body;

    console.log("Received data:", req.body);

    const question = new Question({
      title,
      type,
      options,
      shortAnswer,
      longAnswer,
      correctOption,
      marks,
      user,
    });

    console.log("Question to be saved:", question);

    await question.save();
    return res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    console.error("Error adding question:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = await getDb().connection;
    const { title, type, options, shortAnswer, longAnswer, correctOption, marks, user } = req.body;
    console.log("Updating question with ID:", req.params.id);
    const question = await db.collection("questions").updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        $set: { title, type, options, shortAnswer, longAnswer, correctOption, marks, user },
      }
    );

    if (question.modifiedCount === 0) {
      console.log("Question not found with ID:", req.params.id);
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    console.log("Error updating question:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb().connection;
    const question = await db
      .collection("questions")
      .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (question.deletedCount === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
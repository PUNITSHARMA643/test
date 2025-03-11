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
    const { title, options, correctOption, marks, user } = req.body;

    if (!title || !options || !correctOption || !marks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = new Question({
      title,
      options,
      correctOption,
      marks,
      user,
    });

    await question.save();
    return res.status(201).json({ 
      message: "Question added successfully", 
      _id: question._id 
    });
  } catch (err) {
    console.error("Error adding question:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, options, correctOption, marks, user } = req.body;

    if (!title || !options || !correctOption || !marks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { title, options, correctOption, marks, user },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    console.error("Error updating question:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
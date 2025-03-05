import express from "express";
import { getDb } from "../db/conn.mjs";
import Book from "../models/book.mjs";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await getDb().connection;
    const syllabus = await db.collection("books").find({}).toArray();
    return res.status(200).json(syllabus);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = await getDb().connection;
    const { title, className, subject, numOfChapters, chapters, duration, totalMarks } = req.body;

    const syllabus = new Book({
      title,
      className,
      subject,
      numOfChapters,
      chapters,
      duration, // New field
      totalMarks, // New field
    });

    await syllabus.save();
    return res.status(201).json({ message: "Syllabus added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = await getDb().connection;
    const { title, className, subject, numOfChapters, chapters, duration, totalMarks } = req.body;
    const syllabus = await db
      .collection("books")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        { $set: { title, className, subject, numOfChapters, chapters, duration, totalMarks } }
      );

    if (syllabus.modifiedCount === 0) {
      return res.status(404).json({ message: "Syllabus not found" });
    }
    return res.status(200).json({ message: "Syllabus updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb().connection;
    const result = await db
      .collection("books")
      .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    return res.status(200).json({ message: "Syllabus deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
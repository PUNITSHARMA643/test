import express from "express";
import { getDb } from "../db/conn.mjs";
import TakeTest from "../models/takeTest.mjs";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth.mjs";
import Question from "../models/question.mjs";

const router = express.Router();

router.get("/user-tests", requireAuth, async (req, res) => {
  try {
    // Use direct MongoDB query since Mongoose might be having issues
    const db = await getDb();
    const collection = db.collection("taketests");
    
    const tests = await collection
      .find({ 
        userId: new mongoose.Types.ObjectId(req.user.id) 
      })
      .toArray();

    if (!tests) {
      return res.status(200).json({
        success: true,
        tests: []
      });
    }

    return res.status(200).json({
      success: true,
      tests: tests
    });
  } catch (err) {
    console.error("Detailed error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to fetch tests",
      error: err.message 
    });
  }
});


router.post("/start", requireAuth, async (req, res) => {
  try {
    const { testId } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated properly" });
    }

    const userId = req.user.id;

    const takeTest = new TakeTest({
      userId: new mongoose.Types.ObjectId(userId),
      testId: new mongoose.Types.ObjectId(testId),
      answers: {},
      completed: false
    });

    await takeTest.save();
    return res.status(201).json({ 
      message: "Test started successfully", 
      takeTestId: takeTest._id 
    });
  } catch (err) {
    console.error("Error starting test:", err);
    return res.status(500).json({ 
      message: "Internal server error",
      error: err.message 
    });
  }
});


router.get("/results/:takeTestId", requireAuth, async (req, res) => {
  try {
    const takeTest = await TakeTest.findOne({
      _id: new mongoose.Types.ObjectId(req.params.takeTestId),
      userId: new mongoose.Types.ObjectId(req.user.id)
    }).populate('testId');

    if (!takeTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({
      score: takeTest.score,
      totalQuestions: Object.keys(takeTest.answers).length,
      answerResults: takeTest.answerResults,
      submittedAt: takeTest.submittedAt,
      testDetails: takeTest.testId
    });
  } catch (err) {
    console.error("Error fetching test results:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
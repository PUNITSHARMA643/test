import express from "express";
import { getDb } from "../db/conn.mjs";
import Test from "../models/test.mjs";



const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDb().connection;
    const tests = await db.collection("tests").find({}).toArray();
    //console.log(tests)
    return res.status(200).json(tests);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", (req, res) => {
  try {
    const db = getDb().connection;
    const {
      subject,
      numQuestions,
      mcqCount,
      shortCount,
      longCount,
      duration,
      instructions,
      sumQuestions,
      isValid,
      // //title,
      // subject,
      // //class: className,
      // //user,
      // //questions,
      // duration,
      // //marks,
      // instructions,
    } = req.body;

    const test = new Test({
      subject,
      numQuestions,
      mcqCount,
      shortCount,
      longCount,
      duration,
      instructions,
      sumQuestions,
      isValid,
      // //title,
      // subject,
      // //class: className,
      // //user,
      // //questions,
      // duration,
      // //marks,
      // instructions,
    });

    test.save();
    return res.status(201).json({ message: "Test added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const db = getDb().connection;
    const {
      subject,
      numQuestions,
      mcqCount,
      shortCount,
      longCount,
      duration,
      instructions,
      sumQuestions,
      isValid,
      // //title,
      // subject,
      // //class: className,
      // //user,
      // //questions,
      // duration,
      // //marks,
      // instructions,
    } = req.body;

    const test = db.collection("tests").updateOne(
      { _id: req.params.id },
      {
        $set: {
          subject,
          numQuestions,
          mcqCount,
          shortCount,
          longCount,
          duration,
          instructions,
          sumQuestions,
          isValid,
          // //title,
          // subject,
          // //class: className,
          // //user,
          // //questions,
          // duration,
          // //marks,
          // instructions,
        },
      }
    );
    return res.status(200).json({ message: "Test updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const db = getDb().connection;
    const test = db.collection("tests").deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

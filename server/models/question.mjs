import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], required: false },
  shortAnswer: { type: String, required: false },
  longAnswer: { type: String, required: false },
  correctOption: { type: String, required: false },
  marks: { type: Number, required: true },
  user: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
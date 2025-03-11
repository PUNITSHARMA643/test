import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
  marks: { type: Number, required: true },
  user: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
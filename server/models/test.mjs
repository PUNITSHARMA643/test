import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  instructions: [{ type: String }],
});

const Test = mongoose.model('Test', testSchema);

export default Test;
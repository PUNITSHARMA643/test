import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const takeTestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  answers: {
    type: Map,
    of: String,
    default: {}
  },
  answerResults: {
    type: Map,
    of: {
      userAnswer: String,
      isCorrect: Boolean,
      marks: Number,
      correctAnswer: String
    },
    default: {}
  },
  score: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const TakeTest = mongoose.model('TakeTest', takeTestSchema);
export default TakeTest;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const book = new Schema({
    title: { type: String, required: true },
    numOfChapters: { type: Number, required: true },
    chapters: { type: Array, required: true },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    duration: { type: Number, required: true }, // New field
    totalMarks: { type: Number, required: true }, // New field
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', book);

export default Book;
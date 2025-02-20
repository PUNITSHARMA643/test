import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const test = new Schema({
    // title: {type: String, required: true},
    // subject: {type: String, required: true},
    // class: {type: String, required: true},
    // user: {type: Schema.Types.ObjectId, ref: 'User'},
    // createdAt: { type: Date, default: Date.now },
    // questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    // duration: {type: Number, required: true},
    // marks: {type: Number, required: true},
    // instructions: [{type: String}],
    subject:{type:String,required:true},
    numQuestions:{type:Number,required:true},
    mcqCount:{type:Number,required:true},
    longCount:{type:Number,required:true},
    duration:{type:Number,required:true},
    instructions:[{type:String}],
    sumQuestions:{type:Number,required:true},
    isValid:[{type:Boolean}],
});

const Test = mongoose.model('Test', test);

export default Test;

import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
    question: String,
    options: [String],
    correctAnswer: String
});

const testSchema = new Schema({
    title: String,
    questions: [questionSchema]
});

export default model('Test', testSchema);    
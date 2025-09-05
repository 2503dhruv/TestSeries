import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
    studentName: String,
    studentEmail: String,
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    score: Number,
    totalQuestions: Number,
    timestamp: { type: Date, default: Date.now }
});

export default model('Result', resultSchema);
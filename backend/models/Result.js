const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentName: String,
    studentEmail: String,
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    score: Number,
    totalQuestions: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
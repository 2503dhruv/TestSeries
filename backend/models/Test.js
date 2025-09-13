// models/Test.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  section: { type: String, required: true },     
  difficulty: { type: String, required: true },  
  questions: [questionSchema],
});

export default mongoose.model("Test", testSchema);

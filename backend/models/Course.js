import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  solution: { type: String, required: true },
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lessons: [lessonSchema],
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  createdBy: { type: String, default: "Faculty" }, // Optional: to track who created it
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);

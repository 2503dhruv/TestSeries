import { Router } from "express";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import Course from "../models/Course.js";
import adminAuth from "../middleware/adminauth.js";

const router = Router();

router.get("/tests", adminAuth, async (req, res) => {
  try {
    const tests = await Test.find({}, "title section difficulty");
    res.json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/tests/:id", adminAuth, async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    await Result.deleteMany({ testId: req.params.id });
    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/results", adminAuth, async (req, res) => {
  try {
    const results = await Result.find().populate("testId", "title section");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/results/:testId", adminAuth, async (req, res) => {
  try {
    const results = await Result.find({ testId: req.params.testId });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found for this test." });
    }
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/courses", adminAuth, async (req, res) => {
  try {
    const courses = await Course.find({}, "title description lessons");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/courses/:id", adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


export default router;

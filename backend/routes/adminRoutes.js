import { Router } from "express";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
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

// User management routes
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/users", adminAuth, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!['student', 'faculty', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be student, faculty, or admin' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      message: `${role} account created successfully`,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/users/:id", adminAuth, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!['student', 'faculty', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be student, faculty, or admin' });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use by another user' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User updated successfully",
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;

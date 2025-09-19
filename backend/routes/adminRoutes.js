import { Router } from "express";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import adminAuth from "../middleware/adminauth.js";

const router = Router();

// ✅ Admin: Get all tests
router.get("/tests", adminAuth, async (req, res) => {
  try {
    const tests = await Test.find({}, "title section difficulty");
    res.json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ Admin: Delete a test
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

export default router;

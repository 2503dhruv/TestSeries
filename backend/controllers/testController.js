import Test from "../models/Test.js";
import Result from "../models/Result.js";

// Get all tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload test (for now simple, CSV/XLSX parsing optional)
export const uploadTest = async (req, res) => {
  try {
    const { title } = req.body;
    const newTest = new Test({ title, questions: [] });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete test
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    await Result.deleteMany({ testId: req.params.id });

    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

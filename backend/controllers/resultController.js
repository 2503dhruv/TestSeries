import Result from "../models/Result.js";
import Test from "../models/Test.js";

// Get all results
const getResults = async (req, res) => {
  try {
    const results = await Result.find().populate("testId", "title");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit test answers
const submitTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, studentEmail, answers } = req.body;

    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const result = new Result({
      studentName,
      studentEmail,
      testId: id,
      score,
      totalQuestions: test.questions.length
    });

    await result.save();
    res.json({ score, totalQuestions: test.questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getResults, submitTest };

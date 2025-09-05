import Test from "../models/Test";

// Get all tests
const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get test by ID
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload new test (later we can parse CSV/XLSX here)
const uploadTest = async (req, res) => {
  try {
    const { title } = req.body;
    const newTest = new Test({ title, questions: [] }); // Empty for now
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getTests, getTestById, uploadTest };

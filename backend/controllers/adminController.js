const Test = require("../models/Test"); 


exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    console.error("Error fetching tests:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete test by ID
exports.deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    await Test.findByIdAndDelete(id);
    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    console.error("Error deleting test:", err);
    res.status(500).json({ error: "Server error" });
  }
};

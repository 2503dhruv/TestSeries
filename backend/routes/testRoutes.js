  import { Router } from 'express';
  import multer from 'multer';
  import { Types } from 'mongoose';
  import pkg from 'xlsx';
  import Test from '../models/Test.js';
  import Result from '../models/Result.js';
  import mongoose from "mongoose";

  const { ObjectId } = Types;
  const { readFile, utils } = pkg;
  const router = Router();
  const upload = multer({ dest: 'uploads/' });

router.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "title", maxCount: 1 },
    { name: "section", maxCount: 1 },
    { name: "difficulty", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const filePath = req.files.file[0].path;
      const workbook = readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = utils.sheet_to_json(sheet);

      const questions = rows.map((row) => ({
        question: row.Question,
        options: [row.OptionA, row.OptionB, row.OptionC, row.OptionD],
        correctAnswer: row.CorrectAnswer,
      }));

      const test = new Test({
        title: req.body.title,
        section: req.body.section,
        difficulty: req.body.difficulty,
        questions,
      });

      await test.save();
      res.json({ success: true, test });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Failed to upload test" });
    }
  }
);
  



  router.get('/tests', async (req, res) => {
    try {
      const tests = await Test.find({}, 'title section difficulty');
      res.json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  // ---------------- Get Test by ID ----------------
  router.get('/tests/:id', async (req, res) => {
    try {
      const test = await Test.findById(req.params.id);
      if (!test) return res.status(404).json({ message: 'Test not found' });
      res.json(test);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  // ---------------- Submit Test ----------------
router.post('/submit/:id', async (req, res) => {
  try {
    const { studentName, studentEmail, answers } = req.body;
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    let score = 0;
    test.questions.forEach((q) => {
      const qId = q._id.toString(); 
      if (answers[qId] === q.correctAnswer) score++;
    });

    const newResult = new Result({
      studentName,
      studentEmail,
      testId: req.params.id,
      score,
      totalQuestions: test.questions.length,
    });

    await newResult.save();
    res.json({ message: 'Test submitted successfully!', score, totalQuestions: test.questions.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



  // Get All Results 
  router.get('/results', async (req, res) => {
    try {
      const results = await Result.find().populate('testId', 'title section');
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  //  Get Results by Test ID 
  router.get('/results/:testId', async (req, res) => {
    try {
      const results = await Result.find({ testId: req.params.testId });
      if (!results || results.length === 0) return res.status(404).json({ message: 'No results found for this test.' });
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  // // Admin: Get all tests
  // router.get('/admin/tests', async (req, res) => {
  //   try {
  //     const tests = await Test.find({}, 'title section difficulty');
  //     res.json(tests);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Server error');
  //   }
  // });

  // // Admin: Delete a test
  // router.delete('/admin/tests/:id', async (req, res) => {
  //   try {
  //     const test = await Test.findByIdAndDelete(req.params.id);
  //     if (!test) return res.status(404).json({ message: 'Test not found' });

  //     await Result.deleteMany({ testId: req.params.id });
  //     res.json({ message: 'Test deleted successfully' });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Server error');
  //   }
  // });


  router.get('/ping', (req, res) => {
  res.send('✅ testRoutes is alive');
});

  export default router;

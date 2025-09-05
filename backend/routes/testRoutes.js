import { Router } from 'express';
import multer from 'multer';
import { readFile, utils } from 'xlsx';
import Test, { find, findById } from '../models/Test';
import Result, { find as _find } from '../models/Result';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Teacher: Upload test
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');

        const workbook = readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(sheet);

        const testTitle = req.body.title || 'Untitled Test';
        const questions = data.map(row => ({
            question: row.Question,
            options: [row.OptionA, row.OptionB, row.OptionC, row.OptionD],
            correctAnswer: row['Correct Answer']
        }));

        const newTest = new Test({ title: testTitle, questions });
        await newTest.save();

        res.status(201).send('Test uploaded successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Student: Fetch all tests
router.get('/tests', async (req, res) => {
    try {
        const tests = await find({}, 'title');
        res.json(tests);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Student: Fetch test by ID
router.get('/tests/:id', async (req, res) => {
    try {
        const test = await findById(req.params.id, 'title questions');
        if (!test) return res.status(404).send('Test not found.');
        res.json(test);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Student: Submit test
router.post('/submit/:id', async (req, res) => {
    try {
        const { studentName, studentEmail, answers } = req.body;
        const test = await findById(req.params.id);
        if (!test) return res.status(404).send('Test not found.');

        let score = 0;
        test.questions.forEach((q, i) => {
            if (q.correctAnswer === answers[i]) score++;
        });

        const newResult = new Result({
            studentName,
            studentEmail,
            testId: req.params.id,
            score,
            totalQuestions: test.questions.length
        });
        await newResult.save();

        res.json({
            message: 'Test submitted successfully!',
            score,
            totalQuestions: test.questions.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Teacher: Get results
router.get('/results', async (req, res) => {
    try {
        const results = await _find().populate('testId', 'title');
        res.json(results);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

export default router;

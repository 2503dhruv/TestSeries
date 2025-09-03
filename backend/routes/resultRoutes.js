const express = require("express");
const { getResults, submitTest } = require("../controllers/resultController");

const router = express.Router();

// Get all results
router.get("/", getResults);

// Submit test answers
router.post("/submit/:id", submitTest);

module.exports = router;

import { Router } from "express";
const { getResults, submitTest, clearAllResults } = resultController;
import resultController from "../controllers/resultController.js";

const router = Router();

// Get all results
router.get("/", getResults);

// Submit test answers
router.post("/submit/:id", submitTest);

// Clear all results
router.delete("/clear", clearAllResults);

export default router;

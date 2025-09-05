import { Router } from "express";
import { getResults, submitTest } from "../controllers/resultController";

const router = Router();

// Get all results
router.get("/", getResults);

// Submit test answers
router.post("/submit/:id", submitTest);

export default router;

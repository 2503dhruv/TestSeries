import { Router } from 'express';
import { createCourse, getCourses, getCourseById } from '../controllers/courseController.js';

const router = Router();

// Create a new course
router.post('/upload-course', createCourse);

// Get all courses
router.get('/courses', getCourses);

// Get course by ID
router.get('/courses/:id', getCourseById);

export default router;

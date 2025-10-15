import { Router } from 'express';
import { createCourse, getCourses, getCourseById, deleteCourse, updateCourse } from '../controllers/courseController.js';

const router = Router();

// Create a new course
router.post('/upload-course', createCourse);

// Get all courses
router.get('/courses', getCourses);

// Get course by ID
router.get('/courses/:id', getCourseById);

// Delete course by ID
router.delete('/courses/:id', deleteCourse);

// Update course by ID
router.patch('/courses/:id', updateCourse);

export default router;

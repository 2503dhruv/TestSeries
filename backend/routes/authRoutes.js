import { Router } from 'express';
import { signup, login, createUser, getUsers, deleteUser } from '../controllers/authController.js';
import { auth, requireRole } from '../middleware/auth.js';
import adminAuth from '../middleware/adminauth.js';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Admin routes for user management
router.post('/users', adminAuth, createUser);
router.get('/users', adminAuth, getUsers);
router.delete('/users/:id', adminAuth, deleteUser);

export default router;

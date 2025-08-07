import { Router } from 'express';
import {
  getAllUsers,
  searchUsers,
  getUserProfile
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Get all users
router.get("/list", authMiddleware, getAllUsers);

// Search users
router.get("/search", authMiddleware, searchUsers);

// Get all users in home page
router.get('/', getAllUsers);

// Get profile by username
router.get('/profile/:username', authMiddleware, getUserProfile);

export default router;
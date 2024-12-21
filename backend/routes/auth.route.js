import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post('/signup', signup );
router.post('/login', login);
router.put('/update-profile', protectedRoute, updateProfile);
router.get('/check', protectedRoute, checkAuth);
router.post('/logout', logout);

export default router;
import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getSideBarUsers } from '../controllers/message.controller.js';


const router = express.Router()

router.get('/users', protectedRoute, getSideBarUsers );
router.get('/:user_id/messages', protectedRoute, getUserMessages );


export default router;
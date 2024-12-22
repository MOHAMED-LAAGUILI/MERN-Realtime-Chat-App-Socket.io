import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getSideBarUsers, getUserMessages, sendMessage } from '../controllers/message.controller.js';


const router = express.Router()

router.get('/users', protectedRoute, getSideBarUsers );
router.get('/:receiver_id/messages', protectedRoute, getUserMessages );
router.post('/send-message/:receiver_id', protectedRoute, sendMessage );


export default router;
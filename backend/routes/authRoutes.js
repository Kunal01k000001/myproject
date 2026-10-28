import express from 'express';
import { register,login,sendMessage ,getMyMessages,forgotPassword,resetPassword, verifyAdmin, getAllMessages} from '../controllers/authController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login); 
router.post('/contact', protect, sendMessage);
router.get('/my-messages', protect, getMyMessages);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/admin-check', protect, isAdmin, verifyAdmin);
router.get('/admin/all-messages', protect, isAdmin, getAllMessages);
export default router;
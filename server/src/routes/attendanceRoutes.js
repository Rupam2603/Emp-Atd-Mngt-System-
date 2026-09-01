import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkIn, checkOut, getToday, getHistory } from '../controllers/attendanceController.js';

const router = Router();

router.use(authMiddleware);

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);
router.get('/today', getToday);
router.get('/history', getHistory);

export default router;
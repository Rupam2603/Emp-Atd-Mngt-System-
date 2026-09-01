import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';
import { getDashboard, getEmployees, getReport } from '../controllers/hrController.js';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('hr'));

router.get('/dashboard', getDashboard);
router.get('/employees', getEmployees);
router.get('/attendance-report', getReport);

export default router;

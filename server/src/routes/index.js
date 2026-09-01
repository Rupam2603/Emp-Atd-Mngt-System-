import { Router } from 'express';
import authRoutes from './authRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import leaveRoutes from './leaveRoutes.js';
import hrRoutes from './hrRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leave', leaveRoutes);
router.use('/hr', hrRoutes);

export default router;
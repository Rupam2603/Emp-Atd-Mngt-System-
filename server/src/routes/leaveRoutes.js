import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';
import {
  applyLeave,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getBalance,
} from '../controllers/leaveController.js';

const router = Router();

router.use(authMiddleware);

// Employee routes
router.post('/apply', applyLeave);
router.get('/my-requests', getMyRequests);
router.get('/balance', getBalance);

// HR routes
router.get('/requests', requireRole('hr'), getAllRequests);
router.patch('/:id/approve', requireRole('hr'), approveRequest);
router.patch('/:id/reject', requireRole('hr'), rejectRequest);

export default router;
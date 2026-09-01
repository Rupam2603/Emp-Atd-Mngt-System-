import { logger } from '../utils/logger.js';

export function errorMiddleware(err, req, res, next) {
  logger.error('Global error:', err);
  const message = err.message || 'Internal server error';
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message });
}
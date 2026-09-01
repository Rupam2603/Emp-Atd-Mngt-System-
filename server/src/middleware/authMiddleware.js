import jwt from 'jsonwebtoken';
import { error } from '../utils/response.js';
import { config } from '../config/index.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return error(res, 'Unauthorized', 401);
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload; // { id, role, email }
    next();
  } catch {
    return error(res, 'Unauthorized', 401);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return error(res, 'Forbidden', 403);
    }
    next();
  };
}
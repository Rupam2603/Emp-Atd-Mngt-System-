import { registerUser, loginUser } from '../services/authService.js';
import { success, created, error } from '../utils/response.js';

export async function register(req, res, next) {
  try {
    const data = await registerUser(req.body);
    return created(res, data, 'User registered');
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    return success(res, data, 'Login successful');
  } catch (err) {
    next(err);
  }
}
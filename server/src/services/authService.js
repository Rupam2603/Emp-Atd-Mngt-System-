import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export async function registerUser(payload) {
  const { name, email, password, role = 'employee', department, designation } = payload;

  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 400;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    passwordHash,
    role,
    department,
    designation,
  });

  await user.save();
  return { id: user._id, email: user.email, role: user.role, name: user.name };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    config.jwtSecret,
    { expiresIn: '2h' }
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
}
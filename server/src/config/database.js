import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export async function connectDB() {
  // Already connected from a previous (warm) invocation - reuse it.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    logger.info('MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    // Never call process.exit() here: on Vercel this kills the whole
    // serverless function and produces a bare, unhelpful 500 instead
    // of the JSON error your errorMiddleware is meant to send.
    throw err;
  }
}

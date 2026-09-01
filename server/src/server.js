import { connectDB } from './config/database.js';
import app from './app.js';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';

// This file is only used for local development (npm run dev / npm start).
// On Vercel, api/index.js is the entry point instead - app.listen() has
// no effect in a serverless function.
connectDB()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to start server:', err);
    process.exit(1); // fine here - this only runs in a real local process
  });

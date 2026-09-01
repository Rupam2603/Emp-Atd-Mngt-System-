import { connectDB } from './config/database.js';
import app from './app.js';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';

connectDB().then(() => {
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
});
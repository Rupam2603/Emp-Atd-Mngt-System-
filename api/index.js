import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/database.js';

// Mongoose automatically buffers queries until the connection is established
connectDB();

export default app;

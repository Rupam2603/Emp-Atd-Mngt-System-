import app from '../src/app.js';
import { connectDB } from '../src/config/database.js';

// Reused across warm invocations of the same function container.
// Vercel does not keep your process alive between requests the way
// app.listen() assumes, so the DB connection has to be established
// (or re-established) at the top of each invocation instead.
let dbConnection = null;

export default async function handler(req, res) {
  if (!dbConnection) {
    dbConnection = connectDB();
  }

  try {
    await dbConnection;
  } catch (err) {
    // Reset so the next request gets a fresh attempt instead of being
    // stuck forever on one rejected promise.
    dbConnection = null;
    res.status(500).json({ success: false, message: 'Database connection failed' });
    return;
  }

  return app(req, res);
}

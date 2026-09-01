import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors({ origin: config.clientUrl }));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

export default app;
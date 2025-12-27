import express from 'express';
import 'dotenv/config';
import { securityMiddleware } from './middleware/security.js';
import panoramasRouter from './routers/panoramas.js';

const app = express();

// Security middleware
securityMiddleware(app);

// Body parsing (built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/panoramas', panoramasRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

export default app;

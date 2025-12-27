import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export const securityMiddleware = (app) => {
  app.use(helmet());

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && !process.env.CORS_ORIGIN) {
    throw new Error('CORS_ORIGIN environment variable must be set in production');
  }

  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

  app.use(cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, try again later' }
  }));
};

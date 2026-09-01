import express from 'express';
import cors from 'cors';
import { env } from './config';
import { errorHandler } from './middleware';

// Module routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';

const app = express();

// ---------------------
// Global Middleware
// ---------------------
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------
// Health Check
// ---------------------
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// ---------------------
// API Routes
// ---------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Future modules will be mounted here:
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/milestones', milestoneRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/consultation/availability', availabilityRoutes);
// app.use('/api/consultation/appointments', appointmentRoutes);

// ---------------------
// 404 Handler
// ---------------------
app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// ---------------------
// Global Error Handler
// ---------------------
app.use(errorHandler);

export default app;

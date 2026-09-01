import { Router, Request, Response } from 'express';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user.
 */
router.post('/register', (_req: Request, res: Response) => {
  // TODO: Implement registration (Week 1)
  res.status(501).json({
    status: 'error',
    message: 'Registration not yet implemented',
  });
});

/**
 * POST /api/auth/login
 * Authenticate a user and return a JWT.
 */
router.post('/login', (_req: Request, res: Response) => {
  // TODO: Implement login (Week 1)
  res.status(501).json({
    status: 'error',
    message: 'Login not yet implemented',
  });
});

/**
 * GET /api/auth/me
 * Get the current authenticated user's profile.
 */
router.get('/me', (_req: Request, res: Response) => {
  // TODO: Implement with authenticate middleware (Week 1)
  res.status(501).json({
    status: 'error',
    message: 'Profile endpoint not yet implemented',
  });
});

export default router;

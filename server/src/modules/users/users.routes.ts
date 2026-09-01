import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/users
 * List users (admin only).
 */
router.get('/', (_req: Request, res: Response) => {
  // TODO: Implement with authenticate + authorize('admin') middleware
  res.status(501).json({
    status: 'error',
    message: 'User listing not yet implemented',
  });
});

/**
 * GET /api/users/:id
 * Get a specific user's profile.
 */
router.get('/:id', (_req: Request, res: Response) => {
  // TODO: Implement with authenticate middleware
  res.status(501).json({
    status: 'error',
    message: 'User profile not yet implemented',
  });
});

export default router;

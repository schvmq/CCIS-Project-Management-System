import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config';
import { AppError } from './errorHandler';

/**
 * Shape of the JWT payload after verification.
 * Extend this interface as the auth system develops.
 */
export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
}

/**
 * Extend Express Request to include the authenticated user.
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Authentication middleware.
 * Verifies the JWT from the Authorization header (Bearer token).
 * Attaches the decoded payload to req.user.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError('Invalid or expired token', 401));
  }
}

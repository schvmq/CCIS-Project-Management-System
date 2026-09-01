import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

/**
 * Authorization middleware factory.
 * Returns middleware that checks whether the authenticated user
 * has at least one of the required roles.
 *
 * Usage:
 *   router.get('/admin', authenticate, authorize('admin'), handler);
 *   router.get('/faculty', authenticate, authorize('admin', 'faculty'), handler);
 */
export function authorize(...requiredRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const userRoles = req.user.roles || [];
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}

/**
 * Permission-based authorization middleware factory.
 * Checks whether the authenticated user has a specific permission.
 *
 * This is a placeholder for the future granular permission system.
 * Once the permissions and role_permissions tables are in place,
 * this middleware will query the database to verify permissions.
 *
 * Usage:
 *   router.post('/projects', authenticate, requirePermission('project:create'), handler);
 */
export function requirePermission(permission: string) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    // TODO: Implement permission lookup from database
    // For now, this passes through. Will be connected to the
    // role_permissions table once the schema is finalized.
    console.warn(`[RBAC] Permission check for '${permission}' not yet implemented`);
    next();
  };
}

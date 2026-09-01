import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './errorHandler';

/**
 * Validation middleware.
 * Checks the result of express-validator validation chains.
 * If there are errors, throws an AppError with 400 status.
 *
 * Usage:
 *   router.post('/resource',
 *     [body('name').notEmpty(), body('email').isEmail()],
 *     validate,
 *     controller.create
 *   );
 */
export function validate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: 'path' in err ? err.path : 'unknown',
      message: err.msg,
    }));

    next(new AppError('Validation failed', 400, extractedErrors));
    return;
  }

  next();
}

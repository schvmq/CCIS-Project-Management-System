import { Request, Response, NextFunction } from 'express';

/**
 * Global error response shape.
 * All API errors should follow this format for consistency.
 */
interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: unknown[];
}

/**
 * Custom application error with HTTP status code.
 */
export class AppError extends Error {
  public statusCode: number;
  public errors?: unknown[];

  constructor(message: string, statusCode: number, errors?: unknown[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware.
 * Must be registered AFTER all routes.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log the error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', err);
  }

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      status: 'error',
      message: err.message,
    };
    if (err.errors) {
      response.errors = err.errors;
    }
    res.status(err.statusCode).json(response);
    return;
  }

  // Unexpected errors
  const response: ErrorResponse = {
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message || 'Internal server error',
  };

  res.status(500).json(response);
}

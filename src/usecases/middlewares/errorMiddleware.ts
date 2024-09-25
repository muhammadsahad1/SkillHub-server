import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
    constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}



const errorHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Ensure headers are not already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export { ErrorHandler, errorHandler };

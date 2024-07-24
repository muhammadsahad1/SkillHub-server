import { Request, Response, NextFunction } from 'express';
import ErrorHandler from './errorHandler';

const errorHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;

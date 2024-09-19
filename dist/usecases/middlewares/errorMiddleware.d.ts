import { Request, Response, NextFunction } from 'express';
declare class ErrorHandler extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
declare const errorHandler: (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => void;
export { ErrorHandler, errorHandler };

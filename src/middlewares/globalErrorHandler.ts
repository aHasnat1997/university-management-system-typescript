/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        'success': false,
        'massage': error.massage || 'Something went wrong...!!!<globalErrorHandler>',
    });
}

export default globalErrorHandler;
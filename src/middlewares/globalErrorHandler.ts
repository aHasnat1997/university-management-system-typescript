/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

// const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
//     res.status(error.statusCode || 500).json({
//         'success': false,
//         'massage': error.massage || 'Something went wrong...!!!<globalErrorHandler>',
//     });
// };

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!<globalErrorHandler>';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};

export default globalErrorHandler;
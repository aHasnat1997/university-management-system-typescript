/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!<=def=>';
    console.log('==========>', err, '<============');


    return res.status(statusCode).json({
        success: false,
        message: message,
        issue: err,
        // stack: err.stack
    });
};

export default globalErrorHandler;
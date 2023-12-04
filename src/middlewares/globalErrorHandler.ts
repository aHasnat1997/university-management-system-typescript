/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // const statusCode = err.statusCode || 500;
    // const message = err.message || 'Something went wrong!<=def=>';

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        error: err,
        stack: err.stack
    });
};

export default globalErrorHandler;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { TErrorResponse } from "../interfaces/error.interface";
import { HTTPStatusCode } from "../utils/httpCode";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = error.statusCode || HTTPStatusCode.InternalServerError;
    const resObject: TErrorResponse = {
        success: false,
        message: error.message || 'Something went wrong!',
        issue: error,
        stack: error.stack
    }

    if (error instanceof mongoose.Error.ValidationError) {
        statusCode = HTTPStatusCode.Forbidden;
        resObject.message = error.message;
        const errors = error.errors;
        const errArray = Object.values(errors).map(e => {
            return {
                path: e.path,
                message: e.message
            }
        });
        resObject.issue = errArray
    } else if (error.code === 11000) {
        statusCode = HTTPStatusCode.Conflict;
        resObject.message = 'Duplicate key';
        const issue = error.keyValue
        const errorIssue = Object.keys(issue).map(e => {
            return {
                path: e,
                message: `'${issue[e]}' - this value is already excised`
            }
        })
        resObject.issue = errorIssue;
    }

    return res.status(statusCode).json(resObject);
};

export default globalErrorHandler;
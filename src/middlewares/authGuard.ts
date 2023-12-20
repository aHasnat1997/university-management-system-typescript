import { NextFunction, Request, Response } from "express";
import handleAsyncReq from "./handelAsyncReq";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { HTTPStatusCode } from "../utils/httpCode";


/**
 * auth guard middlewares
 * @param roles user access role
 * @returns async function
 */
export const authGuard = (...roles: string[]) => {
    return handleAsyncReq(async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.cookies?.accessToken;

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        if (!token || !decoded) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Unauthorized...');
        } else if (roles && !roles.includes(decoded?.role)) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Role Unauthorized...');
        }
        // console.log('test', decoded);

        next();
    });
};
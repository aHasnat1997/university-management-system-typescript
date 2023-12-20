import { NextFunction, Request, Response } from "express";
import handleAsyncReq from "./handelAsyncReq";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { HTTPStatusCode } from "../utils/httpCode";
import { UserModel } from "../modules/users/user.model";


/**
 * auth guard middlewares
 * @param roles user access role
 * @returns async function
 */
export const authGuard = (...roles: string[]) => {
    return handleAsyncReq(async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.cookies?.accessToken;
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const user = await UserModel.findOne({ id: decoded.userId });

        if (!token || !decoded) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Unauthorized...');
        } else if (roles && !roles.includes(decoded?.role)) {
            throw new AppError(HTTPStatusCode.Unauthorized, 'Role Unauthorized...');
        } else if (!user) {
            throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
        } else if (user?.isDeleted) {
            throw new AppError(HTTPStatusCode.Forbidden, 'User is already deleted!');
        } else if (user?.status === 'blocked') {
            throw new AppError(HTTPStatusCode.Forbidden, 'User is blocked!');
        }

        next();
    });
};
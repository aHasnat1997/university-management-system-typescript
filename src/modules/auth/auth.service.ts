import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { UserModel } from "../users/user.model";
import { TAuth } from "./auth.interface";
import config from "../../config";

const LoginUser = async (payload: TAuth) => {
    const user = await UserModel.findOne({ id: payload.id });
    if (!user) {
        throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
    } else if (user?.isDeleted) {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is already deleted!');
    } else if (user?.status === 'blocked') {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is blocked!');
    } else if (!(await UserModel.matchedPassword(payload?.password, user?.password))) {
        throw new AppError(HTTPStatusCode.Forbidden, 'Wrong Password');
    }

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in });

    return {
        accessToken,
        refreshToken
    };
};

export const AuthService = {
    LoginUser
};
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { HTTPStatusCode } from '../../utils/httpCode';
import { UserModel } from '../users/user.model';
import { TAuth, TChangePassword } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

/**
 * user login service
 * @param payload user id and password object
 * @returns accessToken, refreshToken, user data
 */
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
        refreshToken,
        user
    };
};

/**
 * get new access token
 * @param payload refresh token
 * @returns null
 */
const RefreshAccessToken = async (payload: string) => {
    const decoded = jwt.verify(payload, config.jwt_refresh_secret as string) as JwtPayload;
    const user = await UserModel.findOne({ id: decoded.userId });
    if (!user) {
        throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
    } else if (user?.isDeleted) {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is already deleted!');
    } else if (user?.status === 'blocked') {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is blocked!');
    }

    const jwtPayload = {
        userId: decoded.userId,
        role: decoded.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in });
    return {
        accessToken,
        user
    };
}

/**
 * Change user password service
 * @param user user data
 * @param payload old and new password json
 */
const ChangeUserPassword = async (user: JwtPayload, payload: TChangePassword) => {
    if (!(await UserModel.matchedPassword(payload?.oldPassword, user?.password))) {
        throw new AppError(HTTPStatusCode.Forbidden, 'Wrong old Password!');
    }

    const newHashedPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt));

    await UserModel.findOneAndUpdate(
        { id: user.id },
        {
            password: newHashedPassword,
            needChangePassword: false,
        }
    )
    return 'Done👍';
}

/**
 * Forgot user password service
 * @param email user email
 */
const ForgotUserPassword = async (email: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError(HTTPStatusCode.NotFound, 'Wrong email, no user found!')
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role
    }
    const forgotToken = jwt.sign(jwtPayload, config.jwt_forgot_secret as string, { expiresIn: config.jwt_forgot_expires_in });
    console.log(user);


    return `http://localhost:4000?email=${user.email}&token=${forgotToken}`;
}

export const AuthService = {
    LoginUser,
    RefreshAccessToken,
    ChangeUserPassword,
    ForgotUserPassword
};
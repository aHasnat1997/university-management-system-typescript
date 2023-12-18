import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { UserModel } from "../users/user.model";
import { TAuth } from "./auth.interface";

const LoginUser = async (payload: TAuth) => {
    const user = await UserModel.findOne({ id: payload.id });
    if (!user) {
        throw new AppError(HTTPStatusCode.NotFound, 'This user is not found!');
    } else if (user?.isDeleted) {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is already deleted!');
    } else if (user?.status === 'blocked') {
        throw new AppError(HTTPStatusCode.Forbidden, 'User is blocked!');
    } else if (!(await UserModel.matchedPassword(payload.password, user.password))) {
        throw new AppError(HTTPStatusCode.Forbidden, 'Wrong Password');
    }


    return 'User Login...';
};

export const AuthService = {
    LoginUser
};
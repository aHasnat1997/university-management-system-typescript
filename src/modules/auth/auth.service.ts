import { UserModel } from "../users/user.model";
import { TAuth } from "./auth.interface";

const LoginUser = async (payload: TAuth) => {
    const user = await UserModel.findOne({ id: payload.id });

    return user;
};

export const AuthService = {
    LoginUser
};
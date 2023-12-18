import { Model } from "mongoose";

// user type
export type TUser = {
    id: string,
    role: 'student' | 'teacher' | 'admin',
    password: string,
    needChangePassword: boolean,
    status: 'progress' | 'blocked',
    isDeleted?: boolean
};

export type TUserModel = Model<TUser> & {
    matchedPassword(plaintextPassword: string, hashPassword: string): boolean
}
import { Schema, model } from "mongoose";
import { TUser, TUserModel } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

// user schema
const UserSchema = new Schema<TUser, TUserModel>({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    role: {
        type: String,
        enum: {
            values: ['student', 'teacher', 'admin'],
            message: 'role must be student or teacher or admin. But you give {VALUE}'
        },
        required: [true, 'role is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    needChangePassword: {
        type: Boolean,
        required: [true, 'needChangePassword is required'],
        default: true
    },
    status: {
        type: String,
        enum: {
            values: ['progress', 'blocked'],
            message: 'status must be progress or blocked. But you give {VALUE}'
        },
        default: 'progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

/**
 * response json object
 * @returns response json with out _id, __v, isDeleted and password
 */
UserSchema.methods.toJSON = function () {
    const userData = this.toObject();
    const deleteFields = ['password', '_id', '__v', 'isDeleted'];
    deleteFields.forEach(del => delete userData[del])
    return userData;
};

// hash password before save in DB
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
    next();
});

// check user password is matched or not
UserSchema.static('matchedPassword', async function matchedPassword(plaintextPassword: string, hashPassword: string) {
    return await bcrypt.compare(plaintextPassword, hashPassword)
});


// create user model
export const UserModel = model<TUser, TUserModel>('user', UserSchema);
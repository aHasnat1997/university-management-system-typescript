import { Schema, model } from "mongoose";
import { TUser } from "./users.interface";

// user schema
const UserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: [true, 'id is required']
    },
    role: {
        type: String,
        enum: {
            values: ['student', 'teacher', 'faculty'],
            message: 'role must be student or teacher or faculty. But you give {VALUE}'
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


// create user model
export const UserModel = model<TUser>('user', UserSchema);
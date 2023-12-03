import mongoose from "mongoose";
import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.model";
import { UserModel } from "./user.model";
import generateStudentID from "./user.utils";
import { TUser } from "./users.interface";
import AppError from "../../errors/AppError";
import { TAdmin } from "../admins/admin.interface";
import { AdminModel } from "../admins/admin.model";

/**
 * create student in DB
 * @param payload student json data
 * @returns student data
 */
const createUserAsStudentIntoDB = async (payload: TStudent): Promise<TStudent | undefined> => {
    const userData: Partial<TUser> = {
        role: 'student',
        password: '#Password123',
        needChangePassword: true,
        status: 'progress',
        isDeleted: false
    };

    const demoSemester = {
        year: '2050',
        semester: '01'
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        userData.id = await generateStudentID(demoSemester);

        const newInsertedUser = await UserModel.create([userData], { session });
        if (!newInsertedUser.length) {
            // throw new Error('Failed to cerate user...');
            throw new AppError(400, 'Failed to cerate user...');
        }

        payload.userId = newInsertedUser[0]._id;
        payload.id = newInsertedUser[0].id;

        const newStudent = await StudentModel.create([payload], { session });
        if (!newStudent) {
            // throw new Error('Failed to cerate student...');
            throw new AppError(400, 'Failed to cerate student...');
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        // throw new Error('Something went wrong...');
        throw new AppError(400, 'Something went wrong...')
    }
};

/**
 * create admin in DB
 * @param payload admin json data
 * @returns admin data
 */
const createUserAsAdminIntoDB = async (payload: TAdmin): Promise<TAdmin | undefined> => {
    const userData: Partial<TUser> = {
        role: 'faculty',
        password: '#Password123',
        needChangePassword: true,
        status: 'progress',
        isDeleted: false,
    };

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        userData.id = 'F-0002';
        const newAddUser = await UserModel.create([userData], { session });

        if (!newAddUser) {
            throw new AppError(400, 'User not cerated...👎');
        }

        payload.userId = newAddUser[0]._id;
        payload.id = newAddUser[0].id;

        const addNewAdmin = await AdminModel.create([payload], { session });
        if (!addNewAdmin) {
            throw new AppError(400, 'Admin not cerated...👎');
        }

        session.commitTransaction();
        session.endSession();

        return addNewAdmin[0];

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new AppError(400, 'Something went wrong...');
    }
};

/**
 * Get all users from DB
 * @returns array of all users
 */
const getAllUsersFromDB = async (): Promise<TUser[]> => {
    const result = await UserModel.find();
    return result
}

// exporting user services
export const UserServices = {
    createUserAsStudentIntoDB,
    createUserAsAdminIntoDB,
    getAllUsersFromDB
};
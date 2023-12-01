import mongoose from "mongoose";
import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.model";
import { UserModel } from "./user.model";
import generateStudentID from "./user.utils";
import { TUser } from "./users.interface";

/**
 * create student in DB
 * @param payload student json data
 * @returns { Promise } student data
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
            throw new Error('Failed to cerate user...');
        }

        payload.userId = newInsertedUser[0]._id;
        payload.id = newInsertedUser[0].id;

        const newStudent = await StudentModel.create([payload], { session });
        if (!newStudent) {
            throw new Error('Failed to cerate student...');
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Something went wrong...');
    }
};

const getAllUsersFromDB = async (): Promise<TUser[]> => {
    const result = await UserModel.find();
    return result
}

// exporting user services
export const UserServices = {
    createUserAsStudentIntoDB,
    getAllUsersFromDB
};
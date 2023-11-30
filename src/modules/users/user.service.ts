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
        // id: await generateStudentID('205001'),
        role: 'student',
        password: '#Password123',
        needChangePassword: true,
        status: 'progress',
        isDeleted: false
    };

    const section = await mongoose.startSession();
    section.startTransaction();
    try {
        userData.id = await generateStudentID('205001');

        const newInsertedUser = await UserModel.create([userData], { section });
        // if (Object.keys(newInsertedUser).length)
        if (!newInsertedUser.length) {
            throw new Error('Failed to cerate user...');
        }

        payload.userId = newInsertedUser[0]._id;
        payload.id = newInsertedUser[0].id;

        const newStudent = await StudentModel.create([payload], { section });
        if (!newStudent) {
            throw new Error('Failed to cerate student...');
        }

        await section.commitTransaction();
        await section.endSession();

        return newStudent[0];
    } catch (error) {
        await section.abortTransaction();
        await section.endSession();
        throw new Error('Something went wrong...!!!');
    }
};

// exporting user services
export const UserServices = {
    createUserAsStudentIntoDB
};
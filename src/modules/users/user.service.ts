import { TStudent } from "../students/student.interface";
import { StudentModel } from "../students/student.model";
import { UserModel } from "./user.model";
import { TUser } from "./users.interface";

/**
 * create student in DB
 * @param payload student json data
 * @returns { Promise } student data
 */
const createUserAsStudentIntoDB = async (payload: TStudent): Promise<TStudent | undefined> => {
    const userData: TUser = {
        id: '2023020001',
        role: 'student',
        password: '#Password123',
        needChangePassword: true,
        status: 'progress',
        isDeleted: false
    };

    const newInsertedUser = await UserModel.create(userData);

    if (Object.keys(newInsertedUser).length) {
        payload.userId = newInsertedUser._id;
        payload.id = newInsertedUser.id;

        const newStudent = await StudentModel.create(payload);
        return newStudent;
    }
};

// exporting user services
export const UserServices = {
    createUserAsStudentIntoDB
};
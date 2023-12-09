/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from "./user.model";

/**
 * generate unique student id 
 * @param payload semester and year object
 * @returns student id 
 */
export const generateStudentID = async (payload: any): Promise<string> => {
    let currentId = '0000';

    const findStudentLastId = await UserModel.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({ createdAt: -1 });
    const lastStudentYear = findStudentLastId?.id?.substring(0, 4);
    const lastStudentSemester = findStudentLastId?.id?.substring(4, 6);
    const currentStudentYear = payload.year;
    const currentStudentSemester = payload.semester;

    if (findStudentLastId && lastStudentYear === currentStudentYear && lastStudentSemester === currentStudentSemester) {
        currentId = findStudentLastId.id.substring(6);
    }

    let newId = (Number(currentId) + 1).toString().padStart(4, '0');
    newId = `${payload.year}${payload.semester}${newId}`;
    return newId;

};

/**
 * generate unique admin id 
 * @returns admin id 
 */
export const generateAdminID = async (): Promise<string> => {
    let currentId = '0000';
    const findAdminLastId = await UserModel.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 });
    if (findAdminLastId) {
        const lastId = findAdminLastId.id.split('-');

        currentId = lastId[1];
    }
    let newId = (Number(currentId) + 1).toString().padStart(4, '0');
    newId = `A-${newId}`;
    return newId;

};

/**
 * generate unique teacher id 
 * @returns teacher id 
 */
export const generateTeacherID = async (): Promise<string> => {
    let currentId = '0000';
    const findTeacherLastId = await UserModel.findOne({ role: 'teacher' }, { id: 1, _id: 0 }).sort({ createdAt: -1 });
    if (findTeacherLastId) {
        const lastId = findTeacherLastId.id.split('-');

        currentId = lastId[1];
    }
    let newId = (Number(currentId) + 1).toString().padStart(4, '0');
    newId = `T-${newId}`;
    return newId;

};
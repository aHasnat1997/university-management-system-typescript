import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";

/**
 * Get all students from DB
 * @returns promise array of students
 */
const getAllStudentsFromDB = async (): Promise<TStudent[]> => {
    const result = await StudentModel.find();
    return result
};

/**
 * Get single student from DB
 * @param id userId
 * @returns single student
 */
const getSingleStudentFromDB = async (id: string): Promise<TStudent | null> => {
    const result = await StudentModel.findOne({ id: id });
    return result
};

export const StudentService = {
    getAllStudentsFromDB,
    getSingleStudentFromDB
};
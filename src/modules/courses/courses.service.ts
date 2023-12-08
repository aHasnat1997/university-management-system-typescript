import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { TCourses } from "./courses.interface";
import { CoursesModel } from "./courses.model";

/**
 * Create courses into DB
 * @param payload courses json
 * @returns created course data
 */
const createCourseIntoDB = async (payload: TCourses): Promise<TCourses> => {
    const result = await CoursesModel.create(payload);
    return result
};

/**
 * Get all courses from DB
 * @returns all courses data
 */
const getAllCoursesFromDB = async (): Promise<TCourses[]> => {
    const result = await CoursesModel.find().populate('teachers');
    return result;
};

/**
 * Get single course from DB
 * @param id course id
 * @returns course data
 */
const getSingleCoursesFromDB = async (id: string): Promise<TCourses | null> => {
    const result = await CoursesModel.findById(id).populate('teachers');
    if (result === null) {
        throw new AppError(HTTPStatusCode.NotFound, 'No course found...')
    }
    return result;
};

/**
 * Delete single course in DB
 * @param id course id
 * @returns deleted object
 */
const deleteCourseInDB = async (id: string): Promise<TCourses | null> => {
    const result = await CoursesModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (result === null) {
        throw new AppError(HTTPStatusCode.NotFound, 'No course found for delete...');
    }
    return result
};

export const CoursesService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    deleteCourseInDB
};
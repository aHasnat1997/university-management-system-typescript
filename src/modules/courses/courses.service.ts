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
    const result = await CoursesModel.find().populate('teachers').populate('prerequisites');
    return result;
};

/**
 * Get single course from DB
 * @param id course id
 * @returns course data
 */
const getSingleCoursesFromDB = async (id: string): Promise<TCourses | null> => {
    const result = await CoursesModel.findById(id).populate('teachers').populate('prerequisites');
    if (result === null) {
        throw new AppError(HTTPStatusCode.NotFound, 'No user found...')
    }
    return result;
};

export const CoursesService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB
};
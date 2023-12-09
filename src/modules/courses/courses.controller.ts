import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { CoursesService } from "./courses.service";
import handlesResponse from "../../utils/handlesResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * create course with async request function
 */
const createCourse = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const courseData = req.body;
    const result = await CoursesService.createCourseIntoDB(courseData);
    handlesResponse(res, {
        massage: 'Successfully cerated course...👍',
        doc: result
    }, HTTPStatusCode.Created);
});

/**
 * get all courses with async request function
 */
const getAllCorses = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await CoursesService.getAllCoursesFromDB();
    handlesResponse(res, {
        massage: 'Finding all course data successfully...👍',
        doc: result
    });
})

/**
 * get single course with async request function
 */
const getSingleCourses = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await CoursesService.getSingleCoursesFromDB(id);
    handlesResponse(res, {
        massage: 'Finding course data successfully...👍',
        doc: result
    })
})

/**
 * delete single course with async request function
 */
const deleteCourse = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await CoursesService.deleteCourseInDB(id);
    handlesResponse(res, {
        massage: 'Course is delete successfully...',
        doc: result
    });
})

export const CourseController = {
    createCourse,
    getAllCorses,
    getSingleCourses,
    deleteCourse
}
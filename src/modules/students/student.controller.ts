import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { StudentService } from "./student.service";
import handlesResponse from "../../utils/handlesResponse";

/**
 * Get all students 
 */
const getAllStudent = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const studentData = await StudentService.getAllStudentsFromDB();
    handlesResponse(res, {
        massage: 'All students fetch successfully...👍',
        doc: studentData
    });
});

/**
 * Get single student using userId
 */
const getSingleStudent = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.userId;
    const studentData = await StudentService.getSingleStudentFromDB(id);
    handlesResponse(res, {
        massage: 'Students fetch successfully...👍',
        doc: studentData
    });
});

export const StudentControllers = {
    getAllStudent,
    getSingleStudent
};
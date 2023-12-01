import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { StudentService } from "./student.service";
import handlesResponse from "../../utils/handlesResponse";

/**
 * Get all students 
 */
const getAllStudent = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const studentData = await StudentService.getAllStudentsFromDB();
    handlesResponse(res, {
        massage: 'All students fetch successfully...👍',
        doc: studentData
    });
});

/**
 * Get single student using userId
 */
const getSingleStudent = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
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
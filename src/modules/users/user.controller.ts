import { Request, Response } from "express";
import { UserServices } from "./user.service";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import handlesResponse from "../../utils/handlesResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * create student in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsStudent = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const studentData = req.body;
    const result = await UserServices.createUserAsStudentIntoDB(studentData);
    handlesResponse(res, {
        massage: 'Student cerated successfully...👍',
        doc: result
    }, HTTPStatusCode.Created)
});

/**
 * create admin in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsAdmin = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const adminData = req.body;
    const result = await UserServices.createUserAsAdminIntoDB(adminData);
    handlesResponse(res, {
        massage: 'Admin cerated successfully...👍',
        doc: result
    }, HTTPStatusCode.Created)
});

/**
 * create admin in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsTeacher = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const teacherData = req.body;
    const result = await UserServices.createUserAsTeacherIntoDB(teacherData);
    handlesResponse(res, {
        massage: 'Teacher cerated successfully...👍',
        doc: result
    }, HTTPStatusCode.Created)
});


// export all user controllers
export const UserControllers = {
    createUserAsStudent,
    createUserAsAdmin,
    createUserAsTeacher
};




// with out any handelAsyncReq and handlesResponse
// const createUserAsStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const studentData = req.body;
//         const result = await UserServices.createUserAsStudentIntoDB(studentData);
//         res.status(200).json({
//             'success': true,
//             'massage': 'student cerated successfully...👍',
//             'doc': result
//         });
//     } catch (error) {
//         next(error)
//     }
// };
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import handelAsyncReq from "../../utils/handelAsyncReq";
import handlesResponse from "../../utils/handlesResponse";

/**
 * create student in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsStudent = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const studentData = req.body;
    const result = await UserServices.createUserAsStudentIntoDB(studentData);
    handlesResponse(res, {
        massage: 'student cerated successfully...👍',
        doc: result
    })
});
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
//         res.status(400).json({
//             'success': false,
//             'massage': 'student not cerated successfully...👎',
//             'doc': error
//         });
//         next(error)
//     }
// };

/**
 * create admin in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsAdmin = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const adminData = req.body;
    const result = await UserServices.createUserAsAdminIntoDB(adminData);
    handlesResponse(res, {
        massage: 'admin cerated successfully...👍',
        doc: result
    })
});


const getAllUsers = handelAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await UserServices.getAllUsersFromDB();
    handlesResponse(res, {
        massage: 'All users fetch successfully...👍',
        doc: result
    })
})


// export all user controllers
export const UserControllers = {
    createUserAsStudent,
    createUserAsAdmin,
    getAllUsers
};
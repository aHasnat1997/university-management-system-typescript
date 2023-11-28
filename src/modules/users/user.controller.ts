import { RequestHandler } from "express";
import { UserServices } from "./user.service";

/**
 * create student in DB
 * @param req request obj
 * @param res response obj
 */
const createUserAsStudent: RequestHandler = async (req, res): Promise<void> => {
    try {
        const studentData = req.body;
        const result = await UserServices.createUserAsStudentIntoDB(studentData);
        res.status(200).json({
            'success': true,
            'massage': 'student cerated successfully...👍',
            'doc': result
        });
    } catch (error) {
        res.status(400).json({
            'success': false,
            'massage': 'student not cerated successfully...👎',
            'doc': error
        });
    }
};

// export all user controllers
export const UserControllers = {
    createUserAsStudent
};
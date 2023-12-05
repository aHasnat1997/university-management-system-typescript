import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { AdminService } from "./admin.service";
import handlesResponse from "../../utils/handlesResponse";

/**
 * Get all admin json
 */
const getAllAdmin = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AdminService.getAllAdminFromDB();
    handlesResponse(res, {
        massage: 'All admin user found...👍',
        doc: result
    })
});

/**
 * get single user json
 */
const getSingleAdmin = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await AdminService.getSingleAdminFromDB(id);
    handlesResponse(res, {
        massage: 'Your admin found...👍',
        doc: result
    })
});

export const AdminController = {
    getAllAdmin,
    getSingleAdmin
}
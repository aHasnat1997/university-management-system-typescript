import AppError from "../../errors/AppError";
import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

/**\
 * Get all admin from DB
 */
const getAllAdminFromDB = async (): Promise<TAdmin[]> => {
    const allAdmin = await AdminModel.find();
    return allAdmin;
};

/**
 * Get single admin from DB
 * @param id admin id
 * @returns single admin json
 */
const getSingleAdminFromDB = async (id: string): Promise<TAdmin | null> => {
    const singleAdmin = await AdminModel.findOne({ id });
    if (singleAdmin === null) {
        throw new AppError(404, 'No admin user found...');
    }
    return singleAdmin
}


export const AdminService = {
    getAllAdminFromDB,
    getSingleAdminFromDB
};
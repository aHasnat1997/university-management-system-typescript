import { Response } from "express";
import { THandlesResponse } from "../interfaces/successResponse";

/**
 * Handle all success response
 * @param res express response
 * @param data response data
 * @param statusCode HTTP status code
 */
const handlesResponse = <T>(res: Response, data: THandlesResponse<T>, statusCode?: number): void => {
    res.status(statusCode || 200).json({
        'success': true,
        'massage': data.massage,
        'doc': data.doc
    });
}

export default handlesResponse;
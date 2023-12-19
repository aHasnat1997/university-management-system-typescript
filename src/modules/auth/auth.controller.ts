import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { AuthService } from "./auth.service";
import handlesResponse from "../../utils/handlesResponse";


const UserLogin = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.LoginUser(req.body);
    res.cookie('refreshToken', result.refreshToken);
    handlesResponse(res, {
        massage: 'User Login successfully!',
        doc: result.accessToken
    });
});

export const AuthController = {
    UserLogin
};
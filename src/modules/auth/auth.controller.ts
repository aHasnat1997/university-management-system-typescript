import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { AuthService } from "./auth.service";
import handlesResponse from "../../utils/handlesResponse";

/**
 * User login
 */
const UserLogin = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.LoginUser(req.body);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true });
    res.cookie('accessToken', result.accessToken, { httpOnly: true });
    handlesResponse(res, {
        massage: 'User Login successfully!',
        doc: result.user
    });
});

/**
 * User new access token
 */
const NewAccessToken = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.RefreshAccessToken(req?.cookies?.refreshToken);
    res.cookie('accessToken', result.accessToken, { httpOnly: true });
    handlesResponse(res, {
        massage: 'Token refresh successfully!',
        doc: result.user
    });
});

export const AuthController = {
    UserLogin,
    NewAccessToken
};
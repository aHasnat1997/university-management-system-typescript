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

/**
 * User password change
 */
const ChangePassword = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.ChangeUserPassword(req?.user, req?.body);
    handlesResponse(res, {
        massage: 'Password change successful!',
        doc: result
    });
});

/**
 * User password forgot
 */
const ForgotPassword = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.ForgotUserPassword(req.body.email);
    handlesResponse(res, {
        massage: 'You have only 5 minutes for check your mail for next process!',
        doc: result
    });
});

export const AuthController = {
    UserLogin,
    NewAccessToken,
    ChangePassword,
    ForgotPassword
};
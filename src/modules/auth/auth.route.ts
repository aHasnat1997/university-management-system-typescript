import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../middlewares/authGuard";

export const AuthRoute = Router();

AuthRoute.post('/login', AuthController.UserLogin);
AuthRoute.get('/refresh-token', AuthController.NewAccessToken);
AuthRoute.post('/password-change', authGuard('admin', 'student', 'teacher'), AuthController.ChangePassword);
AuthRoute.post('/forgot-password', AuthController.ForgotPassword);
AuthRoute.post('/forgot-password-change', AuthController.ChangeForgotPassword);
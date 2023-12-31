import { Router } from "express";
import { StudentControllers } from "./student.controller";
import { authGuard } from "../../middlewares/authGuard";


export const StudentRoutes = Router();

StudentRoutes.get('/', authGuard('admin'), StudentControllers.getAllStudent);

StudentRoutes.get('/:userId', StudentControllers.getSingleStudent);
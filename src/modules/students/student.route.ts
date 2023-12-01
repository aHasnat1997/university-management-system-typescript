import { Router } from "express";
import { StudentControllers } from "./student.controller";


export const StudentRoutes = Router();

StudentRoutes.get('/', StudentControllers.getAllStudent);

StudentRoutes.get('/:userId', StudentControllers.getSingleStudent);
import { Router } from "express";
import { StudentControllers } from "./student.controller";


export const StudentRoute = Router();

StudentRoute.get('/', StudentControllers.getAllStudent);

StudentRoute.get('/:userId', StudentControllers.getSingleStudent);
import { Router } from "express";
import { UserControllers } from "./user.controller";
import { authGuard } from "../../middlewares/authGuard";

// create user route using express router
const UserRoute = Router();

// student crate route
UserRoute.post('/students', authGuard('admin'), UserControllers.createUserAsStudent);

// admin crate route
UserRoute.post('/admins', authGuard('admin'), UserControllers.createUserAsAdmin);

// teacher crate route
UserRoute.post('/teachers', authGuard('admin'), UserControllers.createUserAsTeacher);

export default UserRoute;
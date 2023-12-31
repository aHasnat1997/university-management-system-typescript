import { Router } from "express";
import { UserControllers } from "./user.controller";

// create user route using express router
const UserRoute = Router();

// student crate route
UserRoute.post('/students', UserControllers.createUserAsStudent);

// admin crate route
UserRoute.post('/admins', UserControllers.createUserAsAdmin);

// teacher crate route
UserRoute.post('/teachers', UserControllers.createUserAsTeacher);

export default UserRoute;
import { Router } from "express";
import { UserControllers } from "./user.controller";

// create user route using express router
const UserRoute = Router();

// student crate route
UserRoute.post('/students', UserControllers.createUserAsStudent);

UserRoute.get('/', UserControllers.getAllUsers);

export default UserRoute;
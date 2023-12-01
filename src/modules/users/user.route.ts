import { Router } from "express";
import { UserControllers } from "./user.controller";

// create user route using express router
const userRoute = Router();

// student crate route
userRoute.post('/students', UserControllers.createUserAsStudent);

userRoute.get('/', UserControllers.getAllUsers);

export default userRoute;
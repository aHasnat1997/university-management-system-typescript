import { Router } from "express";
import userRoute from "../modules/users/user.route";

// create route using express router
export const AllRoutes = Router();

// all modules routes array
const modulesRoutes = [
    {
        path: '/users',
        route: userRoute
    }
]

// make all routes
modulesRoutes.forEach(r => AllRoutes.use(r.path, r.route));
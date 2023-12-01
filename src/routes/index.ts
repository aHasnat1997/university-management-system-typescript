import { Router } from "express";
import UserRoute from "../modules/users/user.route";
import { StudentRoute } from "../modules/students/student.route";

// create route using express router
export const AllRoutes = Router();

// all modules routes array type
type TModulesRoutes = {
    path: string,
    route: Router
}
// all modules routes array
const modulesRoutes: TModulesRoutes[] = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/students',
        route: StudentRoute
    }
]

// make all routes
modulesRoutes.forEach(r => AllRoutes.use(r.path, r.route));
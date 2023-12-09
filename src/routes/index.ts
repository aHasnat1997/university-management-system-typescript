import { Router } from "express";
import UserRoute from "../modules/users/user.route";
import { StudentRoutes } from "../modules/students/student.route";
import AdminRoute from "../modules/admins/admin.route";
import CourseRoute from "../modules/courses/course.route";

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
        route: StudentRoutes
    },
    {
        path: '/admins',
        route: AdminRoute
    },
    {
        path: '/courses',
        route: CourseRoute
    }
]

// make all routes
modulesRoutes.forEach(r => AllRoutes.use(r.path, r.route));
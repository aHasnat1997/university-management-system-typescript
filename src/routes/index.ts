import { Router } from "express";

// create route using express router
export const AllRoutes = Router();

// all modules routes array
const modulesRoutes = [
    {
        path: '/user',
        route: ''
    }
]

// make all routes
modulesRoutes.forEach(r => AllRoutes.use(r.path));
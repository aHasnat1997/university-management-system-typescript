import { Router } from "express";
import { AdminController } from "./admin.controller";


const AdminRoute = Router();

// Get all admin route
AdminRoute.get('/', AdminController.getAllAdmin);

// Get single admin route
AdminRoute.get('/:id', AdminController.getSingleAdmin);

export default AdminRoute;
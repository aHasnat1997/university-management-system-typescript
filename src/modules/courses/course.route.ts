import { Router } from "express";
import { CourseController } from "./courses.controller";


const CourseRoute = Router();

// course create route
CourseRoute.post('/', CourseController.createCourse);

// get all courses route
CourseRoute.get('/', CourseController.getAllCorses);

// get single course route
CourseRoute.get('/:id', CourseController.getSingleCourses);

export default CourseRoute;
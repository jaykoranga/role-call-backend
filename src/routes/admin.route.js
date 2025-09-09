import { Router } from "express"
import { createCourse, createSemester, deleteCourse,  getAllSemesters,  getCourseById, getCourses, getSemesterById, updateCourse } from "../controllers/admin.controller.js";

 const adminRouter=Router();

// all admin routes
   
  //--------------------------course routes----------------------------------
  
  // create course route
 
  adminRouter.post('/createCourse',createCourse)

  // fetch course by id route -> only admin should be ablen to fetch it 

  adminRouter.get('/getCourse/:courseId',getCourseById)

  // fetch all courses -> only admin should be able to fetch all courses

  adminRouter.get('/getCourses/all',getCourses)

  // update a course -> only admin should be able to update

  adminRouter.put('/updateCourse/:courseId',updateCourse)

  // delete a course -> only admin should be able to delte a course

  adminRouter.delete('/deleteCourse/:courseId',deleteCourse)

  //-------------------------course routes end -------------------------------


  //-------------------------semester routes --------------------------------

  // create a semester route

  adminRouter.post('/createSemester',createSemester)

  // get all semesters of a course

  adminRouter.get('/getAllSemesters/:courseId',getAllSemesters)

  // get semester by id 

  adminRouter.get('/getSemesterById/:semesterId',getSemesterById)



//
 export default adminRouter

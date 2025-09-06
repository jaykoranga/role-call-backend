import { Router } from "express";
import { deleteStudent, getAllStudents, getprofile} from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

//creating a student router which will help in routing to all the student related routes.

const studentRouter=Router();

// I will be creating all the routes for the students, check respective controllers of that route. 

 
 
 

 //get all the students of the app

 studentRouter.get('/all',getAllStudents)

 //profile
 
 studentRouter.get('/profile',authenticate,getprofile)
 
 //get a student from his id

 studentRouter.get('/:id',(req,res)=>{})

 // get all students of a class

 studentRouter.get('all/:class_id',(req,res)=>{})

 //get all students of a semester 

 studentRouter.get('/all/:semesterId',()=>{})

 // get all students of a course

 studentRouter.get('/all/:course_id',()=>{})

 // update a student 

 studentRouter.put('/:studentId',()=>{})

 // delete a student 

 studentRouter.delete('/:studentId',deleteStudent)
 

//exporting the student router

export  default studentRouter;



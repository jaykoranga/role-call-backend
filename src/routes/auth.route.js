import { Router } from "express";
import { createStudent, login } from "../controllers/auth.controller.js";

//auth router

const authRouter=Router();

// all the auth routes will be written here
 
 //register a student route       *****\---------------testing route ---------------/*****
 authRouter.post('/register',createStudent) 

 //login a user 
 authRouter.post('/login',login)

// 

export default authRouter

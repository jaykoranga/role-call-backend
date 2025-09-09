import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller.js";

//making a user router 

const userRouter=Router();

//register a user 

userRouter.post('/register',registerUser)

// login a user

userRouter.post('/login',login)

//

//exporting user router
export default userRouter
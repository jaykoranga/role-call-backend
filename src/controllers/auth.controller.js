import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../config/db.js';
import { json } from 'express';

//register or create a student

export const createStudent=async(req,res)=>{
  
    const {name,email,password}=req.body;
    
    try {
        
        const hashedPassword=await bcrypt.hash(password,10)
        const student=await prisma.student.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword
            }
        })
        res.status(200).json({
            message:"student created succesfully",
            student
        });
        console.log("student created successfully")
        
    } catch (err) {
        console.log("error creating student", err)
        return res.status(500).json({error:err.message})
    }

}

//loging in the student

export const login=async(req,res)=>{

    const {email,password}=req.body
    try{

        let user = await prisma.student.findUnique({where:{email}});
        if(!user){
            return res.status(404).json({ message:"user not found with this email"})
        }

        const isPassValid=await bcrypt.compare(password,user.password)

        if(!isPassValid) return res.status(401).json({message:"password does not match "})

        // going to sign a jwt token and send it in response.

        const token=jwt.sign(
            {id:user.id,email:user.email},process.env.JWT_STUDENT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN || "24h"}
        )
        console.log("log in hogyaa bhaiii !! kya dekhra hai , galat code ni likhta mai ")
        return res.status(200).json({message:"log in succesfull hurray !!!",token})
    }

    catch(err){
        console.error("error in log in , error message : ",err.message)
        return res.status(500).json({error:err.message})
    }

}
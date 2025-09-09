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


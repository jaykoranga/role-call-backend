// all the user routes functions are here , so keep your eyes wide open and be attentive you cucksucker!! its not written by AI huhh!!

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../config/db.js';

//register a user

export const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body

    if( !email || !name || !password || !role) return res.status(400).json({message:"input feild empty"})



    // registering a student 

    if (role === "student") {

        let user;
        try {

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log("password hashed")
            user = await prisma.users.create({
                data: { email: email, role: role, password: hashedPassword, name: name }
            })

            console.log("user created");


        } catch (err) {

            return res.status(500).json({ error: err, message: "user not created properly" })
        }

        try {

            //create student

            const student = await prisma.students.create({
                data: {
                    user_id: Number(user.id),
                }
            })

            console.log("student created")
            return res.status(200).json({ message: "student created succesfully", student: student, user: user })

        } catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    // register a teacher

     if (role === "teacher") {

        let user;
        try {

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log("password hashed")

            //create user

            user = await prisma.users.create({
                data: { email: email, role: role, password: hashedPassword, name: name }
            })

            console.log("user created");


        }
        catch (err) {

            return res.status(500).json({ error: err.message, message: "user not created properly" })
        }

        let teacher;

        try {

            //create teacher

            teacher = await prisma.teachers.create({
                data: {
                    user_id: Number(user.id),
                }
            })

            console.log("teacher created")
            return res.status(200).json({ message: "teacher created succesfully", teacher: teacher, user: user })

        }

        catch (err) {

            return res.status(500).json({ error: err.message })

        }
    }

    //register the Admin

     if (role === "admin") {

        let user;
        try {

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log("password hashed")
            user = await prisma.users.create({
                data: { email: email, role: role, password: hashedPassword, name: name }
            })

            console.log("user created");


        } catch (err) {

            return res.status(500).json({ error: err, message: "user not created properly" })
        }

        try {

            //creating admin

            const admin = await prisma.admins.create({
                data: {
                    user_id: Number(user.id),
                }
            })

            console.log("admin created")
            return res.status(200).json({ message: "admin created succesfully", admin: admin, user: user })

        } catch (err) {
            return res.status(500).json({ error: err })
        }
    }
}

//login a user 

export const login=async(req,res)=>{

    const {email,password}=req.body

    if(!email || !password) return res.status(400).json({message:"email or password is empty"})
    try{

        let user = await prisma.users.findUnique({where:{email}});
        if(!user){
            return res.status(404).json({ message:"user not found with this email"})
        }

        const isPassValid=await bcrypt.compare(password,user.password)

        if(!isPassValid) return res.status(401).json({message:"password does not match "})

        // going to sign a jwt token and send it in response.

        const token=jwt.sign(
            {role:user.role,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN || "24h"}
        )
        console.log("log in hogyaa bhaiii !! kya dekhra hai , galat code ni likhta mai ")
        return res.status(200).json({message:"log in succesfull hurray !!!",token,user})
    }

    catch(err){
        console.error("error in log in , error message : ",err.message)
        return res.status(500).json({error:err.message})
    }

}
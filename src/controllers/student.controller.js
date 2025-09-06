import prisma from "../config/db.js";




// function for getting all the students

export const getAllStudents=async(req,res)=>{
       let students;
       try {
        students=await prisma.student.findMany();
        res.status(200).json({
            message:"student fetched successfully",
            students
        })
        console.log("students are fetched successfully, check the response baby !!")
       } catch (err) {
           res.status(500).json({
            error:err
           })
       }
}

// delete a user 

export const deleteStudent=async(req,res)=>{
    try {
        const deletedUser=await prisma.student.delete({where:{id:Number(req.params.studentId)}})
        console.log(deletedUser," is deleted")
        return res.status(200).json({message:"user deleted",user:deletedUser})
    } catch (err) {
        return res.status(500).json({error:err,message:"user not deleted , some error"})
    }
}

// get profile info 

export const getprofile=(req,res)=>{
    console.log("inside the getprofile")
    const user=req.user
    console.log("after assigning user")
    res.status(200).json({user:user})
}
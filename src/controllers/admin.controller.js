import prisma from "../config/db.js";


// ------------------------------------ COURSE FUNCTIONS -----------------------------------------------------------

//function to create a course 


export const createCourse = async(req,res)=>{

    const { name, duration } = req.body;

    if(!name || !duration) return res.status(400).json({message:"empty feilds"})

    try {
        
        const course= await prisma.courses.create({
            data:{name,duration}
        })

        console.log("course created succesfully :",course.name)
        return res.status(200).json({message:"course created successfully",course})
    } 
    
    catch (err) {

        return res.status(500).json({error:err.message})

    }
}

// function to get  a course by  id

export const getCourseById = async (req,res)=>{

    const id=Number(req.params.courseId)

    try {
       
        const course = await prisma.courses.findUnique({where:{id:id}})
        console.log("found the course :",course)

        return res.status(200).json({message:"succesfull fetch",course:course})
    } 
    
    catch (err) {
        
        return res.status(500).json({error:err.message})
    }


}

// fucntion to get all the courses

export const getCourses = async(req,res)=>{

    try {
        
        const courses = await prisma.courses.findMany()

        console.log("fetched all the courses, check the response on postman or frontend console coz i dont wanna show here")
        return res.status(200).json({message:"succesfully fetched all courses",courses:courses})
        
    } catch (err) {
      
        return res.status(500).json({error:err.message})
    }
}

// function to update a course

 export const updateCourse = async(req,res)=>{

    const id= Number (req.params.courseId)
    const {name,duration,isActive} = req.body

    
    
    try {
        
        const updatedCourse = await prisma.courses.update({
            where:{id},
            data:{ ...(name && {name}), ...(duration &&{duration}),...(isActive !=undefined && {isActive})}
        })

        console.log("course after updation: ",updatedCourse)
        return res.status(200).json({message :"succesfull course updation ",updatedCourse})

    } catch (err) {
        return res.status(500).json({error:err.message})
    }
 }

 // function to delete a course

 export const deleteCourse = async (req,res)=>{
    
    const id=Number(req.params.courseId)
    if(!id) return res.status(400).json({message:"no id is given"})
    try {
        
        const deletedCourse = await prisma.courses.delete({where:{id:id}})
        console.log("succesfully delete a course",deletedCourse.name)

        return res.status(200).json({message:"succesfully deleted the course",deletedCourse:deletedCourse})

    } catch (err) {
        
        return res.status(500).json({error:err.message})
    }
 }

 //----------------------------------------------------- COURSE FUNCTION ENDS HERE ! ------------------------------------------------------------

 // ------------------------------------ SEMESTER FUNCTIONS STARTS HERE !! WOHOOOOOOO !!--------------------------------------------------------

 // function to create a semester
 export const createSemester = async (req,res)=>{

    const { name, courseId } = req.body
    
    //checking an edge case 

    if (!name || !courseId) return res.status(400).json({message:"name or course_id was not provided"})
    
    try {
        
        const semester = await prisma.semesters.create({ data : {courseId,name}})

        console.log("semester created : ",semester);
        return res.status(200).json({message:"succesfully created a semester",semester:semester})
    } catch (err) {

        return res.status(500).json({error:err.message})
        
    }
 }

 // function to get a semester by id

 export const getSemesterById = async(req,res)=>{
    const id = Number(req.params.semesterId)

    if(!id) return res.status(400).json({message:"you forgot the id baby !!"})

    try {
        
        const semester = await prisma.semesters.findUnique({where:{id:id}})
        console.log("fetched the semester: ",semester)
        return res.status(200).json({message:"successfully fetched the semester",semester:semester})

    } catch (err) {
        
        return res.status(500).json({error:err.message})
    }
 }

 // function to fetch all semesters of a course 

 export const getAllSemesters = async (req,res)=>{
    
    const courseId = Number(req.params.courseId)

    if(!courseId) return res.status(400).json({message:"course id ke bina kaise search kru mai tere semesters lodu !!!"})

    try {
        
        const semesters = await prisma.semesters.findMany({where:{courseId:courseId}})

        console.log("fetched all Semesters of a course")
        return res.status(200).json({message:"fetched all semesters of a course", semesters:semesters})

    } catch (err) {
        
        return res.status(500).json({error:err.message})
    }
    
 }
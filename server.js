import express from "express";
import { PrismaClient } from "@prisma/client";

import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";

const app = express();


app.use(express.json());

// user route --> for creating user-> students,teachers and admins.

app.use('/api/user',userRouter)

// admin routes -----> all admin work , creating course , semester , classes, teacher-courses, class-subjects etc

app.use('/api/admin',adminRouter)

// student route
// app.use('/api/student',studentRouter);

//auth route 
// app.use('/api/auth',authRouter)




app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});

import express from "express";
import { PrismaClient } from "@prisma/client";
import studentRouter from "./src/routes/students.route.js";
import authRouter from "./src/routes/auth.route.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// student route
app.use('/api/student',studentRouter);

//auth route 
app.use('/api/auth',authRouter)




app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});

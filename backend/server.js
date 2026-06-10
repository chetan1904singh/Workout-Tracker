import express from 'express'
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js' 
import mongoose from "mongoose";
import userRoutes from'./routes/user.js'


//midlewares
dotenv.config();
const app=express();

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next();
})
app.use(express.json());
//midlewares
 
//db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => console.log(err));
//db



//routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/users',userRoutes);
//routes

//
app.listen(process.env.PORT,()=>{
    console.log("Server Started!");
    
})


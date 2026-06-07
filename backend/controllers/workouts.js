import { Workout } from "../models/workoutModel.js";

async function getAllWorkouts(req,res){
    try {
        const workout=await Workout.find({})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

async function getOneWorkouts(req,res){
    const { title } = req.params;
    try {
        const workout=await Workout.find({title:title})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

async function postWorkouts(req,res){
    const {title,reps,load}=req.body;
    try {
        const workout=await Workout.create({title,reps,load})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

async function deleteWorkouts(req,res){
    const { title } = req.params;
    try {
        const workout=await Workout.findOneAndDelete({title:title})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
export {
    getAllWorkouts,getOneWorkouts,
   postWorkouts,deleteWorkouts
};


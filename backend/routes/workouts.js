import express from 'express';
import { Workout } from '../models/workoutModel.js';

const router=express.Router();

router.get('/:title',async (req,res)=>{
    const { title } = req.params;
    try {
        const workout=await Workout.find({title:title})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
});

router.post('/',async (req,res)=>{
    const {title,reps,load}=req.body;
    try {
        const workout=await Workout.create({title,reps,load})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})

router.delete('/:title',async (req,res)=>{
     const { title } = req.params;
    try {
        const workout=await Workout.findOneAndDelete({title:title})
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
});


export default router;
import express from 'express';
import { getAllWorkouts,getOneWorkouts,deleteWorkouts,postWorkouts } from '../controllers/workouts.js';

const router=express.Router();

router.get('/',getAllWorkouts);

router.get('/:title',getOneWorkouts);

router.post('/',postWorkouts)

router.delete('/:id',deleteWorkouts);


export default router;
import express from 'express';
import { getAllWorkouts,getOneWorkouts,deleteWorkouts,postWorkouts } from '../controllers/workouts.js';
import jwt  from 'jsonwebtoken';
import User from '../models/userModel.js';

const router=express.Router();

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
    return res.status(401).json({
      error: "Authorization token required",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.SECRET
    );

    req.user = await User.findById(_id);

    next();
  
} 

catch (error) {
    res.status(401).json({
      error: "Request is not authorized",
    });
  }
};



router.get('/',getAllWorkouts);

router.get('/:title',getOneWorkouts);

router.post('/',postWorkouts)

router.delete('/:id',deleteWorkouts);


export default router;
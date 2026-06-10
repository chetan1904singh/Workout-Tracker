import express from 'express'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const createToken=(id)=>{
    return jwt.sign({_id: id},process.env.SECRET,{expiresIn:'3d'});
}

const loginUser = async (req,res )=>{
    const {email,password}=req.body;
    
    try {
        const user=await User.findOne({email});
        if(!user){
        throw Error("User not Signed Up!")
    }                     
    const match=await bcrypt.compare(password,user.password);//entered pass,hashed pass in db
    if(!match){
        throw Error('Incorrect Password')
    }
    
    //checked so create token
    const token=createToken(user._id);
    res.status(200).json({email,token});
    //
    
    }catch (error) {
        res.status(400).json("Error");
    }
}   

const signUpUser = async (req,res )=>{
    const {email,password}=req.body;
    try {
        const user= await User.signup(email,password)
        //create token
         const token=createToken(user._id);
        //
        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
export{
    loginUser,signUpUser
}
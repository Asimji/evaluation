const express=require("express");
const bcrypt=require("bcrypt");
const userModel = require("../models/user.model");
var jwt = require('jsonwebtoken');
const blacklist = require("../blacklist");
require("dotenv").config()

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
const {name,email,gender,password,age,city,is_married}=req.body;
try {
    bcrypt.hash(password, 2, async function(err, hash) {
        if(err){
            res.status(200).json({error:err.message})
        }
        else if(hash){
            const user=new userModel({name,email,gender,password:hash,age,city,is_married})
            await user.save();
            res.status(200).json({user:req.body})
        }
    });
} catch (error) {
    res.status(400).json({error:error.message})
}

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
       const user=await userModel.findOne({email});
   if(user){
    bcrypt.compare(password, user.password,async function(err, result) {
        if(err){
            res.status(200).json({msg:"Password is Not Matching"})
        }
        else if(result){
            var token = jwt.sign({ userId:user._id,name:user.name }, process.env.privateKey);
            res.status(200).json({msg:"Login Successfull",token})
            
        }
    });
   }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            blacklist.push(token);
            res.status(200).json({msg:"Logout Successfully"})
            console.log("blacklist",blacklist)
        }
        else{
            res.status(200).json({msg:"Please Login"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports=userRouter

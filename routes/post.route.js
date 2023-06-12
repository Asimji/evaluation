const express=require("express");
const postModel = require("../models/post.model");
const auth = require("../middleware/auth.middleware");


const postRouter=express.Router();

postRouter.use(auth)

postRouter.post("/add",async(req,res)=>{
    try {
        const post=new postModel(req.body);
        await post.save();
        res.status(200).json({posts:req.body})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
postRouter.get("/",async(req,res)=>{
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||3
    try {
        const post=await postModel.find({device:req.query.device});
        res.status(200).json({user:post})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
postRouter.get("/top",async(req,res)=>{
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||3
    try {
        const post=await postModel.find({device:req.query.device}).sort({no_of_comments:1});
        res.status(200).json({user:post})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
const userIdinDoc=req.body.userId
const {id}=req.params
    try {
        const post=await postModel.findOne({_id:id});
        if(userIdinDoc===post.userId){
            await postModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({msg:"Updated Successfully"})
        }
        else{
            res.status(200).json({msg:"Id Not Matching"})
        }
    } catch (error) {
        
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
const userIdinDoc=req.body.userId
const {id}=req.params
    try {
        const post=await postModel.findOne({_id:id});
        if(userIdinDoc===post.userId){
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"Deleted Successfully"})
        }
        else{
            res.status(200).json({msg:"Id Not Matching"})
        }
    } catch (error) {
        
    }
})

module.exports=postRouter
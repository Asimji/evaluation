
const jwt=require("jsonwebtoken");
const blacklist = require("../blacklist");
require("dotenv").config()

const auth=async (req,res,next)=>{
  
    const token=req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            if(blacklist.includes(token)){
                res.status(200).json({msg:"Please Login Again"})
            }
            var decoded = jwt.verify(token, process.env.privateKey)
            req.body.userId=decoded.userId
            req.body.name=decoded.name
            console.log(decoded)
            next()
        }
        else{
            res.status(200).json({msg:"Please provide Token"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports=auth
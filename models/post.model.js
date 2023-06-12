const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
 userId:String,
 name:String,
    title:String,
 body:String,
 device:String,
 no_of_comments:Number
},{
    versionKey:false
})

const postModel=mongoose.model("posts",postSchema);

module.exports=postModel
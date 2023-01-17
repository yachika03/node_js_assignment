const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    city:{
        type:String,
        unique:true,
        required:true,
    },
    mobile:{
        type:Number,

    },
    mediaUrl:{
        type:String
    },
},{timestamps:true}

)
module.exports=mongoose.model("user",userSchema)
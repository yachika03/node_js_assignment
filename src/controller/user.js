const userModel=require("../model/userModel")
const cityModel=require("../model/city")

const validRequestBody=function(requestbody){
    return Object.keys(requestbody).length>0
}
const isvalidCity=function(data){
    if(data==undefined)return false
    return /^[A-Za-z]+$/.test(data)
}
const isValidPhone=function(data){
    if(data==undefined)return false
    return /^([6-9]\d{9})$/.test(data)
}
const createUser=async function(req,res){
    try {
        let requestbody=req.body
       let{name,city,mobile, mediaUrl}=requestbody
       if(!validRequestBody(requestbody))return res.status(300).send({code:300,msg:"body should not be empty"})
       if(!city)
    return res.status(300).send({code:300,msg:"city is required"})
    if(!name)
    return res.status(300).send({code:300,msg:"name is required"})
       if(!validRequestBody)return res.status(300).send({status:300,msg:"body should not be empty"})
       if(!isvalidCity(name))return res.status(300).send({status:300,msg:"name should contain only alphabets"})
       let validCity=await cityModel.findOne({city:city})
       if(!validCity) return res.status(404).send({status:404,msg:"city not found create a city first"})
       if(!isValidPhone(mobile)) return res.status(300).send({status:300,msg:"phone no should be only in numeric form and should contain 10 digits only"})
       const data=await userModel.create(requestbody)
       res.status(201).send({code:201,msg:"user is created",data:data})
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}
const getUser=async function(req,res){
    try {
        const user=await userModel.find()
        if(!user){
            return res.status(404).send({code:404,msg:"no user found"})
        }
        return res.status(200).send({code:200,msg:"all user",data:user})
    } catch (error) {
        return res.status(500).send({msg:error.message})
        
    }
}
let updateUser=async function(req,res){
    let userId=req.params.userId
    
    const requestbody=req.body
    let update={}
    const{name,city,mobile,mediaUrl}=requestbody
    if(name){
       if(!isvalidCity(name))
       return res.status(300).send({status:300,msg:"name should contain only alphabets"})
       update.name=name
    }
    if(city){
        let findCity=await cityModel.findOne({city:city})
        if(!findCity)return res.status(404).send({status:404,msg:"city not found create a city first"})
        update.city=city
    }
    if(mobile){
        if(isValidPhone(mobile)) return res.status(300).send({status:300,msg:"phone no should be only in numeric form and should contain 10 digits only"})
     update.mobile=mobile
    }
    if(mediaUrl)
    update.mediaUrl=mediaUrl
   let data=await userModel.findByIdAndUpdate({_id:userId},update,{new:true})
   return res.status(200).send({code:200,msg:"data is updated",data:data})
    }

module.exports.createUser=createUser
module.exports.updateUser=updateUser
module.exports.getUser=getUser
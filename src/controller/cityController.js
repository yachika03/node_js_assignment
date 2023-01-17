const cityModel=require("../model/city")
const validRequestBody=function(requestbody){
    return Object.keys(requestbody).length>0
}
const isvalidCity=function(data){
    if(data==undefined)return false
    return /^[A-Za-z]+$/.test(data)
}
const createCity=async function(req,res){
    try {
        
   
    let requestbody=req.body
    let{city}=requestbody
    if(!validRequestBody){
        return res.status(300).send({code:300,msg:"body should not be empty"})
    }
    if(!city)
    return res.status(300).send({code:300,msg:"city is required"})
  let cityLreadyexist=await cityModel.findOne({city:city})
  if(cityLreadyexist){
    return res.status(300).send({code:300,msg:"city already exist"})
  }
  if(!isvalidCity(city)){
    return res.status(300).send({code:300,msg:"city should only contain only Alphabets"})
  }
    const newCity=await cityModel.create(requestbody)
    res.status(201).send({code:201,msg:"city name inserted"})
} catch (error) {
    res.status(500).send({msg:error.message})    
}
}
const getcityData=async function(req,res){
    try {
        const allcities=await cityModel.find()
        res.status(200).send({code:200,msg:"all cities are found",data:allcities})
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}


module.exports.createCity=createCity
 module.exports.getcityData=getcityData

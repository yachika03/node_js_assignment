const express=require("express")
const router=express.Router()
const cityController=require("../controller/cityController")
const userController=require("../controller/user")
router.post("/create",cityController.createCity)
 router.get("/getcity",cityController.getcityData)
 router.post("/create/user",userController.createUser)
 router.get("/get/user",userController.getUser)
 router.patch("/update/:userId",userController.updateUser)

module.exports=router
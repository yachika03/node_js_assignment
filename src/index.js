const express=require("express")
const mongoose=require("mongoose")
const app=express()
const router=require("./route/route")
mongoose.set("strictQuery",true)
app.use(express.json())
app.use("/",router);
mongoose.connect("mongodb+srv://admin:admin@cluster0.uupxx9q.mongodb.net/data?retryWrites=true&w=majority",{
    // useNewUrlParser:true
}).then(()=>console.log("MongoDB is connected"))
.catch((error)=>console.log(error))

app.listen(process.env.PORT||3000,
    function(){
        console.log("Express app running on port"+(process.env.port||3000))
    })
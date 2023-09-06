const express=require("express")
const mongoose=require("mongoose")
const app=express()
const router=require("./route/route")
app.use(express.json())
require('dotenv').config({path:".env"})

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",router)
let PORT=process.env.PORT||3000

app.listen( PORT,function(){
    console.log("running on port" + PORT)
})


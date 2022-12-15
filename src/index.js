const express=require("express")
const mongoose=require("mongoose")
const app=express()
const router=require("./route/route")
app.use(express.json())

const mongoDB= "mongodb+srv://BhagwanNavthar:sOqsn7dh8KuLiKHp@cluster0.j8ysgx2.mongodb.net/Bhagwan73-DB"

mongoose.set('strictQuery', true)
mongoose.connect(mongoDB,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",router)
let PORT=process.env.PORT||3000

app.listen( PORT,function(){
    console.log("running on port" + PORT)
})


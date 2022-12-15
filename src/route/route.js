
const express=require("express")
const route=express.Router()
const {createUrl,getURL} =require("../controller/urlController")

//CREATE_URL
route.post('/url/shorten',createUrl)
//GET_URL
route.get("/:urlCode",getURL)
//ERROR_HANDLING_ROUTE
route.all("/*",function(req,res){
    return res.status(404).send({status:false,msg:"path not found"})
})


module.exports=route
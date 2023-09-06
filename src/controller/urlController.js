const urlModel = require('../models/urlModel');
const shortId= require('shortid');
const axios=require("axios");
const {redis}=require("./redis")

//                       <<<-->>>-CHECK_VALID_STRING-<<<-->>>
const isValidString = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

//                       <<<-->>>-CREATE_SHORT_URL-<<<-->>>

exports.createUrl=async function(req,res){
    try{
        if(Object.keys(req.body).length==0) return res.status(400).send({status:false,msg:"please provide the req body !!"})
        let data=req.body
        const {longUrl}=data
        if(!longUrl) return res.status(400).send({status:false,msg:"please provide the longURL in  req body !!"})
        if(!isValidString(longUrl)) return res.status(400).send({status:false,message:"invalid longUrl"})

    //CHECK_URL_IS_EXISTS_OR_NOT_BY_USING_AXIOS
    let options={
        method:"get",
        url:longUrl
    }
    let validURL=await axios(options)
    .then(()=>longUrl)
    .catch(()=>null)
    if(!validURL) return res.status(400).send({status:false,msg:`this ${longUrl} is not exists`})
    //CHECK_URL_UNIQUE_OR_NOT
    let unique=await urlModel.findOne({longUrl}).select({_id:0,createdAt:0,updatedAt:0,__v:0})
    if(unique) {
        //SET_URL_DOCUMENT_IN_CATCHES_DATABASE
        await redis.setex(longUrl,600,JSON.stringify(unique))
        return res.status(200).send({status:true,data:unique})
    }              
     //GENERATE_SHORT_ID_BY_USING_SHORTID_PACKAGE
     let shortid=shortId.generate().toLowerCase()
     data.urlCode=shortid
     //ACCESS_BASE_URL_FROM_REQ.HEADERS
     let baseURL=req.headers.host
     //CREATE_SHORT_URL_BY_USING_BASE_URL_AND_SHORT_ID
     let shortUrl=`http://${baseURL}/${shortid}` 
     data.shortUrl=shortUrl
    //CREATE_URL_DOCUMENT
    let url=await urlModel.create(data)
    //CREATE_NEW_OBJECT
    let result={
        longUrl:url.longUrl,
        urlCode:url.urlCode,
        shortUrl:url.shortUrl
    }
    return res.status(201).send({status:true,msg:result})
    }catch(err){
    return res.status(500).send({status:false,msg:err.message})
    }
}


//                       <<<-->>>-GET_URL-<<<-->>>

exports.getURL=async function(req,res){
    const {urlCode}=req.params
    if(!shortId.isValid(urlCode)) return res.status(400).send({status:false,msg:`this ${urlCode} is not valid`})
    //FIND_DATA_IN_CATCHES
    let fetchURLdocument=await redis.get(urlCode)
    if(fetchURLdocument){                                             //-- CATCH_HIT
        //CONVERT_STRING_TO_JSON
        var data = JSON.parse(fetchURLdocument);
        return res.status(302).redirect(data.longUrl)
    }else{     
        //FIND_DATA_IN_DATABASE                                         //-- CATCH_MISS
        let url=await urlModel.findOne({urlCode:urlCode}).select({_id:0,createdAt:0,updatedAt:0,__v:0})
        await redis.setex(urlCode, 600,JSON.stringify(url))   
        return res.status(302).redirect(url.longUrl)
    }
}


const Redis=require("ioredis")
require("dotenv").config({ path: ".env" })

const redis=new Redis({
  host:process.env.REDIS_HOST,
  port:process.env.REDIS_PORT,
  password:process.env.REDIS_PASS
})  

redis.on('connect',()=>{
  console.log('redis is connected ..')
})

redis.on('error', (error) => {
  console.log('Redis connection error:', error)
});

module.exports={redis}
const redis = require("redis");    //
const { promisify } = require("util");

//1. Connect to the redis server
const redisClient = redis.createClient(
    13803,                                                            //--------- PORT_NO
  "redis-13803.c264.ap-south-1-1.ec2.cloud.redislabs.com",            //----------- HOST
  { no_ready_check: true }
);
redisClient.auth("HEJPLy6ZywzWAaJ6uUo2rAVXqJO0JNrX", function (err) {  //--------- AUTHENTICATION
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

//2. Prepare the functions for each command
const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports={SET_ASYNC,GET_ASYNC}


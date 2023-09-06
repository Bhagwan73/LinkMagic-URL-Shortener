const express = require("express")
const mongoose = require("mongoose")
const routes = require("./route/route")
const cors=require("cors")
const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config({ path: ".env" })


 mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connection established successfully"))
    .catch((err) => console.log(err))

app.use("/", routes)
let PORT = process.env.PORT || 3001

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})


require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const route = require("./route")

const app = express()
const PORT = process.env.PORT || 7000;

app.use(cors())
app.use(route)

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected!`)
    }catch(err){}
}

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server Running!`)
})
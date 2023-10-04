require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const route = require("./route")

const app = express()
const PORT = process.env.PORT || 7000;

app.use(route)

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected to -> ${conn.connection.host}`)
    }catch(err){}
}

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server Listening on http://localhost:${PORT}/`)
})
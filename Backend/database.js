const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/Shopping_app"

const connectDb = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connected")
    } catch (error) {
        console.log("database connection failed")
    }
}

module.exports = connectDb;
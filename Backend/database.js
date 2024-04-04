const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/Shopping_app"

// const URL = "mongodb+srv://priya08:priya08@cluster0.5tmmtrm.mongodb.net/Eshopper?retryWrites=true&w=majority"

const connectDb = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connected")
    } catch (error) {
        console.log("database connection failed")
    }
}

module.exports = connectDb;
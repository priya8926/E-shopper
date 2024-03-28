const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const error = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

// route imports
const product =  require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1" , product)
app.use("/api/v1" , user)
// middleware for errors
app.use(error)

module.exports = app
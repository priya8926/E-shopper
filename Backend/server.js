require("dotenv").config();
const app = require("./app")
const connectDb = require("./database")
const cloudinary = require('cloudinary').v2;
const port = process.env.PORT


process.on("uncaughtException" , (err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncaugh exception")
    process.exit(1)

})
//connect to database
connectDb()

cloudinary.config({
    cloud_name :"dudeaukqz",
    api_key : 981397679212588,
    api_secret :"OCsfYJNax6AAYTaS6Avblf96Tvk"  
})

const server = app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`)
})

//unhandle promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection")

    server.close(() => {
        process.exit(1)
    })
});
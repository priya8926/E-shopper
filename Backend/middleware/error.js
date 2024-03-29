const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mondodb id error
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid : ${err.path}`
    err = new ErrorHandler(message , 400)
  }
  if(err.name === "jsonwebtokenError"){
    const message = `json web token is invalid , try again`
    err = new ErrorHandler(message , 400)
  }
  if(err.name === "TokenExpiredError"){
    const message = `json web token is Expired , try again`
    err = new ErrorHandler(message , 400)
  }
  // mongoose duplicate key
  // if(err.code === 11000){
  //   const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  //   err = new ErrorHandler(message , 400)
  // }
  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
};

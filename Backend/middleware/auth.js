const User = require("../models/UserModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");

const JWT = require("jsonwebtoken")

exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }
    const decodedData = JWT.verify(token, process.env.JWT_SCERET)
    req.user = await User.findById(decodedData.id)
    next()

})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `You are not authorized to perform this action`,
                403
            ))
        }
        next()
    }
}
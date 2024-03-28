const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")
const User = require("../models/UserModel")
const setToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")

//register user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is public_id of user",
            url: "avtarurl"
        }
    })
    setToken(user, 201, res)
})

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Email and Password are required', 400))
    }
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password ', 401))
    }

    const isPasswordMatched = user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password ', 401))
    }
    setToken(user, 200, res)
})

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        sucess: true,
        message: "Logged out"
    })
})

//get reset password token

exports.forgotPassword = catchAsyncError(async (req, res , next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('user not found', 404))
    }
    // get reset password token

    const resetToken = user.getResetPassToken()
    await user.save({ validateBeforeSave: false });

    //send it to user's email
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} /n/nIf you have not requested this email then ignore it `

    try {
        await sendEmail({
        email : user.email,
        subject : "Shopping app reset password",
        message,
        })
        res.status(200).json({success :  true , message : `Email sent to ${user.email} successfully`})
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false });


        next(new ErrorHandler(error.message, 500))
    }
})
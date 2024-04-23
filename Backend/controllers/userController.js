const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")
const User = require("../models/UserModel")
const setToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//register user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale"
    })
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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

    const isPasswordMatched = await user.comparePassword(password)

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

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('user not found', 404))
    }
    // get reset password token

    const resetTokenPromise = user.getResetPassToken()
    const resetToken = await resetTokenPromise;

    await user.save({ validateBeforeSave: false });

    //send it to user's email
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested for this email then ignore it `

    try {
        await sendEmail({

            email: user.email,
            subject: "Shopping app reset password",
            message,
        })
        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }

    })
    if (!user) {
        return next(new ErrorHandler("Reset password token is expired or has been invalid", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    setToken(user, 200, res)

})

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user })
})

//update password  
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect", 400))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400))
    }

    user.password = req.body.newPassword;
    await user.save();
    setToken(user, 200, res)
})

// update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndMidify: false,
    })
    res.status(200).json({ success: true, msg: "profile updated successfully", user });
})

//get all user -- admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })
})

// get single user details -- admin
exports.getSingleUserDetail = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    res.status(200).json({
        success: true,
        user
    })
})
// update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const users = await User.findById(req.user.id)
    if (!users) {
        return next(new ErrorHandler("user not found", 404))
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndMidify: false,
    })
    res.status(200).json({ success: true });
})
// delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId)

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: "User Deleted"
    });
})

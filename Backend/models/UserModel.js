const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const crypto = require("crypto")

const userScehema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name can not exceed  30 characters"],
        minLength: [3, 'Name shuold have atleast  3 characters']
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid Email address'],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
        minLength: [6, 'Password should be at least 6 character long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userScehema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token
userScehema.methods.jsonwebtoken = function () {
    return JWT.sign(
        { id: this._id },
        process.env.JWT_SCERET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

//compare password
userScehema.methods.comparePassword = async function (enterdpassword) {
    return await bcrypt.compare(enterdpassword, this.password)
}

//generating password reset token
userScehema.methods.getResetPassToken = async function () {
    
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hashing and adding reserpassword to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken;
}
module.exports = mongoose.model("User", userScehema)
const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

router.route("/register").post(controller.registerUser)

router.route("/login").post(controller.loginUser)

router.route("/password/forgot").post(controller.forgotPassword)

router.route("/logout").get(controller.logoutUser)

module.exports = router
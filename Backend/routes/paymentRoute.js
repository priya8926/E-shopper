const express = require("express")
const router = express.Router()
const { isAuthenticateUser , authorizeRoles} = require("../middleware/auth")
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController")

router.route("/process/payment").post(isAuthenticateUser , processPayment)

router.route("/stripeApiKey").get(isAuthenticateUser , sendStripeApiKey)

module.exports = router
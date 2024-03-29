const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth")

router.route("/register").post(controller.registerUser)

router.route("/login").post(controller.loginUser)

router.route("/password/forgot").post(controller.forgotPassword)

router.route("/password/reset/:token").put(controller.resetPassword)

router.route("/logout").get(controller.logoutUser)

router.route("/me").get(isAuthenticateUser, controller.getUserDetails)

router.route("/password/update").put(isAuthenticateUser, controller.updatePassword)

router.route("/me/update").put(isAuthenticateUser, controller.updateProfile)

router.route("/admin/getalluser").get(isAuthenticateUser, authorizeRoles("admin"), controller.getAllUsers)

router.route("/admin/getSingleuser/:id").get(isAuthenticateUser, authorizeRoles("admin"), controller.getSingleUserDetail)

router.route("/admin/user/updaterole/:id").put(isAuthenticateUser, authorizeRoles("admin"), controller.updateUserRole)

router.route("/admin/user/delete/:id").delete(isAuthenticateUser, authorizeRoles("admin"), controller.deleteUser)

module.exports = router
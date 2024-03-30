const express = require("express")
const router = express.Router()

const { isAuthenticateUser , authorizeRoles} = require("../middleware/auth")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrders } = require("../controllers/orderController")

router.route("/order/new").post(isAuthenticateUser , newOrder)

router.route("/order/:id").get(isAuthenticateUser , getSingleOrder )

router.route("/myorder").get(isAuthenticateUser, myOrders )

router.route("/admin/allorders").get(isAuthenticateUser , authorizeRoles("admin"), getAllOrders)

router.route("/admin/updateorder/:id").put(isAuthenticateUser , authorizeRoles("admin"),updateOrder)

router.route("/admin/deleteorder/:id").delete(isAuthenticateUser , authorizeRoles("admin"),deleteOrders)

module.exports = router
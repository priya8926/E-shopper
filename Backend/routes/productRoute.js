const express = require("express")
const controllers = require("../controllers/productController")
const { isAuthenticateUser , authorizeRoles} = require("../middleware/auth")
const router = express.Router()

router.route("/products").get( controllers.getAllProduct)

//create product
router.route("/products/new").post(isAuthenticateUser, authorizeRoles("admin"), controllers.createProduct)
 
//update product
router.route("/updateproduct/:id").patch(isAuthenticateUser , authorizeRoles("admin"), controllers.updateProduct)

// get  one product by id
router.route("/getproduct/:id").get(isAuthenticateUser , authorizeRoles("admin"), controllers.getProductDetails)

//delete product
router.route("/deleteproduct/:id").delete(isAuthenticateUser , authorizeRoles("admin"), controllers.deleteProduct)

module.exports = router
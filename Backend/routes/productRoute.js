const express = require("express")
const controllers = require("../controllers/productController")
const { isAuthenticateUser , authorizeRoles} = require("../middleware/auth")
const router = express.Router()

router.route("/products").get( controllers.getAllProduct)

router.route("/admin/products").get(isAuthenticateUser, authorizeRoles("admin"), controllers.getAdminProducts)
//create product
router.route("/admin/products/new").post(isAuthenticateUser, authorizeRoles("admin"), controllers.createProduct)
 
//update product
router.route("/admin/updateproduct/:id").patch(isAuthenticateUser , authorizeRoles("admin"), controllers.updateProduct)

// get  one product by id
router.route("/getproduct/:id").get( controllers.getProductDetails)

//delete product
router.route("/admin/deleteproduct/:id").delete(isAuthenticateUser , authorizeRoles("admin"), controllers.deleteProduct)

router.route("/review").put(isAuthenticateUser , controllers.reviewProduct)

router.route("/reviews/getallreviews").get(isAuthenticateUser , controllers.getAllProductReview)

router.route("/reviews/delete").delete(isAuthenticateUser , controllers.deleteProdutcReview)

module.exports = router
const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../models/ProductModel")
const ApiFeatures = require("../utils/apiFeatures")
const ErrorHandler = require("../utils/errorhandler")

//Create product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })

})
//get products
exports.getAllProduct = async (req, res) => {
    try {
        const resultPerPage = 10
        const productCount = await Product.countDocuments()

       const apifeatures= new  ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage)
        const products = await apifeatures.query;

        res.status(201).json({ success: true, products })
    } catch (error) {
        console.log("error getting product", error)
    }
}

// update product --- admin
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            res.status(500).json({ message: "product not found" })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(201).json({ success: true, message: "product updated", product })
    } catch (error) {
        console.log("error updating product", error)
    }
}
//get single product details
exports.getProductDetails = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }
        res.status(201).json({ success: true, product,productCount })
    } catch (error) {
        console.log("error fetching product details", error)
    }
}
//delete product -- admin
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            res.status(500).json({ message: "product not found" })
        }
        await product.deleteOne()

        res.status(500).json({ message: "product deleted" })
    } catch (error) {
        console.log("error deleting product ", error)
    }
}
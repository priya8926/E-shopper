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
        const resultPerPage = 8
        const productsCount = await Product.countDocuments()

        const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

        let products = await apifeatures.query;
        let filterProductByCount = products.length;
        apifeatures.pagination(resultPerPage);

        res.status(201).json({ success: true, products,productsCount,resultPerPage,filterProductByCount })
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
        res.status(201).json({ success: true, product })
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
//create new review or update the review
exports.reviewProduct = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating),
                    (rev.comment = comment)
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        data: 'Review added'
    })
})
// get all review of single product
exports.getAllProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete review
exports.deleteProdutcReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("product not found"))
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0
    reviews.forEach(rev => {
        avg += rev.rating
    })
    const ratings = avg / reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,
        { reviews, ratings, numOfReviews }, { new: true, runValidators: true, useFindAndModify: false })
        
    res.status(200).json({
        success: true,
        message: "Delete Review Successfully",
    })
})

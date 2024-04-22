const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")
const Product = require("../models/ProductModel")
const Order = require("../models/OrderModel")

//create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this product", 400))
    }
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity)
        })

    res.status(200).json({ success: true, order })
})

//get single order details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('No Order Found with this id', 401))
    }
    res.status(200).json({ success: true, order })

})
//get logged in user order details
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
        return res.status(404).json({ success: false, message: "No orders found." });
    }
    res.status(200).json({ success: true, orders })

})

// get all orders --admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()
    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found." });
    }

    let totalAmount = 0
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({ success: true, orders, totalAmount })
})

//update order status --admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order Found', 401))
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this product", 400))
    }
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity)
        })

    if (order.orderStatus === "Delivered") {
        order.deliverdAt = Date.now();
    }

    order.orderStatus = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true })

})
//update stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false });
}
// delete order --admin
exports.deleteOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.findById(req.params.id)

    if (!orders) {
        return next(new ErrorHandler('No Order Found', 401))
    }
    await orders.deleteOne()
    res.status(200).json({ success: true })

})
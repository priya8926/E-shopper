import React from 'react'
import './ConfirmOrder.css'
import Metadata from '../Layout/Metadata'
import CheckOutStep from './CheckOutStep'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

function ConfirmOrder() {
    const { shippingInfo, cartItems} = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)

    const subtotal = cartItems.reduce((acc , item) => acc + item.price * item.quantity, 0)

    const ShippingCharges = subtotal > 1000 ? 0 : 200

    const tax = subtotal * 0.18

    const totalPrice = subtotal + ShippingCharges + tax

    const address = `${shippingInfo.address} ,${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.country} , ${shippingInfo.pincode}`

    return (
        <>
            <Metadata titile="confirm order -- EShopper" />
            <div className='mt-5'>


                <CheckOutStep activeStep={1} />
                <div className="confirmOrderPage">
                    <div>
                        <div className="confirmShippingArea">
                            <Typography variant="h5">Shipping Info</Typography>
                            <div className="confirmShippingAreaBox">
                                <div>
                                    <p>Name: </p>
                                    <span>{user.name}</span>
                                </div>
                                <div>
                                    <p>Phone: </p>
                                    <span>{shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address: </p>
                                    <span>{address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography variant="h5">Your Cart Items : </Typography>
                            <div className="confirmCartItemsContainer">
                                {
                                    cartItems&& cartItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt='Product image' />
                                            <Link to={`/Product/${item.product}`}>{item.name}</Link>
                                            <span>
                                                {item.quantity} X ₹{item.price} = {" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="orderSummary">
                            <Typography>Order Summery </Typography>
                            <div>
                                <div>
                                    <p>Subtotal : </p>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div>
                                    <p>Shipping Charges : </p>
                                    <span>₹{ShippingCharges}</span>
                                </div>
                                <div>
                                    <p>GST : </p>
                                    <span>₹{tax}</span>
                                </div>
                            </div>
                            <div className="orderSummaryTotal">
                                <p>
                                    <b>Total : </b>
                                </p>
                                <span>₹{totalPrice}</span>
                            </div>
                            <button>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder

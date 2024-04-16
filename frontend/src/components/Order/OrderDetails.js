import React, { useEffect } from 'react'
import "./OrderDetails.css"
import Loading from '../Layout/Loader/Loading'
import { useAlert } from "react-alert"
import Metadata from '../Layout/Metadata'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { clearErros, getOrderDetails } from "../../actions/orderAction"

function OrderDetails() {
    const { order, loading, error } = useSelector((state) => state.orderDetails)

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErros())
        }
        dispatch(getOrderDetails(id))
    }, [dispatch, alert, error, id])
    return (
        <>
            {loading ? <Loading /> : <>
                <Metadata title="Order Details" />
                <div className="orderDetailsPage container">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">Order #{order && order._id}</Typography>
                        <Typography variant='h5'>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name : </p>
                                <span>{order.user && order.user.name}</span>
                            </div>

                            <div>
                                <p>Phone : </p>
                                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>

                            <div>
                                <p>Address : </p>
                                <span>{order.shippingInfo && `${order.shippingInfo.address} , ${order.shippingInfo.city} , ${order.shippingInfo.state} , 
                            ${order.shippingInfo.pincode} , ${order.shippingInfo.country}`}
                                </span>
                            </div>
                        </div>
                        <Typography variant='h6'>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                    {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                </p>
                            </div>
                            <div>
                                <p>Amount : </p>
                                <span>{order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography variant='h6'>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                    {order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsCartItems">
                        <Typography variant='h6'>Order Items : </Typography>
                        <div className='orderDetailsCartItemsContainer'>
                            {
                                order.orderItems &&
                                order.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X {item.price} = <b>{item.quantity * item.price}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default OrderDetails

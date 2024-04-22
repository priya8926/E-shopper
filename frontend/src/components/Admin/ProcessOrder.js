import React, { useEffect, useState } from 'react'
import Metadata from '../Layout/Metadata'
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import { getOrderDetails, clearErros, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loading from '../Layout/Loader/Loading';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';
import { Button } from '@mui/material';

function ProcessOrder() {
    const { order, loading, error } = useSelector((state) => state.orderDetails)
    const { isUpdated, error: updateError } = useSelector(state => state.order)

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const [status, setStatus] = useState("");
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErros())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErros())
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({
                type: UPDATE_ORDER_RESET
            })
        }
        dispatch(getOrderDetails(id))

    }, [dispatch, alert, error, id, updateError, isUpdated])

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData()

        myForm.set("status", status)

        dispatch(updateOrder(id, myForm))
    }
    return (
        <>
            <Metadata title={'Process order --admin'} />
            <div className="dashboard " style={{ zIndex: 1, top: 0 }}>
                <Sidebar />
                <div className="newProductContainer mb-5" style={{ backgroundColor: "white" }}>
                    {loading ? <Loading /> :
                        <>
                            <div className="confirmOrderPage" style={{ gridTemplateColumns: "4fr 3fr", margin: "3vmax 2vmax" }}>
                                <div>
                                    <div className="confirmShippingArea">
                                        <Typography variant="h5">Shipping Info</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p>Name : </p>
                                                <span>{order && order.user && order.user.name}</span>
                                            </div>

                                            <div>
                                                <p>Phone : </p>
                                                <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                            </div>

                                            <div>
                                                <p>Address :</p>
                                                <span>{order && order.shippingInfo && `${order.shippingInfo.address} , ${order.shippingInfo.city} , ${order.shippingInfo.state} , 
                            ${order.shippingInfo.pincode} , ${order.shippingInfo.country}`}
                                                </span>
                                            </div>
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
                                    <Typography variant='h6'>Process Order</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                                {order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="confirmCartItems">
                                        <Typography variant="h5">Your Cart Items : </Typography>
                                        <div className="confirmCartItemsContainer">
                                            {
                                                order.orderItems && order.orderItems.map((item) => (
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
                                        <Typography>Order Status </Typography>
                                        <form action="" onSubmit={updateOrderSubmitHandler}>
                                            <select onChange={(e) => setStatus(e.target.value)} value={status} style={{
                                                padding: "18px",
                                                width: "100%",
                                                margin: "3vmax 0vmax",
                                            }}>
                                                <option value="">Choose Category</option>
                                                {order.orderStatus === "Processing" && (
                                                    <option value="Shipped">Shipped</option>
                                                )}
                                                {order.orderStatus === "Shipped" && (
                                                    <option value="Delivered">Delivered</option>
                                                )}
                                            </select>
                                            <Button style={{
                                                backgroundColor: "#D19C97",
                                                color: "black",
                                                width: "21vw",
                                                padding: "14px",
                                                border: "none",
                                                borderRadius: 0,
                                                hover: {
                                                    Cursor: "pointer"
                                                }
                                            }}
                                                type="submit"
                                                disabled={
                                                    loading ? true : false || status === "" ? true : false
                                                }>Process
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}

export default ProcessOrder

import React, { useRef, useState, useEffect } from 'react'
import './Payment.css'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import CheckOutStep from './CheckOutStep'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import axios from 'axios'
import {clearErros , createOrder} from "../../actions/orderAction"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import { Typography } from '@mui/material'

function Payment() {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null)
    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { error } = useSelector((state) => state.newOrder)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice : orderInfo.subTotal,
        taxPrice: orderInfo.taxPrice,
        shippingPrice : orderInfo.shippingPrice,
        totalPrice : orderInfo.totalPrice

    }
    const submitHandler = async (e) => {
        e.preventDefault()

        payBtn.current.disabled = true

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.post(`/api/v1/process/payment`, paymentData, config)

            const client_secret = data.client_secret;


            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country
                        }
                    }
                }
            })
            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo = {
                        id : result.paymentIntent.id,
                        status : result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    navigate("/order/success")
                } else {
                    alert.error("There is some issue while processing payment ")
                }
            }
        } catch (error) {
            console.log(error, "error")
            payBtn.current.disabled = false
            //  alert.error(error.response.data.message)

        }
    }
    useEffect(() => {
        if (error){
            alert.error(error);
            dispatch(clearError())
        }
    }, [dispatch , error ,alert])

    return (
        <>
            <Metadata title="payment" />
            <div className="mt-5">
                <CheckOutStep activeStep={2} />
                <div className="paymentContainer">
                    <form action="" className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                        <Typography variant='h5'>Card Info</Typography>
                        <div>
                            <CreditCardIcon />
                            <CardNumberElement className='paymentInput' />
                        </div>
                        <div>
                            <EventIcon />
                            <CardExpiryElement className='paymentInput' />
                        </div>
                        <div>
                            <VpnKeyIcon />
                            <CardCvcElement className='paymentInput' />
                        </div>
                        <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                            ref={payBtn}
                            className='paymentFormBtn'
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment

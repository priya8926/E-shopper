import React, { useEffect } from 'react'
import "./OrderDetails.css"
import Loading from '../Layout/Loader/Loading'
import { useAlert } from "react-alert"
import Metadata from '../Layout/Metadata'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import {clearErros , getOrderDetails} from "../../actions/orderAction"

function OrderDetails() {
    const {order , loading , error} = useSelector((state) => state.orderDetails)

    const {id}  = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErros())
        }
        dispatch(getOrderDetails(id))
    },[dispatch , alert , error , id])
  return (
    <>
      
    </>
  )
}

export default OrderDetails

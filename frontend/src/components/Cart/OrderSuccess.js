import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';

function OrderSuccess() {
  return (
    <>
      <div className="orderSuccess">
        <CheckCircleIcon/>
        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  )
}

export default OrderSuccess

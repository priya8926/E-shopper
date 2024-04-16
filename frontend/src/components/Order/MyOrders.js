import React, { useRef, useState, useEffect } from 'react'
import './MyOrders.css'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material'
import { clearErros, myOrders } from "../../actions/orderAction"
import LaunchIcon from '@mui/icons-material/Launch';
import Loading from "../Layout/Loader/Loading";

function MyOrders() {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { user } = useSelector((state) => state.user)
  const { loading, error, orders } = useSelector(state => state.myOrders);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 250, flex: 0.7 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
      cellClassName: (params) => {
         return params.getValue(params.id , "status") === "Delivered" ? "greenColor" : "redColor"
      }
    },
    { field: "itemsQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", flex: 0.3, minWidth: 150, type: "number", sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}> <LaunchIcon /> </Link>
        )
      }
    }
  ]
  const rows = []

  orders && orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice
    })
  })

  useEffect(() => {
    if (error) {
      alert.error("Error Occurred!")
      dispatch(clearErros())
    }
    dispatch(myOrders())
  }, [dispatch, alert, error])


  return (
    <>
      <Metadata title={`${user.name}'s orders`} />
      {
        loading ? <Loading /> : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight
              className='myOrdersTable'
            />

          </div>
        )
      }
      {/* <Typography variant='h6'>{user.name}'s Orders</Typography> */}
    </>

  )
}

export default MyOrders

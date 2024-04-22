import React, { useEffect, useState } from 'react'
import './ProductList.css'
import { useNavigate, Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearErros, deleteOrder, getAdminOrders } from '../../actions/orderAction'
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';  
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar'
import { Button } from '@material-ui/core'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'

function OrderList() {
  const { error, orders } = useSelector((state) => state.allOrders)
  const {error : deleteError , isDeleted} = useSelector(state => state.order)

  const dispatch = useDispatch()
  const alert = useAlert()

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 250, flex: 0.7 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
      }
    },
    { field: "itemsQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", flex: 0.3, minWidth: 150, type: "number", sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/updateorder/${params.getValue(params.id, "id")}`}> <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </>
        )
      }
    }
  ]
  const rows = []

  orders && orders.forEach((item, index) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus
    })
  })

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErros())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErros())
    }
    if (isDeleted) {
      alert.success("Order deleted successfully!")
      dispatch({ type: DELETE_ORDER_RESET })
    }
    dispatch(getAdminOrders())
  }, [dispatch, alert, error , isDeleted , deleteError ])
  return (
    <>
      <Metadata title={`All Orders --admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id='productListHeading'>All Orders</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </>
  )
}

export default OrderList

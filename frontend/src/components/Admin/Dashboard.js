import {React, useEffect} from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { Typography } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux"
import { getAdminProduct } from '../../actions/productActions'
import { getAdminOrders } from '../../actions/orderAction'
import { Link } from 'react-router-dom'
import { Doughnut , Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { getAllUsers } from '../../actions/userActions'

function Dashboard() {
    const {  products } = useSelector((state) => state.products)
    const { orders } = useSelector((state) => state.allOrders)
    const {users} = useSelector((state) => state.allUsers)

    const dispatch = useDispatch()
    let outOfStock = 0

    let totalAmount = 0
    orders && orders.forEach((item) =>{
       totalAmount += item.totalPrice
    })    
    const formattedTotal = totalAmount.toFixed(2);

    products && products.forEach((item)=>{
        if(item.stock === 0){
            outOfStock += 1;
        }
    })
    const lineState = {
        labels : ["Initial Amount" , "Amount Earned"],
        datasets : [
            {
                label : "Total Amount",
                backgroundColor : ["#2209ef"],
                hoverBackgroundColor : ["#7669e1"],
                borderWidth: 2,
                data : [0,formattedTotal]
            }
        ]
    }
    const doughnutState = {
        labels : ["Out of Stock" , "In Stock"],
        datasets : [
            {
                backgroundColor : ["rgb(132, 33, 226)" , "rgb(15, 220, 128)"],
                hoverBackgroundColor : ["rgb(63, 4, 118)" , "rgb(6, 135, 77)"],
                data : [outOfStock , products.length - outOfStock]
            }
        ]
    }

  useEffect(()=>{
    
    dispatch(getAdminProduct())
    dispatch(getAdminOrders())
    dispatch(getAllUsers())

  },[dispatch])
    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className="dashboardContainer">
                    <Typography variant='h4'>Dashboard</Typography>
                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> ₹{formattedTotal}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Products</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/allorders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>

                    </div>
                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>
                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

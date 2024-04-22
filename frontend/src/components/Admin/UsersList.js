import React, { useEffect, useState } from 'react'
import './ProductList.css'
import { useNavigate, Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getAllUsers, clearErros, deteteUser } from '../../actions/userActions'
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar'
import { Button } from '@material-ui/core'
import { DELETE_USER_RESET } from '../../constants/userConstant'

function UsersList() {
    const { error, users, loading } = useSelector((state) => state.allUsers)
    const { error: deleteError, isDeleted } = useSelector(state => state.profile)

    const dispatch = useDispatch()
    const alert = useAlert()

    const deleteUserHandler = (id) => {
        dispatch(deteteUser(id))
    }
    const columns = [
        { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
        {
            field: "email", headerName: "Email", minWidth: 350, flex: 0.7,
        },
        { field: "name", headerName: "Name", minWidth: 140, flex: 0.5 },
        { field: "role", headerName: "Role", minWidth: 150, flex: 0.5 ,
        cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
          }},
        {
            field: "actions", headerName: "Actions", flex: 0.3, minWidth: 150, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/getSingleuser/${params.getValue(params.id, "id")}`}> <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        }
    ]
    const rows = []

    users && users.forEach((item, index) => {
        rows.push({
            id: item._id,
            email: item.email,
            name: item.name,
            role: item.role
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
            alert.success("User deleted successfully!")
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers())
    }, [dispatch, alert, error, deleteError, isDeleted])
    return (
        <>
            <Metadata title={`All users --admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productListHeading'>All Users</h1>

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

export default UsersList

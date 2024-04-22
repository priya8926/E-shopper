import React, { useEffect, useState } from 'react'
import './CreateNewProduct.css'
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import { clearErros, getUserDetails, updateUserDetails } from '../../actions/userActions'
import { Update_USER_RESET } from '../../constants/userConstant'
import Loading from "../Layout/Loader/Loading"

function UpdateUser() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const userId = useParams()

    const { user, error, loading } = useSelector(state => state.userDetails)
    const { isUpdated, error: updateError, loading: updateLoading } = useSelector(state => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        if (user && user._id !== userId.id) {
            dispatch(getUserDetails(userId.id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
        if (error) {
            alert.error("All feilds are required")
            dispatch(clearErros())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErros())
        }
        if (isUpdated) {
            alert.success("User Updated Successfully")
            dispatch({ type: Update_USER_RESET })
            navigate("/admin/users")
        }
    }, [error, alert, isUpdated, dispatch, navigate, user, userId])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("role", role)

        dispatch(updateUserDetails(userId.id, myForm))
    }

    return (
        <>
            <Metadata title={'Update user details --admin'} />
            <div className="dashboard " style={{ top: 0, left: 0, position: "fixed", zIndex: 1 }}>
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loading /> : <>
                        <form action=""
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={updateUserSubmitHandler}>
                            <h1>Update User </h1>
                            <div>
                                <PersonOutlineIcon />
                                <input type="text" placeholder='Product Name' required value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div>
                                <MailOutlineIcon />
                                <input type="email" placeholder='Email' required value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>


                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}  >
                                    <option>Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <Button id="createProductBtn" type="submit">
                                Update
                            </Button>
                        </form>
                    </>}
                </div>
            </div>
        </>
    )
}

export default UpdateUser

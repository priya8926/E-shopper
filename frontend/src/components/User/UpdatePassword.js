import React, { useEffect, useRef, useState } from 'react'
import './UpdatePassword.css'
import { Link, useNavigate } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from "react-redux"
import { clearErros, updatePassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { Update_Password_RESET } from '../../constants/userConstant';
import Loading from '../Layout/Loader/Loading';
import Metadata from "../Layout/Metadata"

function UpdatePassword() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { error, loading, isUpdated } = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("oldPassword" , oldPassword)
        myForm.set("newPassword" , newPassword)
        myForm.set("confirmPassword" , confirmPassword)
    
        dispatch(updatePassword(myForm))
    }
    useEffect(() => {
        if (error) {
            alert.error("Invalid Creadential")
            dispatch(clearErros())
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully")
            navigate("/account")
            dispatch({
                type: Update_Password_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated])
    
    return (
        <>
            {loading ? <Loading /> : (<>
                <Metadata title={"update password"} />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h3 className='updateProfileHeading'>Change Password</h3>
                        <form action="" className='updateProfileForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>

                            <div className="loginPassword">
                                <VpnKeyIcon />
                                <input type="password" name="password" placeholder="Old Password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>

                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input type="password" name="password" placeholder="New Password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>

                            <div className="loginPassword">
                                <LockIcon />
                                <input type="password" name="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Change Password" className='updatePasswordBtn' />
                        </form>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default UpdatePassword

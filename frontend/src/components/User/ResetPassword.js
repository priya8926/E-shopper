import React, { useEffect, useRef, useState } from 'react'
import './ResetPassword.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from "react-redux"
import { clearErros, resetPassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import Loading from '../Layout/Loader/Loading';
import Metadata from "../Layout/Metadata"

function ResetPassword() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { token } = useParams()
    console.log(token,"token")
    const { error, loading, success } = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(token, myForm))
    }
    useEffect(() => {
        if (error) {
            alert.error("Invalid Creadential")
            dispatch(clearErros())
        }
        if (success) {
            alert.success("Password Updated Successfully")
            navigate("/login")
        }
    }, [dispatch, error, alert, success])

    return (
        <>
            {loading ? <Loading /> : (<>
                <Metadata title={"update password"} />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h3 className='updateProfileHeading'>Change Password</h3>
                        <form action="" onSubmit={resetPasswordSubmit}>

                            <div >
                                <LockOpenIcon />
                                <input type="password" placeholder="New Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div>
                                <LockIcon />
                                <input type="password"  placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <input type="submit" value="Change Password" className='resetPasswordBtn' />
                        </form>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default ResetPassword

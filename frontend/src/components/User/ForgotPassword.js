import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector, useDispatch } from "react-redux"
import { clearErros, forgotPassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import Loading from '../Layout/Loader/Loading';
import Metadata from "../Layout/Metadata"

function ForgotPassword() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loading, message } = useSelector((state) => state.forgotPassword)

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("email", email)

        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error("Invalid Creadential")
            dispatch(clearErros())
        }
        if (message) {
            alert.success(message)
        }
    }, [dispatch, error, alert, message])
    return (
        <>
            {loading ? <Loading /> : (
                <>
                    <Metadata title={"forgot password"} />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h3 className='updateProfileHeading'>Forgot Password</h3>
                            <form action="" className='updateProfileForm' encType="multipart/form-data" onSubmit={forgotPasswordSubmit}>


                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <input type="submit" value="Send" className='forgotPasswordBtn' />
                            </form>
                        </div>
                    </div>
                </>
             )
            }
        </>
    )
}

export default ForgotPassword

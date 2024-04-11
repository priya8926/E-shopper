import React, { useEffect, useRef, useState } from 'react'
import './LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Loading from '../Layout/Loader/Loading';
import { useSelector, useDispatch } from "react-redux"
import { login, clearErros , register } from '../../actions/userActions';
import { useAlert } from 'react-alert';

function LoginSignup({history}) {
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { error, loading , isAuthenticated } = useSelector((state) => state.user)
    const { name, email, password } = user
    
    const [avatar, setAvatar] = useState("https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png")

    const [avatarPreview, setAvatarPreview] = useState("https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png")

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)

       dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }

    useEffect(() => {
        if (error) {
            alert.error("Invalid Creadential")
            dispatch(clearErros())
        }
        if(isAuthenticated){
            navigate("/account");
        }
    }, [dispatch, error, alert , history, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    return (
        <>
            {
                loading ? <Loading /> : (
                    <>

                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBox">
                                <div>
                                    <div className='login_signUp_toggle'>
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>
                                <form action="" className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmail">
                                        <MailOutlineIcon />
                                        <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input type="password" name="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                    </div>
                                    <Link to="/password/forgot">Forget Password ? </Link>
                                    <input type="submit" value="Login" className='loginBtn' />
                                </form>

                                <form action="" className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>

                                    <div className="signUpName">
                                        <PersonOutlineIcon />
                                        <input type="text" id="text" name="name" placeholder="Name" value={name} required onChange={registerDataChange} />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={registerDataChange} />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input type="password" name="password" placeholder="Password" required value={password} onChange={registerDataChange} />
                                    </div>
                                    <div id="registerImage" className="registerImage mx-2">
                                        <img src={avatarPreview} alt="Avtar preview" />
                                        <input type="file" name="avatar" accept='images/*' onChange={registerDataChange} />
                                    </div>
                                    <input type="submit" value="Register" className='signUpBtn' />
                                </form>
                            </div>
                        </div>

                    </>
                )
            }
        </>
    )
}
export default LoginSignup;

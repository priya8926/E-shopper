import React, { useState } from 'react'
import './UserOptions.css'
import { useNavigate, Link } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from '@mui/icons-material/esm/Dashboard';
import PersonIcon from '@mui/icons-material/esm/Person';
import ExitToAppIcon from '@mui/icons-material/esm/ExitToApp';
import ListAltIcon from '@mui/icons-material/esm/ListAlt';
import { logoutUser } from '../../actions/userActions';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert';

function UserOption({ user }) {
    const [open, setOpen] = useState(false)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    // const options = [
    //     { icon: <ListAltIcon />, name: "Orders", func: orders },
    //     { icon: <PersonIcon />, name: "Profile", func: account },
    //     { icon: <ExitToAppIcon />, name: "Logout", func: handleLogout },
    // ]
    // if (user.role === "admin") {
    //     options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    // }
    // function dashboard() {
    //     navigate("/dashboard")
    // }
    // function orders() {
    //     navigate("/orders")
    // }
    // function account() {
    //     navigate("/accout")
    // }
    const handleLogout = () => {
        dispatch(logoutUser())
        alert.success("Logout Succesfully")
    }
    return (
        <>
            <div className="dropdown">
                <button
                    className="btn border dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img
                        className='speedDialIcon'
                        src={user.avatar && user.avatar.url ? user.avatar.url : "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png"}
                        alt='profile'
                    />
                </button>
                <ul className="dropdown-menu">
                    {
                        user.role === "admin" &&

                        <li>
                            <Link className="dropdown-item" to="/dashboard">
                                <DashboardIcon />
                            </Link>
                        </li>
                    }
                    <li>
                        <Link className="dropdown-item" to="/orders">
                            <ListAltIcon />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/account">
                            <PersonIcon />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="" onClick={handleLogout}>
                            <ExitToAppIcon />
                        </Link>
                    </li>
                </ul>
            </div>

            {/* <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={
                    <img
                        className='speedDialIcon'
                        src={user.avatar && user.avatar.url ? user.avatar.url : "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png"}
                        alt='profile'
                    />
                }
                onClick={() => setOpen((prevOpen) => !prevOpen)}
            >

                {
                    options.map((item) => (
                        <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                    ))
                }
            </SpeedDial> */}
        </>
    )
}

export default UserOption

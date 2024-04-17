import React, { useState } from 'react'
import './UserOptions.css'
import { useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/esm/Dashboard';
import PersonIcon from '@mui/icons-material/esm/Person';
import ExitToAppIcon from '@mui/icons-material/esm/ExitToApp';
import ListAltIcon from '@mui/icons-material/esm/ListAlt';
import { logoutUser } from '../../actions/userActions';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert';

function UserOption({ user }) {
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleLogout = () => {
        dispatch(logoutUser())
        alert.success("Logout Succesfully")
    }
    return (
        <>
            <div className="dropdown">
                <button
                    className="btn dropdown-toggle"
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
                <ul className="dropdown-menu border-0" style={{ textAlign: "start" }}>
                    {
                        user.role === "admin" &&
                        <li>
                            <Link className="dropdown-item" to="/admin/dashboard" >
                                <DashboardIcon /> Dashboard
                            </Link>
                        </li>
                    }
                    <li>
                        <Link className="dropdown-item" to="/account">
                            <PersonIcon /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/orders">
                            <ListAltIcon /> Orders
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="" onClick={handleLogout}>
                            <ExitToAppIcon /> Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserOption

import React, { useEffect } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Layout/Loader/Loading'
import { useDispatch, useSelector } from 'react-redux';
import Metadata from '../Layout/Metadata';

function Profile() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    })
    return (
        <>
            {loading ? <Loading /> : (
                <>
                    <Metadata title={`${user.name}'s profile`} />
                    <div className="profileContainer">
                        <div>
                            <h2 className='mb-2'>My Profile</h2>
                            <img src={user.avatar && user.avatar.url ? user.avatar.url : "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png"} alt="profile img" />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        {console.log("imggg ", user.avatar)}

                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile

import React, { useEffect, useRef, useState } from 'react'
import './UpdateProfile.css'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSelector, useDispatch } from "react-redux"
import { clearErros, loadUser, upateProfile } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { Update_Profile_RESET } from '../../constants/userConstant';
import Loading from '../Layout/Loader/Loading';
import Metadata from "../Layout/Metadata"

function UpdateProfile() {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const [name, setName] = useState()
  const [email, setEmail] = useState()

  const [avatar, setAvatar] = useState("https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png")

  const [avatarPreview, setAvatarPreview] = useState("https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png")

  const upateProfileSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("avatar", avatar)

    dispatch(upateProfile(myForm))
  }

  const upateProfileDataChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      } 
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }
    if (error) {
      alert.error("Invalid Creadential")
      dispatch(clearErros())
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully")
      dispatch(loadUser())
      navigate("/account")
      dispatch({
        type: Update_Profile_RESET
      })
    }
  }, [dispatch, error, alert, user, isUpdated])
  return (
    <>
      {loading ? <Loading /> : (<>
      <Metadata title={"update profile"}/>
        <div className="upateProfileContainer">
          <div className="upateProfileBox">
            <h3 className='updateProfileHeading'>Update Profile</h3>
            <form action="" className='updateProfileForm' encType="multipart/form-data" onSubmit={upateProfileSubmit}>

              <div className="upateProfileName">
                <PersonOutlineIcon />
                <input type="text" id="text" name="name" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="upateProfileEmail">
                <MailOutlineIcon />
                <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}  />
              </div>

              <div id="updateProfileImage" className="updateProfileImage mx-2">
                <img src={avatarPreview} alt="Avtar preview" />
                <input type="file" name="avatar" accept='images/*' onChange={upateProfileDataChange}  />
              </div>

              <input type="submit" value="Update" className='upateProfileBtn' />
            </form>
          </div>
        </div>
      </>)}
    </>
  )
}

export default UpdateProfile

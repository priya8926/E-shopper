import React, { useState } from 'react'
import './Shipping.css'
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { saveShippingInfo } from '../../actions/cartActions'
import Metadata from '../Layout/Metadata'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from "country-state-city"
import { useAlert } from 'react-alert';
import CheckOutStep from './CheckOutStep'

function Shipping() {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector(state => state.cart)

  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pincode, setPincode] = useState(shippingInfo.pincode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

  const shippingSubmit = (e) => {
    e.preventDefault()

    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert.error("Phone Sholud be 10 digits long")
      return
    }
    dispatch(saveShippingInfo({address,city,state,country,pincode,phoneNo}))
    navigate("/order/confirm")
  }
  return (
    <>
      <Metadata title="Shipping Information -- EShopper" />
      <div className='mt-5'>
        <CheckOutStep activeStep={0} />
        <div className="shippingContainer mt-3">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form action="" className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>

              <div>
                <HomeIcon />
                <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div>
                <LocationCityIcon />
                <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div>
                <PinDropIcon />
                <input type="text" placeholder='Pincode' required value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>

              <div>
                <PhoneIcon />
                <input type="text" placeholder='Phone No' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
              </div>

              <div>
                <PublicIcon />
                <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Country</option>

                  {Country && Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}> {item.name}</option>
                  ))}
                </select>
              </div>

              {country && (
                <div>
                  <TransferWithinAStationIcon />
                  <select required value={state} onChange={(e) => setState(e.target.value)} >
                    <option value="">Select State</option>
                    {
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
              )}

              <input type="submit" value="Continue" className='shippingBtn' disabled={state ? false : true} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shipping

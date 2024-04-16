import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails';
import LoginSignup from './components/User/LoginSignup';
import { loadUser } from './actions/userActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey")

    setStripeApiKey(data.stripeApiKey)
  }

  const isNavbarVisible = !['/shipping', '/order/confirm', '/payment', "/process/payment", "/order/success"].includes(location.pathname);

  const isFooterVisible = !["/login", "/me/update", "/password/update", "/password/forgot", "/shipping", '/order/confirm', "/process/payment", "/order/success"].includes(location.pathname);


  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey()
  }, []);

  return (
    <>
      {isNavbarVisible && <Navbar />}
      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route exact path="/Products" element={<Shop />} />

        <Route exact path="/Products/:keyword" element={<Shop />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />

        <Route path="/account" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/me/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } />

        <Route exact path="/order/confirm" element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        } />

        {
          stripeApiKey && (
            <Route exact path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            } />

          )
        }

        <Route exact path="/order/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />

        <Route exact path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />

        <Route exact path="/order/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />

        <Route exact path="/login" element={<LoginSignup />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

      </Routes>

      {isFooterVisible && <Footer />}

    </>
  );
}

export default App;

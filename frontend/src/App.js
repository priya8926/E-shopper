import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails';
import LoginSignup from './components/User/LoginSignup';
import store from './store'
import { loadUser } from './actions/userActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart'

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
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
        {/* <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } /> */}

        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<LoginSignup />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

      </Routes>
      {location.pathname.startsWith("/login") || location.pathname.startsWith("/me/update") || location.pathname.startsWith("/password/update") || location.pathname.startsWith("/password/forgot") ? null : <Footer />}

    </>
  );
}

export default App;

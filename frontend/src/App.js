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

function App() {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(loadUser())
    const user = loadUser()
    console.log(user.user , " user")
  })
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Products" element={<Shop />} />
        <Route exact path="/Products/:keyword" element={<Shop />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/login" element={<LoginSignup />} />
      </Routes>
      {location.pathname.startsWith("/login") ? null : <Footer />}
    </>
  );
}

export default App;

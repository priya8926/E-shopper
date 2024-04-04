import './App.css';
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path= "/Products" element = {<Shop/>}/>
        <Route path= "/Products/:keyword" element = {<Shop/>}/>
        <Route path= "/product/:id" element = {<ProductDetails/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

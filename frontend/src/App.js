import './App.css';
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Shop from './components/Shop';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path= "/shop" element = {<Shop/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

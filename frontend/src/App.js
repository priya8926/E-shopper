import './App.css';
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

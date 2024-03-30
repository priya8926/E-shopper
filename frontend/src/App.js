import './App.css';
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path=""  element={<Header />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

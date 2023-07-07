import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AppContext from './store/AppContext';
import Navbar from './components/Navbar';
import MyBookings from './pages/MyBookings';

const App: React.FC = () => {
  const { accessToken } = useContext(AppContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={accessToken ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
};

export default App;

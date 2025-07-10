import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Interests from './pages/Interests';
import OtpLogin from './pages/OtpLogin';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h1>💍 Kalyana Vaibhogam 💍</h1>
      </div>
      <Routes>
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/interests" element={<Interests />} />
      </Routes>
    </BrowserRouter>
  );
}
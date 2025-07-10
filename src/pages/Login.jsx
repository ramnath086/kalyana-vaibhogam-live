import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setE] = useState('');
  const [password, setP] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('https://kalyana-backend.onrender.com/api/auth/login', {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>💍 Kalyana Vaibhogam 💍</h2>
      <input placeholder="Email" onChange={e => setE(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setP(e.target.value)} />
      <button onClick={login}>Login</button>

      <div style={{ marginTop: '20px' }}>
        Don't have an account? 👉 <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}
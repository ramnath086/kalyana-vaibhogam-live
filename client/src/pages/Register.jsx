import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await axios.post("https://kalyana-backend.onrender.com/api/auth/register", form);
      alert("Registered!");
      navigate('/');
    } catch (e) {
      alert("Registration failed");
      console.error("REGISTRATION ERROR ❌", e.response?.data || e.message);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register - Kalyana Vaibhogam</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
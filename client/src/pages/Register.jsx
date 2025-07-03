import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api'; // ✅ Import the shared Axios instance

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      // ✅ Use shared API instance
      await API.post('/auth/register', form);
      alert('Registered!');
      navigate('/');
    } catch (e) {
      console.error('❌ Registration error:', e.response?.data || e.message);
      alert(e.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register - Kalyana Vaibhogam</h2>
      <div style={{ marginTop: '20px' }}>
        <input
          placeholder="Name"
          style={{ padding: '8px', margin: '5px' }}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          placeholder="Email"
          type="email"
          style={{ padding: '8px', margin: '5px' }}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          style={{ padding: '8px', margin: '5px' }}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button onClick={submit} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Register
        </button>
      </div>
    </div>
  );
}
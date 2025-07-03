import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api'; // ✅ Shared Axios

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await API.post('/auth/register', form);
      alert('✅ Registered successfully!');
      navigate('/');
    } catch (e) {
      console.error('❌ Register error:', e.response?.data || e.message);
      alert(e?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register - 💍 Kalyana Vaibhogam</h2>

      <div style={{ marginTop: '20px' }}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={{ margin: '5px', padding: '8px' }}
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          style={{ margin: '5px', padding: '8px' }}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          style={{ margin: '5px', padding: '8px' }}
        />
        <br />
        <button
          onClick={submit}
          style={{
            padding: '10px 20px',
            marginTop: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
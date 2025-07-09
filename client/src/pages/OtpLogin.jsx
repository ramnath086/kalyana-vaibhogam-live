import React, { useState } from 'react';
import axios from 'axios';

export default function OtpLogin() {
  console.log("🚀 OtpLogin component loaded!");

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://kalyana-vaibhogam.onrender.com/api/otp/send', { phone });
      console.log("✅ OTP Sent:", res.data);
      alert("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      console.error("❌ Failed to send OTP", err.message);
      alert("Failed to send OTP. Check number format.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://kalyana-vaibhogam.onrender.com/api/otp/verify', { phone, otp });
      console.log("✅ OTP Verified:", res.data);
      alert("OTP verified ✅");
      window.location.href = '/profile';
    } catch (err) {
      console.error("❌ Verify failed", err.message);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🔐 OTP Login Page</h2>
      <p style={{ color: 'green' }}>Component reached! ✅</p>

      <input
        type="text"
        placeholder="Enter phone number (+91...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 10, width: 260 }}
      />
      <br />

      {!otpSent ? (
        <button onClick={sendOTP} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px' }}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: 10, width: 140, marginTop: 20 }}
          />
          <br />
          <button onClick={verifyOTP} disabled={loading} style={{ padding: '10px 20px', marginTop: '10px' }}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}
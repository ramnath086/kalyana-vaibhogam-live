import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    try {
      await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/send", { phone });
      alert("📩 OTP Sent!");
      setOtpSent(true);
    } catch (err) {
      console.error("❌ OTP Send Error:", err.message);
      alert("Failed to send OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/verify", { phone, otp });
      alert("✅ OTP Verified! Logged in.");
      // If using token later, store it:
      // localStorage.setItem("token", res.data.token);
      window.location.href = "/profile"; // Navigate user
    } catch (err) {
      console.error("❌ OTP Verification Error:", err.message);
      alert("OTP is incorrect or expired.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h2>📱 OTP Login - Kalyana Vaibhogam</h2>

      <input
        type="text"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 10, margin: 10, width: 250 }}
      />
      <br />

      {!otpSent && (
        <button onClick={sendOTP} style={{ padding: "10px 20px" }}>
          Send OTP
        </button>
      )}

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: 10, margin: 10, width: 150 }}
          />
          <br />
          <button onClick={verifyOTP} style={{ padding: "10px 20px" }}>
            Verify & Login
          </button>
        </>
      )}
    </div>
  );
}
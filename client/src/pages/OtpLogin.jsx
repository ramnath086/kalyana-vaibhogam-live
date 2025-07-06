import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {
    try {
      await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/send", { phone });
      alert("📨 OTP sent to your phone!");
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP.");
      console.error(err);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/verify", { phone, otp });
      alert("✅ OTP Verified!");
      // Optionally save token if using JWT
      // localStorage.setItem("token", res.data.token);
      window.location.href = "/profile";
    } catch (err) {
      alert("❌ Invalid OTP");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🔐 OTP Login - Kalyana Vaibhogam</h2>

      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Enter phone number (+91....... )"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{ padding: "10px", width: "280px", marginBottom: "10px" }}
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
              onChange={e => setOtp(e.target.value)}
              style={{ padding: "10px", width: "200px", marginTop: "10px" }}
            />
            <br />
            <button onClick={verifyOTP} style={{ padding: "10px 20px", marginTop: "10px" }}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
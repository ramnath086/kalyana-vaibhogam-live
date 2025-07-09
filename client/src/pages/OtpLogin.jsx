import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  console.log("📦 OtpLogin.jsx loaded!");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://kalyana-vaibhogam.onrender.com/api/otp/send",
        { phone }
      );
      console.log("✅ OTP Sent:", res.data);
      alert("OTP sent to your phone number!");
      setOtpSent(true);
    } catch (err) {
      console.error("❌ Error sending OTP:", err);
      alert("Failed to send OTP. Please check the number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://kalyana-vaibhogam.onrender.com/api/otp/verify",
        { phone, otp }
      );
      console.log("✅ OTP Verified:", res.data);
      alert("Login successful ✅");

      // Optionally store session/token here
      // localStorage.setItem("token", res.data.token);

      window.location.href = "/profile";
    } catch (err) {
      console.error("❌ OTP Verification Failed:", err);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💍 Kalyana Vaibhogam</h1>
      <h2>🔐 OTP Login</h2>
      <p style={{ color: "green" }}>📢 OtpLogin component rendered successfully!</p>

      <input
        type="text"
        placeholder="Enter phone number (+91...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 10, margin: 10, width: 250 }}
      />

      <br />

      {!otpSent ? (
        <button
          onClick={sendOTP}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: 10, margin: 10, width: 150 }}
          />
          <br />
          <button
            onClick={verifyOTP}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  console.log("🚀 OtpLogin component loaded!");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    try {
      alert("📨 (Mock) OTP sent to " + phone + ". Use 123456.");
      setOtpSent(true);
    } catch (err) {
      console.error("❌ OTP send failed:", err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = () => {
    if (otp === "123456") {
      alert("✅ OTP Verified!");
      window.location.href = "/profile";
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>🔐 OTP Login - Kalyana Vaibhogam</h2>
      <p style={{ color: "green" }}>✅ Component rendering confirmed</p>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 10, margin: 10, width: 250 }}
      />
      <br />
      {!otpSent && (
        <button onClick={sendOTP} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      )}
      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: 10, marginTop: 20 }}
          />
          <br />
          <button onClick={verifyOTP} style={{ marginTop: 10 }}>
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
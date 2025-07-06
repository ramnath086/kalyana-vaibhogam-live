import React, { useState } from "react";
import axios from "axios";

export default function OtpLogin() {
  console.log("✅ OtpLogin component loaded"); // Debug log — check DevTools Console

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Send OTP
  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/send", { phone });
      console.log("✅ OTP sent response:", res.data);
      alert("📩 OTP has been sent to your phone.");
      setOtpSent(true);
    } catch (err) {
      console.error("❌ Failed to send OTP", err.message || err);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://kalyana-vaibhogam.onrender.com/api/otp/verify", {
        phone,
        otp
      });

      console.log("✅ OTP Verified", res.data);
      alert("Login successful ✅");
      // TODO: Save token/session → Replace this with auth state later
      window.location.href = "/profile";
    } catch (err) {
      console.error("❌ OTP Verification Failed", err.message || err);
      alert("Invalid OTP or expired. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔐 OTP Login - Kalyana Vaibhogam</h2>

      <input
        type="text"
        placeholder="Enter phone number e.g. +91XXXXXXXXXX"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{ padding: 10, width: 250, marginTop: 10 }}
      />

      <br />

      {!otpSent && (
        <button
          onClick={sendOTP}
          disabled={loading}
          style={{ padding: "10px 20px", marginTop: "15px" }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      )}

      {otpSent && (
        <>
          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{ padding: 10, width: 150 }}
            />
          </div>
          <button
            onClick={verifyOTP}
            disabled={loading}
            style={{ padding: "10px 20px", marginTop: "15px" }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
}
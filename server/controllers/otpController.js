const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// 💾 Temporary In-Memory Store (replace with DB or Redis in production)
const otpStore = {};

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ error: "Phone number is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  try {
    await client.messages.create({
      body: `Your Kalyana Vaibhogam OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    otpStore[phone] = {
      otp,
      createdAt: Date.now()
    };

    console.log(`📤 OTP Sent to ${phone}: ${otp}`);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("❌ OTP Send Error:", err.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];
  if (!record) {
    return res.status(400).json({ error: "No OTP sent to this number" });
  }

  const isExpired = (Date.now() - record.createdAt) > 300000; // 5 minutes
  if (isExpired) {
    delete otpStore[phone];
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.otp == otp) {
    delete otpStore[phone]; // 🧹 One-time use
    return res.json({ success: true, message: "OTP verified", token: "fake-jwt-token" });
  }

  return res.status(400).json({ error: "Invalid OTP" });
};
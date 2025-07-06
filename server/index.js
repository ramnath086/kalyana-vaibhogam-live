const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const otpRoutes = require("./routes/otp");
app.use("/api/otp", otpRoutes);
// ✅ Enable CORS for Vercel frontend
app.use(
  cors({
    origin: "https://kalyana-vaibhogam.vercel.app", // 🔗 Update if custom domain is added
  })
);

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Import and use routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const interestRoutes = require("./routes/interest");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interest", interestRoutes);

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.send("✅ Kalyana Vaibhogam API is working!");
});

// ✅ Connect to MongoDB Atlas and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message);
  });
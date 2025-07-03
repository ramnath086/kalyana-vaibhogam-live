const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const interestRoutes = require("./routes/interest");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interest", interestRoutes);

// Health check
app.get("/health", (req, res) => {
  res.send("✅ Kalyana Vaibhogam API is working!");
});

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ Mongo Connection Failed:", err));
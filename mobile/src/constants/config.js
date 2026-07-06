// src/constants/config.js
// App-wide configuration constants.

const Config = {
  // API base URL — change to your backend address
  // For local development with Expo: use your machine's LAN IP, not localhost
  // API_URL: "http://localhost:5050/api/v1",

  // Live web portal base URL (for production)
  PORTAL_URL: "https://udhari-tracking.vercel.app",
  // Local dev portal URL
  // PORTAL_URL: "http://172.27.79.146:3000",

  API_URL: "https://udhari-ajw3.onrender.com/api/v1",

  // OTP length
  OTP_LENGTH: 6,

  // OTP resend cooldown (seconds)
  OTP_RESEND_COOLDOWN: 30,

  // App info
  APP_NAME: "Udhari",
  APP_VERSION: "1.0.0",
};

export default Config;

// src/constants/config.js
// App-wide configuration constants.

const Config = {
  // API base URL — change to your backend address
  // For local development with Expo: use your machine's LAN IP, not localhost
  API_URL: "http://192.168.1.109:5050/api/v1", //5g

  // API_URL: "http://192.168.1.108:5050/api/v1",

  // OTP length
  OTP_LENGTH: 6,

  // OTP resend cooldown (seconds)
  OTP_RESEND_COOLDOWN: 30,

  // App info
  APP_NAME: "Udhari",
  APP_VERSION: "1.0.0",
};

export default Config;

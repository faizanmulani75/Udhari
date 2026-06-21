const Razorpay = require("razorpay");

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const isMockMode = !keyId || !keySecret;

let razorpayInstance = null;

if (!isMockMode) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    console.log("💳 Razorpay configured successfully in production mode.");
  } catch (error) {
    console.error("❌ Failed to initialize Razorpay:", error);
  }
} else {
  console.log("🛠️ Razorpay credentials missing. Running in simulated Mock Payment mode.");
}

module.exports = {
  razorpay: razorpayInstance,
  isMockMode,
  keyId,
};

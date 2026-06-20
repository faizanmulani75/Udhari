// src/routes/authRoutes.js
// Authentication routes.

const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Public routes (mobile app login only)
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

// Protected routes
router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;

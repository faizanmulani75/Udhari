// src/routes/authRoutes.js
// Authentication routes.

const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/register", authController.register);
router.post("/register/verify", authController.registerVerify);
router.post("/login", authController.login);
router.post("/staff/verify-invite", authController.verifyStaffInvite);
router.post("/staff/activate", authController.activateStaffAccount);

// Protected routes
router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;

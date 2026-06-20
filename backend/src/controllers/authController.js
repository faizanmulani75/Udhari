// src/controllers/authController.js
// Controller for the authentication flow.

const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * Send an OTP code to a phone number.
 */
const sendOtp = catchAsync(async (req, res) => {
  const { phone } = req.body;
  const result = await authService.sendOtp(phone);
  
  return ApiResponse.success(res, result.message, null);
});

/**
 * Verify an OTP code and return auth credentials.
 */
const verifyOtp = catchAsync(async (req, res) => {
  const { phone, otp } = req.body;
  const result = await authService.verifyOtp(phone, otp);

  return ApiResponse.success(res, "Authentication successful", result);
});

/**
 * Get current user profile and shop details.
 */
const getProfile = catchAsync(async (req, res) => {
  // authId is attached to req by the auth middleware
  const result = await authService.getProfile(req.authId);

  return ApiResponse.success(res, "Profile fetched successfully", result);
});

module.exports = {
  sendOtp,
  verifyOtp,
  getProfile,
};

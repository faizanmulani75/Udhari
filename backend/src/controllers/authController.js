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

/**
 * Register a new user (request OTP).
 */
const register = catchAsync(async (req, res) => {
  const { name, phone, email, password } = req.body;
  const result = await authService.registerRequest(name, phone, email, password);
  return ApiResponse.success(res, result.message, null);
});

/**
 * Verify OTP and complete registration.
 */
const registerVerify = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.registerVerify(email, otp);
  return ApiResponse.success(res, "Registration successful", result);
});

/**
 * Log in with email/phone and password.
 */
const login = catchAsync(async (req, res) => {
  const { identifier, password } = req.body;
  const result = await authService.login(identifier, password);
  return ApiResponse.success(res, "Login successful", result);
});

/**
 * Verify a staff member's invite code.
 */
const verifyStaffInvite = catchAsync(async (req, res) => {
  const { inviteCode } = req.body;
  const result = await authService.verifyStaffInvite(inviteCode);
  return ApiResponse.success(res, "Invite code verified successfully", result);
});

/**
 * Activate a staff account with a password.
 */
const activateStaffAccount = catchAsync(async (req, res) => {
  const { inviteCode, password } = req.body;
  const result = await authService.activateStaffAccount(inviteCode, password);
  return ApiResponse.success(res, "Staff account activated successfully", result);
});

/**
 * Update user push token.
 */
const updatePushToken = catchAsync(async (req, res) => {
  const { pushToken } = req.body;
  const result = await authService.updatePushToken(req.userId, pushToken);
  return ApiResponse.success(res, result.message, result);
});

/**
 * Request password reset (forgot password flow).
 */
const forgotPasswordRequest = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPasswordRequest(email);
  return ApiResponse.success(res, result.message, result);
});

/**
 * Verify OTP and reset password.
 */
const forgotPasswordReset = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const result = await authService.forgotPasswordReset(email, otp, newPassword);
  return ApiResponse.success(res, result.message, result);
});

module.exports = {
  sendOtp,
  verifyOtp,
  getProfile,
  register,
  registerVerify,
  login,
  verifyStaffInvite,
  activateStaffAccount,
  updatePushToken,
  forgotPasswordRequest,
  forgotPasswordReset,
};

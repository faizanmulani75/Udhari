// src/services/authService.js
// Authentication API calls — send OTP, verify OTP, fetch user profile, logout.

import api from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Request an OTP to be sent to the given phone number.
 *
 * @param {string} phone - Phone number with country code (e.g., "+919876543210")
 * @returns {Promise<object>} - { success, message }
 */
export const sendOtp = async (phone) => {
  const response = await api.post("/auth/send-otp", { phone });
  return response.data;
};

/**
 * Verify the OTP and receive access + refresh tokens.
 *
 * @param {string} phone - Phone number used to request OTP
 * @param {string} otp   - 6-digit OTP entered by the user
 * @returns {Promise<object>} - { success, data: { accessToken, refreshToken, user, shop } }
 */
export const verifyOtp = async (phone, otp) => {
  const response = await api.post("/auth/verify-otp", { phone, otp });
  return response.data;
};

/**
 * Persist auth tokens and user data to AsyncStorage.
 * Called after successful OTP verification.
 *
 * @param {object} authData - { accessToken, refreshToken, user, shop }
 */
export const persistAuth = async (authData) => {
  const { accessToken, refreshToken, user, shop } = authData;

  const entries = [
    ["accessToken", accessToken],
    ["refreshToken", refreshToken || ""],
    ["user", JSON.stringify(user)],
  ];

  if (shop?.id) {
    entries.push(["shopId", shop.id]);
  }

  await AsyncStorage.multiSet(entries);
};

/**
 * Load persisted auth data from AsyncStorage.
 * Used on app launch to restore the session.
 *
 * @returns {Promise<object|null>} - { accessToken, user, shopId } or null if not logged in
 */
export const loadPersistedAuth = async () => {
  const keys = ["accessToken", "user", "shopId"];
  const results = await AsyncStorage.multiGet(keys);

  const data = {};
  results.forEach(([key, value]) => {
    data[key] = value;
  });

  if (!data.accessToken) {
    return null;
  }

  return {
    accessToken: data.accessToken,
    user: data.user ? JSON.parse(data.user) : null,
    shopId: data.shopId || null,
  };
};

/**
 * Get current user profile from the API.
 *
 * @returns {Promise<object>} - { success, data: { user, shop } }
 */
export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

/**
 * Clear all auth data and log out.
 */
export const logout = async () => {
  await AsyncStorage.multiRemove([
    "accessToken",
    "refreshToken",
    "user",
    "shopId",
  ]);
};

/**
 * Request registration email verification OTP.
 * @param {string} name
 * @param {string} phone
 * @param {string} email
 * @param {string} password
 */
export const register = async (name, phone, email, password) => {
  const response = await api.post("/auth/register", { name, phone, email, password });
  return response.data;
};

/**
 * Verify registration email OTP.
 * @param {string} email
 * @param {string} otp
 */
export const verifyRegister = async (email, otp) => {
  const response = await api.post("/auth/register/verify", { email, otp });
  return response.data;
};

/**
 * Log in with email/phone and password.
 * @param {string} identifier - Email or Phone number
 * @param {string} password
 */
export const login = async (identifier, password) => {
  const response = await api.post("/auth/login", { identifier, password });
  return response.data;
};

/**
 * Verify a staff invite code.
 * @param {string} inviteCode
 * @returns {Promise<object>}
 */
export const verifyStaffInvite = async (inviteCode) => {
  const response = await api.post("/auth/staff/verify-invite", { inviteCode });
  return response.data;
};

/**
 * Activate a staff account with a password.
 * @param {string} inviteCode
 * @param {string} password
 * @returns {Promise<object>}
 */
export const activateStaffAccount = async (inviteCode, password) => {
  const response = await api.post("/auth/staff/activate", { inviteCode, password });
  return response.data;
};


// src/services/api.js
// Axios instance with interceptors for auth headers and error handling.
// All service files import this instead of raw axios.

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../constants/config";

const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ──────────────────────────────────
// Attaches the access token and shop_id to every outgoing request.

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const shopId = await AsyncStorage.getItem("shopId");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (shopId) {
        config.headers["x-shop-id"] = shopId;
      }
    } catch (error) {
      // Silently fail — the request will proceed without auth headers
      console.warn("Failed to read auth tokens:", error.message);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────
// Extracts a clean error message from API responses.

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried, clear tokens (session expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear stored credentials — the auth store listener will
      // redirect to login screen
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "shopId", "user"]);
    }

    // Build a user-friendly error message
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);

export default api;

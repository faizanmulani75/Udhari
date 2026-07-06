// src/services/api.js
// Adds offline caching and queueing interceptors to apiClient.
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import { getCache, setCache } from "../utils/cacheService";
import { queueOfflineAction } from "../utils/syncManager";

// ── Response Interceptor ─────────────────────────────────
// Extracts a clean error message from API responses and handles offline capabilities.

apiClient.interceptors.response.use(
  (response) => {
    // Cache successful GET requests
    if (response.config.method?.toLowerCase() === 'get') {
      const urlKey = response.config.url + (response.config.params ? JSON.stringify(response.config.params) : '');
      setCache(urlKey, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors (Offline)
    if (!error.response && originalRequest) {
      const method = originalRequest.method?.toLowerCase();
      
      if (method === 'get') {
        const urlKey = originalRequest.url + (originalRequest.params ? JSON.stringify(originalRequest.params) : '');
        const cachedData = await getCache(urlKey);
        if (cachedData) {
          return Promise.resolve({ data: cachedData, status: 200, fromCache: true });
        }
      } else if (['post', 'put', 'patch', 'delete'].includes(method)) {
        // Never queue auth or AI requests — they are time-sensitive or require real-time server processing
        const AUTH_SKIP_PATTERNS = ['/auth/', '/forgot-password', '/send-otp', '/verify-otp', '/login', '/ai/'];
        const isAuthRequest = AUTH_SKIP_PATTERNS.some(p => (originalRequest.url || '').includes(p));
        if (isAuthRequest) {
          // Let the error propagate normally so the UI can show a proper "no internet" message
          const message = error.message || "No internet connection. Please try again.";
          error.message = message;
          return Promise.reject(error);
        }

        const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        let responseData = { success: true, message: "Action queued for sync.", data: {} };
        if (originalRequest.url === "/customers" && method === "post") {
          let parsedBody = originalRequest.data;
          if (typeof parsedBody === "string") {
            try { parsedBody = JSON.parse(parsedBody); } catch (e) {}
          }
          responseData.data = {
            id: tempId,
            name: parsedBody?.name || "Offline Customer",
            phone: parsedBody?.phone || "",
            balance: 0
          };
        }

        await queueOfflineAction({
          tempId,
          method: originalRequest.method,
          url: originalRequest.url,
          data: originalRequest.data
        });
        
        return Promise.resolve({ 
          data: responseData,
          status: 200,
          queued: true 
        });
      }
    }

    // If 401 and we haven't already retried, clear tokens (session expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "shopId", "user"]);
    }

    // Build a user-friendly error message
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    error.message = message;
    return Promise.reject(error);
  }
);

export default apiClient;

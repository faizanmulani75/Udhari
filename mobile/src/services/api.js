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
        await queueOfflineAction({
          method: originalRequest.method,
          url: originalRequest.url,
          data: originalRequest.data
        });
        
        return Promise.resolve({ 
          data: { success: true, message: "Action queued for sync.", data: {} },
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

// src/services/apiClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../constants/config";

const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ──────────────────────────────────
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const shopId = await AsyncStorage.getItem("shopId");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      if (shopId) config.headers["x-shop-id"] = shopId;
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

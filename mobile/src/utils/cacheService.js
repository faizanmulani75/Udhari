// src/utils/cacheService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_PREFIX = "@api_cache_";

/**
 * Cache API response data against a specific URL/endpoint key
 * @param {string} url - API Endpoint URL
 * @param {object} data - Data to cache
 */
export const setCache = async (url, data) => {
  try {
    const key = `${CACHE_PREFIX}${url}`;
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to cache API response:", error);
  }
};

/**
 * Retrieve cached API response data for a given URL/endpoint key
 * @param {string} url - API Endpoint URL
 * @returns {object|null} - Cached data or null
 */
export const getCache = async (url) => {
  try {
    const key = `${CACHE_PREFIX}${url}`;
    const cached = await AsyncStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.warn("Failed to retrieve cached API response:", error);
    return null;
  }
};

/**
 * Clear all API cached data
 */
export const clearCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch (error) {
    console.warn("Failed to clear API cache:", error);
  }
};

// src/services/shopService.js
// Shop-related API calls — register shop (onboarding), fetch details, update details, deactivate.

import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Register a new shop and complete onboarding.
 *
 * @param {object} shopData - { shopName, shopPhone, ownerName, email?, address?, city?, state?, pincode?, currency? }
 * @returns {Promise<object>} - { success, data: { accessToken, user, shop } }
 */
export const createShop = async (shopData) => {
  const response = await api.post("/shops", shopData);
  return response.data;
};

/**
 * Get current shop keeper's shop details.
 *
 * @returns {Promise<object>} - { success, data: shop }
 */
export const getShop = async () => {
  const response = await api.get("/shops/me");
  return response.data;
};

/**
 * Update shop details.
 *
 * @param {object} updateData - Fields to update
 * @returns {Promise<object>} - { success, data: shop }
 */
export const updateShop = async (updateData) => {
  const response = await api.put("/shops/me", updateData);
  return response.data;
};

/**
 * Deactivate / Soft delete shop.
 *
 * @returns {Promise<object>} - { success, message }
 */
export const deleteShop = async () => {
  const response = await api.delete("/shops/me");
  return response.data;
};

/**
 * Update the persisted shopId in AsyncStorage.
 *
 * @param {string} shopId
 */
export const persistShopId = async (shopId) => {
  await AsyncStorage.setItem("shopId", shopId);
};

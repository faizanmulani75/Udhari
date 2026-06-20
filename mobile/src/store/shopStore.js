// src/store/shopStore.js
// Zustand store for shop-level state.
// Manages: shop profile, onboarding, updating shop details.

import { create } from "zustand";
import * as shopService from "../services/shopService";
import * as authService from "../services/authService";
import useAuthStore from "./authStore";

const useShopStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────

  shop: null,
  isLoading: false,
  error: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Complete onboarding: create a shop and link the owner.
   * Updates authStore with the new JWT session.
   *
   * @param {object} shopData - Onboarding form details
   * @returns {Promise<boolean>} Success status
   */
  createShop: async (shopData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await shopService.createShop(shopData);
      const { accessToken, user, shop } = response.data;

      // 1. Persist the complete updated credentials to AsyncStorage
      await authService.persistAuth({ accessToken, user, shop });

      // 2. Dynamically update authStore state so navigator transitions to home
      useAuthStore.setState({
        accessToken,
        user,
        shopId: shop.id,
        isAuthenticated: true,
      });

      // 3. Update shopStore state
      set({
        shop,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to create shop. Please try again.",
      });
      return false;
    }
  },

  /**
   * Fetch current shopkeeper's shop details from backend.
   */
  fetchShop: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await shopService.getShop();
      set({
        shop: response.data,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to fetch shop details.",
      });
      return false;
    }
  },

  /**
   * Update shop details.
   */
  updateShop: async (updateData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await shopService.updateShop(updateData);
      set({
        shop: response.data,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to update shop details.",
      });
      return false;
    }
  },

  /**
   * Clear error state.
   */
  clearError: () => set({ error: null }),
}));

export default useShopStore;

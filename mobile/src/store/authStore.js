// src/store/authStore.js
// Zustand store for authentication state.
// Manages: login flow, session persistence, logout.

import { create } from "zustand";
import * as authService from "../services/authService";

const useAuthStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────

  user: null,
  shopId: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,        // true once we've checked AsyncStorage on startup
  error: null,

  // OTP flow state
  otpSent: false,
  otpPhone: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Hydrate the store from AsyncStorage on app launch.
   * If a valid session exists, restores it. Otherwise, stays logged out.
   */
  hydrate: async () => {
    try {
      const persisted = await authService.loadPersistedAuth();

      if (persisted && persisted.accessToken) {
        set({
          accessToken: persisted.accessToken,
          user: persisted.user,
          shopId: persisted.shopId,
          isAuthenticated: true,
          isHydrated: true,
        });
      } else {
        set({ isHydrated: true });
      }
    } catch (error) {
      console.warn("Auth hydration failed:", error.message);
      set({ isHydrated: true });
    }
  },

  /**
   * Step 1: Send OTP to the given phone number.
   */
  sendOtp: async (phone) => {
    set({ isLoading: true, error: null });

    try {
      await authService.sendOtp(phone);

      set({
        otpSent: true,
        otpPhone: phone,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to send OTP",
      });
      return false;
    }
  },

  /**
   * Step 2: Verify OTP and establish the session.
   */
  verifyOtp: async (otp) => {
    const { otpPhone } = get();

    if (!otpPhone) {
      set({ error: "Phone number not set. Please go back and try again." });
      return false;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await authService.verifyOtp(otpPhone, otp);
      const { accessToken, refreshToken, user, shop } = response.data;

      // Persist to AsyncStorage
      await authService.persistAuth({ accessToken, refreshToken, user, shop });

      set({
        accessToken,
        user,
        shopId: shop?.id || null,
        isAuthenticated: true,
        isLoading: false,
        otpSent: false,
        otpPhone: null,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Invalid OTP. Please try again.",
      });
      return false;
    }
  },

  /**
   * Log out: clear state and AsyncStorage.
   */
  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn("Logout cleanup failed:", error.message);
    }

    set({
      user: null,
      shopId: null,
      accessToken: null,
      isAuthenticated: false,
      otpSent: false,
      otpPhone: null,
      error: null,
    });
  },

  /**
   * Reset the OTP flow (go back to phone input).
   */
  resetOtpFlow: () => {
    set({
      otpSent: false,
      otpPhone: null,
      error: null,
    });
  },

  /**
   * Clear any displayed error.
   */
  clearError: () => set({ error: null }),
}));

export default useAuthStore;

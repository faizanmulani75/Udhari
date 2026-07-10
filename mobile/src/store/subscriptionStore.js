// src/store/subscriptionStore.js
// Zustand store for subscription plan state.
// Manages plan, limits, and PRO feature gating.

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSubscription } from "../services/subscriptionService";

const VOICE_USAGE_KEY = "voice_usage_";
const VOICE_DAILY_FREE_LIMIT = 15;

const useSubscriptionStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────

  plan: "FREE",          // "FREE" | "PRO"
  maxCustomers: 10,
  maxUsers: 1,
  expiresAt: null,
  isLoaded: false,       // true once fetched from server

  // ── Getters ─────────────────────────────────────────────

  /**
   * Returns true if the current shop is on PRO plan.
   */
  isPro: () => get().plan === "PRO",

  /**
   * Returns true if the given feature is accessible.
   * Features: "ai_parsing", "pdf_export", "analytics",
   *           "global_transactions", "audit_log", "customer_portal",
   *           "payment_claims", "staff_accounts"
   */
  canUse: (feature) => {
    const proFeatures = [
      "ai_parsing",
      "pdf_export",
      "analytics",
      "global_transactions",
      "audit_log",
      "customer_portal",
      "payment_claims",
      "staff_accounts",
    ];
    if (!proFeatures.includes(feature)) return true; // free features
    return get().plan === "PRO";
  },

  // ── Voice Entry Limit (15/day for FREE) ─────────────────

  /**
   * Returns today's voice usage count for this shop.
   */
  getVoiceUsedToday: async (shopId) => {
    const today = new Date().toISOString().split("T")[0];
    const key = `${VOICE_USAGE_KEY}${shopId}_${today}`;
    const val = await AsyncStorage.getItem(key);
    return parseInt(val || "0", 10);
  },

  /**
   * Returns true if voice entry can be used (PRO or under limit).
   */
  canUseVoice: async (shopId) => {
    if (get().plan === "PRO") return true;
    const used = await get().getVoiceUsedToday(shopId);
    return used < VOICE_DAILY_FREE_LIMIT;
  },

  /**
   * Returns remaining voice uses for today (PRO → Infinity).
   */
  getVoiceRemaining: async (shopId) => {
    if (get().plan === "PRO") return Infinity;
    const used = await get().getVoiceUsedToday(shopId);
    return Math.max(0, VOICE_DAILY_FREE_LIMIT - used);
  },

  /**
   * Increment voice usage count for today.
   */
  incrementVoiceUsage: async (shopId) => {
    const today = new Date().toISOString().split("T")[0];
    const key = `${VOICE_USAGE_KEY}${shopId}_${today}`;
    const val = await AsyncStorage.getItem(key);
    const current = parseInt(val || "0", 10);
    await AsyncStorage.setItem(key, String(current + 1));
  },

  // ── Actions ─────────────────────────────────────────────

  /**
   * Fetch current subscription from the server and cache it.
   */
  fetchSubscription: async () => {
    try {
      const res = await getSubscription();
      if (res && res.success && res.data) {
        const { plan, maxCustomers, maxUsers, expiresAt } = res.data;
        set({
          plan: plan || "FREE",
          maxCustomers: maxCustomers || 10,
          maxUsers: maxUsers || 1,
          expiresAt: expiresAt || null,
          isLoaded: true,
        });
      } else {
        set({ plan: "FREE", maxCustomers: 10, maxUsers: 1, isLoaded: true });
      }
    } catch (err) {
      console.warn("[SubscriptionStore] Failed to fetch subscription:", err);
      set({ plan: "FREE", maxCustomers: 10, maxUsers: 1, isLoaded: true });
    }
  },

  /**
   * Manually set plan after a successful upgrade payment.
   */
  setPlan: (plan, extras = {}) => {
    set({
      plan,
      maxCustomers: plan === "PRO" ? 99999 : 10,
      maxUsers: plan === "PRO" ? 5 : 1,
      ...extras,
    });
  },
}));

export default useSubscriptionStore;
export { VOICE_DAILY_FREE_LIMIT };

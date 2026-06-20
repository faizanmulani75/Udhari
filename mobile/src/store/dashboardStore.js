// src/store/dashboardStore.js
// Zustand store for shop dashboard reports and consolidated statistics.

import { create } from "zustand";
import * as dashboardService from "../services/dashboardService";

const useDashboardStore = create((set) => ({
  // ── State ──────────────────────────────────────────────

  summary: null,
  topDebtors: [],
  recentActivity: [],
  isLoading: false,
  error: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Fetch consolidated dashboard metrics.
   */
  fetchDashboard: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await dashboardService.getDashboardData();
      const { summary, topDebtors, recentActivity } = response.data;

      set({
        summary,
        topDebtors,
        recentActivity,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load dashboard statistics",
      });
      return false;
    }
  },

  /**
   * Clear dashboard state.
   */
  clearDashboard: () =>
    set({
      summary: null,
      topDebtors: [],
      recentActivity: [],
      error: null,
    }),
}));

export default useDashboardStore;

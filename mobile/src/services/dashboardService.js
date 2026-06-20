// src/services/dashboardService.js
// Dashboard reporting API requests.

import api from "./api";

/**
 * Fetch consolidated dashboard details (summary, top debtors, recent activities).
 *
 * @returns {Promise<object>} - { success, data: { summary, topDebtors, recentActivity } }
 */
export const getDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

/**
 * Fetch analytics trends and credit given vs payments received sums.
 * @param {number} days - Time window in days (7 or 30)
 * @returns {Promise<object>}
 */
export const getAnalyticsData = async (days = 7) => {
  const response = await api.get("/dashboard/analytics", { params: { days } });
  return response.data;
};

// src/services/subscriptionService.js
// API client for SaaS subscription plans.

import api from "./api";

/**
 * Fetch the active subscription details.
 * @returns {Promise<object>}
 */
export const getSubscription = async () => {
  const response = await api.get("/subscription");
  return response.data;
};

/**
 * Upgrade the shop subscription plan.
 * @param {string} plan - 'FREE', 'BASIC', or 'PRO'
 * @returns {Promise<object>}
 */
export const upgradeSubscription = async (plan) => {
  const response = await api.post("/subscription/upgrade", { plan });
  return response.data;
};

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

/**
 * Create a payment order via Razorpay on the backend.
 * @param {string} plan - 'BASIC' or 'PRO'
 * @returns {Promise<object>}
 */
export const createSubscriptionOrder = async (plan) => {
  const response = await api.post("/subscription/create-order", { plan });
  return response.data;
};

/**
 * Verify Razorpay payment signature on the backend.
 * @param {object} paymentData - { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan }
 * @returns {Promise<object>}
 */
export const verifySubscriptionPayment = async (paymentData) => {
  const response = await api.post("/subscription/verify-payment", paymentData);
  return response.data;
};


// src/services/reminderService.js
// API calls for payment reminder logs and bulk triggering.

import api from "./api";

/**
 * Trigger bulk SMS payment reminders to all debtors.
 * @returns {Promise<object>} - { success, message, data: { totalSent, results } }
 */
export const sendBulkReminders = async () => {
  const response = await api.post("/reminders/bulk-send");
  return response.data;
};

/**
 * Send a single payment reminder to a specific customer.
 * @param {string} customerId
 * @returns {Promise<object>} - { success, data: { reminder, customer } }
 */
export const sendSingleReminder = async (customerId) => {
  const response = await api.post(`/reminders/send/${customerId}`);
  return response.data;
};

/**
 * Get paginated reminder history.
 * @param {object} params - { page, limit, customerId, status }
 * @returns {Promise<object>} - { success, data: reminders, meta }
 */
export const getReminderHistory = async (params = {}) => {
  const response = await api.get("/reminders/history", { params });
  return response.data;
};

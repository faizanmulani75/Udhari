// src/services/transactionService.js
// Ledger and transaction API requests.

import api from "./api";

/**
 * Add a credit transaction (give goods on credit).
 *
 * @param {string} customerId
 * @param {object} data - { amount, description?, referenceNumber? }
 * @returns {Promise<object>} - { success, data: { transaction, previousBalance, newBalance } }
 */
export const addCredit = async (customerId, data) => {
  const response = await api.post(`/customers/${customerId}/transactions/credit`, data);
  return response.data;
};

/**
 * Record a payment received from customer.
 *
 * @param {string} customerId
 * @param {object} data - { amount, paymentMethod, description?, referenceNumber? }
 * @returns {Promise<object>} - { success, data: { transaction, previousBalance, newBalance } }
 */
export const addPayment = async (customerId, data) => {
  const response = await api.post(`/customers/${customerId}/transactions/payment`, data);
  return response.data;
};

/**
 * Add a debit adjustment (returns/discounts).
 *
 * @param {string} customerId
 * @param {object} data - { amount, description?, referenceNumber? }
 * @returns {Promise<object>} - { success, data: { transaction, previousBalance, newBalance } }
 */
export const addDebit = async (customerId, data) => {
  const response = await api.post(`/customers/${customerId}/transactions/debit`, data);
  return response.data;
};

/**
 * Get customer financial summary.
 *
 * @param {string} customerId
 * @returns {Promise<object>} - { success, data: { customer, summary } }
 */
export const getCustomerSummary = async (customerId) => {
  const response = await api.get(`/customers/${customerId}/summary`);
  return response.data;
};

/**
 * Get transaction list for a single customer.
 *
 * @param {string} customerId
 * @param {object} params - { page?, limit?, type?, startDate?, endDate?, sortOrder? }
 * @returns {Promise<object>} - { success, data: { customer, transactions, meta } }
 */
export const getCustomerTransactions = async (customerId, params = {}) => {
  const response = await api.get(`/customers/${customerId}/transactions`, { params });
  return response.data;
};

/**
 * Get all transactions across the shop.
 *
 * @param {object} params - { page?, limit?, type?, startDate?, endDate?, search? }
 * @returns {Promise<object>} - { success, data: { transactions, meta } }
 */
export const getShopTransactions = async (params = {}) => {
  const response = await api.get("/transactions", { params });
  return response.data;
};

/**
 * Fetch details of a single transaction.
 *
 * @param {string} id - Transaction UUID
 * @returns {Promise<object>} - { success, data: transaction }
 */
export const getTransactionById = async (id) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};

/**
 * Reverse/delete a transaction.
 *
 * @param {string} id - Transaction UUID
 * @returns {Promise<object>} - { success, data: { deletedTransaction, previousBalance, newBalance } }
 */
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

/**
 * Parse natural text into amount and description fields using AI.
 *
 * @param {string} text
 * @returns {Promise<object>} - { success, source, data: { amount, description } }
 */
export const parseTransactionWithAI = async (text) => {
  const response = await api.post("/ai/parse-transaction", { text });
  return response.data;
};

/**
 * Submit voice entry transcription to parse and record a transaction.
 *
 * @param {string} text
 * @returns {Promise<object>} - { success, action, data }
 */
export const voiceEntry = async (text) => {
  const response = await api.post("/ai/voice-entry", { text });
  return response.data;
};

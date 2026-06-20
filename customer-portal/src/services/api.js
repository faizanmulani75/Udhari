// src/services/api.js
// Axios client configuration for the customer portal.
// Points to the public backend API.

import axios from "axios";

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  "http://localhost:5050/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch customer statement details by public qrToken.
 * 
 * @param {string} token
 * @returns {Promise<object>} - Customer & Shop details
 */
export const getPortalData = async (token) => {
  const response = await api.get(`/portal/${token}`);
  return response.data;
};

/**
 * Fetch paginated transaction ledger list by public qrToken.
 * 
 * @param {string} token
 * @param {object} params - { page, limit }
 * @returns {Promise<object>} - Transactions list and pagination meta
 */
export const getPortalTransactions = async (token, params = {}) => {
  const response = await api.get(`/portal/${token}/transactions`, { params });
  return response.data;
};

/**
 * File a dispute for a transaction.
 * 
 * @param {string} token 
 * @param {string} transactionId 
 * @param {string} content 
 * @returns {Promise<object>}
 */
export const createPortalDispute = async (token, transactionId, content) => {
  const response = await api.post(`/portal/${token}/transactions/${transactionId}/disputes`, { content });
  return response.data;
};

export default api;

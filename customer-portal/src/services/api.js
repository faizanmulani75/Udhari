// src/services/api.js
// Axios client configuration for the customer portal.
// Points to the public backend API.

import axios from "axios";

let API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  "https://udhari-ajw3.onrender.com/api/v1";

if (typeof window !== "undefined") {
  const hostname = window.location.hostname;
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && API_BASE_URL.includes("localhost")) {
    API_BASE_URL = API_BASE_URL.replace("localhost", hostname);
  }
}

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

export const submitPaymentClaim = async (token, amount, txnRef) => {
  const response = await api.post(`/portal/${token}/pay/claim`, { amount, txnRef });
  return response.data;
};

export const getCustomerClaims = async (token) => {
  const response = await api.get(`/portal/${token}/pay/claims`);
  return response.data;
};

export default api;

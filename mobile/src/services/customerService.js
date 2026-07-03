// src/services/customerService.js
// Customer-related API calls — list, fetch details, create, update, delete, credit check.

import api from "./apiClient";

/**
 * Get paginated, searchable customer list.
 *
 * @param {object} params - { page?, limit?, search?, isActive? }
 * @returns {Promise<object>} - { success, data: customers, meta }
 */
export const getCustomers = async (params = {}) => {
  const response = await api.get("/customers", { params });
  return response.data;
};

/**
 * Get details for a single customer.
 *
 * @param {string} id - Customer UUID
 * @returns {Promise<object>} - { success, data: customer }
 */
export const getCustomerById = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

/**
 * Create a new customer.
 *
 * @param {object} data - { name, phone, email?, address?, notes?, creditLimit? }
 * @returns {Promise<object>} - { success, data: customer }
 */
export const createCustomer = async (data) => {
  const response = await api.post("/customers", data);
  return response.data;
};

/**
 * Update a customer's information.
 *
 * @param {string} id - Customer UUID
 * @param {object} data - Fields to update
 * @returns {Promise<object>} - { success, data: customer }
 */
export const updateCustomer = async (id, data) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

/**
 * Soft delete a customer.
 *
 * @param {string} id - Customer UUID
 * @returns {Promise<object>} - { success, message }
 */
export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};

/**
 * Check if adding credit will exceed the customer's limit.
 *
 * @param {string} id - Customer UUID
 * @param {number} amount - Requested credit amount
 * @returns {Promise<object>} - { success, data: { allowed, currentBalance, limit, requested, newBalance, remaining } }
 */
export const checkCreditLimit = async (id, amount) => {
  const response = await api.get(`/customers/${id}/credit-check`, {
    params: { amount },
  });
  return response.data;
};

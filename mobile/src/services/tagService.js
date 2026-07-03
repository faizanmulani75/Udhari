// src/services/tagService.js
// API calls for tag management (CRUD + Customer assignment).

import api from "./apiClient";

/**
 * Get all tags for the shop.
 * @returns {Promise<object>} - { success, data: tags }
 */
export const getTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

/**
 * Create a new tag.
 * @param {object} data - { name, color }
 * @returns {Promise<object>} - { success, data: tag }
 */
export const createTag = async (data) => {
  const response = await api.post("/tags", data);
  return response.data;
};

/**
 * Update an existing tag.
 * @param {string} id
 * @param {object} data - { name, color }
 * @returns {Promise<object>} - { success, data: tag }
 */
export const updateTag = async (id, data) => {
  const response = await api.put(`/tags/${id}`, data);
  return response.data;
};

/**
 * Delete a tag.
 * @param {string} id
 * @returns {Promise<object>} - { success, message }
 */
export const deleteTag = async (id) => {
  const response = await api.delete(`/tags/${id}`);
  return response.data;
};

/**
 * Assign tags to a customer.
 * @param {string} customerId
 * @param {Array<string>} tagIds
 * @returns {Promise<object>} - { success, data: customerTags }
 */
export const assignTagsToCustomer = async (customerId, tagIds) => {
  const response = await api.post("/tags/assign", { customerId, tagIds });
  return response.data;
};

/**
 * Get tags assigned to a customer.
 * @param {string} customerId
 * @returns {Promise<object>} - { success, data: tags }
 */
export const getCustomerTags = async (customerId) => {
  const response = await api.get(`/tags/customer/${customerId}`);
  return response.data;
};

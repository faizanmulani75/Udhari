// src/services/staffService.js
// API client for staff accounts management.

import api from "./api";

/**
 * Fetch list of all active staff users.
 * @returns {Promise<object>}
 */
export const getStaff = async () => {
  const response = await api.get("/staff");
  return response.data;
};

/**
 * Invite/create a new staff user.
 * @param {object} staffData - { name, phone, role }
 * @returns {Promise<object>}
 */
export const inviteStaff = async (staffData) => {
  const response = await api.post("/staff", staffData);
  return response.data;
};

/**
 * Delete/deactivate a staff user by ID.
 * @param {string} staffId
 * @returns {Promise<object>}
 */
export const deleteStaff = async (staffId) => {
  const response = await api.delete(`/staff/${staffId}`);
  return response.data;
};

/**
 * Update a staff user (e.g. role restriction).
 * @param {string} staffId
 * @param {object} updateData - { role }
 * @returns {Promise<object>}
 */
export const updateStaff = async (staffId, updateData) => {
  const response = await api.put(`/staff/${staffId}`, updateData);
  return response.data;
};

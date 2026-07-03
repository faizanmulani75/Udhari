// src/services/noteService.js
// API calls for transaction notes and dispute discussion threads.

import api from "./apiClient";

/**
 * Get all notes/comments for a transaction.
 * @param {string} transactionId
 * @returns {Promise<object>} - { success, data: notes }
 */
export const getTransactionNotes = async (transactionId) => {
  const response = await api.get(`/notes/transaction/${transactionId}`);
  return response.data;
};

/**
 * Add a new note to a transaction.
 * @param {string} transactionId
 * @param {object} data - { content, isDispute }
 * @returns {Promise<object>} - { success, data: note }
 */
export const addTransactionNote = async (transactionId, data) => {
  const response = await api.post(`/notes/transaction/${transactionId}`, data);
  return response.data;
};

/**
 * Delete a note.
 * @param {string} noteId
 * @returns {Promise<object>} - { success, message }
 */
export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};

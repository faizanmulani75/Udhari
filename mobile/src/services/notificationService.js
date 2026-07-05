// src/services/notificationService.js
// API service for the in-app notification system.

import api from "./api";

/**
 * Fetch paginated notifications for the current user.
 * @param {object} params - { page, limit }
 */
export const fetchNotifications = async (params = {}) => {
  const response = await api.get("/notifications", { params });
  return response.data;
};

/**
 * Get count of unread notifications.
 */
export const fetchUnreadCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data;
};

/**
 * Mark a single notification as read.
 * @param {string} id - Notification UUID
 */
export const markNotificationRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

/**
 * Mark all notifications as read.
 */
export const markAllNotificationsRead = async () => {
  const response = await api.put("/notifications/read-all");
  return response.data;
};

/**
 * Delete a single notification.
 * @param {string} id - Notification UUID
 */
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

/**
 * Clear all read notifications.
 */
export const clearReadNotifications = async () => {
  const response = await api.delete("/notifications");
  return response.data;
};

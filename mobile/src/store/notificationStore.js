// src/store/notificationStore.js
// Zustand store for in-app notifications.

import { create } from "zustand";
import * as notificationService from "../services/notificationService";

const useNotificationStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  isRefreshing: false,
  page: 1,
  totalPages: 1,
  error: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Fetch paginated notifications (replaces list on page 1, appends on page > 1).
   */
  fetchNotifications: async (page = 1) => {
    const { isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const res = await notificationService.fetchNotifications({ page, limit: 20 });
      const newNotifications = res.data || [];
      set((state) => ({
        notifications: page === 1 ? newNotifications : [...state.notifications, ...newNotifications],
        page,
        totalPages: res.meta?.totalPages || 1,
        isLoading: false,
      }));
    } catch (err) {
      set({ isLoading: false, error: err.message || "Failed to load notifications" });
    }
  },

  /**
   * Refresh notifications from page 1.
   */
  refreshNotifications: async () => {
    set({ isRefreshing: true });
    try {
      const res = await notificationService.fetchNotifications({ page: 1, limit: 20 });
      set({
        notifications: res.data || [],
        page: 1,
        totalPages: res.meta?.totalPages || 1,
        isRefreshing: false,
      });
    } catch (err) {
      set({ isRefreshing: false });
    }
  },

  /**
   * Load the unread notification count (for the bell badge).
   */
  fetchUnreadCount: async () => {
    try {
      const res = await notificationService.fetchUnreadCount();
      set({ unreadCount: res.data?.count || 0 });
    } catch (_) {
      // Fail silently — badge count is non-critical
    }
  },

  /**
   * Mark a single notification as read.
   */
  markAsRead: async (id) => {
    try {
      await notificationService.markNotificationRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (_) {}
  },

  /**
   * Mark all notifications as read.
   */
  markAllAsRead: async () => {
    try {
      await notificationService.markAllNotificationsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch (_) {}
  },

  /**
   * Delete a single notification from the list.
   */
  deleteNotification: async (id) => {
    const notification = get().notifications.find((n) => n.id === id);
    try {
      await notificationService.deleteNotification(id);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.isRead
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      }));
    } catch (_) {}
  },

  /**
   * Clear all read notifications.
   */
  clearReadNotifications: async () => {
    try {
      await notificationService.clearReadNotifications();
      set((state) => ({
        notifications: state.notifications.filter((n) => !n.isRead),
      }));
    } catch (_) {}
  },
}));

export default useNotificationStore;

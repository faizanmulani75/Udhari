// src/routes/notificationRoutes.js
// Routes for in-app notification management.

const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllRead,
} = require("../controllers/notificationController");

// GET   /api/v1/notifications              — Get paginated notifications
router.get("/", getNotifications);

// GET   /api/v1/notifications/unread-count — Get count of unread notifications
router.get("/unread-count", getUnreadCount);

// PUT   /api/v1/notifications/read-all     — Mark all as read
router.put("/read-all", markAllAsRead);

// DELETE /api/v1/notifications             — Clear all read notifications
router.delete("/", clearAllRead);

// PUT   /api/v1/notifications/:id/read     — Mark a single notification as read
router.put("/:id/read", markAsRead);

// DELETE /api/v1/notifications/:id         — Delete a single notification
router.delete("/:id", deleteNotification);

module.exports = router;

// src/controllers/notificationController.js
// HTTP controller for in-app notifications.

const prisma = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/notifications
 * Fetch paginated notifications for the authenticated user.
 */
const getNotifications = catchAsync(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: {
        shopId: req.shopId,
        userId: req.userId,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: parseInt(limit),
    }),
    prisma.notification.count({
      where: {
        shopId: req.shopId,
        userId: req.userId,
      },
    }),
  ]);

  return ApiResponse.success(
    res,
    "Notifications retrieved",
    notifications,
    {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    }
  );
});

/**
 * GET /api/v1/notifications/unread-count
 * Get the count of unread notifications for the current user.
 */
const getUnreadCount = catchAsync(async (req, res) => {
  const count = await prisma.notification.count({
    where: {
      shopId: req.shopId,
      userId: req.userId,
      isRead: false,
    },
  });

  return ApiResponse.success(res, "Unread count retrieved", { count });
});

/**
 * PUT /api/v1/notifications/:id/read
 * Mark a single notification as read.
 */
const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;

  const notification = await prisma.notification.findFirst({
    where: { id, shopId: req.shopId, userId: req.userId },
  });

  if (!notification) {
    throw ApiError.notFound("Notification not found");
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });

  return ApiResponse.success(res, "Notification marked as read", updated);
});

/**
 * PUT /api/v1/notifications/read-all
 * Mark all notifications for the current user as read.
 */
const markAllAsRead = catchAsync(async (req, res) => {
  await prisma.notification.updateMany({
    where: {
      shopId: req.shopId,
      userId: req.userId,
      isRead: false,
    },
    data: { isRead: true },
  });

  return ApiResponse.success(res, "All notifications marked as read");
});

/**
 * DELETE /api/v1/notifications/:id
 * Delete a single notification.
 */
const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;

  const notification = await prisma.notification.findFirst({
    where: { id, shopId: req.shopId, userId: req.userId },
  });

  if (!notification) {
    throw ApiError.notFound("Notification not found");
  }

  await prisma.notification.delete({ where: { id } });

  return ApiResponse.success(res, "Notification deleted");
});

/**
 * DELETE /api/v1/notifications
 * Clear all read notifications for the current user.
 */
const clearAllRead = catchAsync(async (req, res) => {
  await prisma.notification.deleteMany({
    where: {
      shopId: req.shopId,
      userId: req.userId,
      isRead: true,
    },
  });

  return ApiResponse.success(res, "Read notifications cleared");
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllRead,
};

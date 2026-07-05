// src/services/notificationService.js
// Service to manage in-app notifications for shopkeepers and staff.

const prisma = require("../config/prisma");

/**
 * Helper to dispatch push notifications to Expo gateway
 */
const sendPushNotification = async (pushToken, title, message) => {
  if (!pushToken || !pushToken.startsWith("ExponentPushToken")) {
    return;
  }

  try {
    console.log(`📡 Dispatching Expo push notification to: ${pushToken}`);
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        sound: "default",
        title: title,
        body: message,
      }),
    });

    const result = await response.ok ? await response.json() : await response.text();
    console.log("Expo Push Response:", JSON.stringify(result));
  } catch (error) {
    console.error("Failed to send Expo push notification:", error);
  }
};

/**
 * Creates an in-app notification for a single user.
 *
 * @param {string} shopId - Shop UUID
 * @param {string} userId - Target user UUID (owner or staff member)
 * @param {string} title - Notification title (e.g. "Transaction Created")
 * @param {string} message - Notification details
 * @param {string} type - Category: "TRANSACTION", "DISPUTE", "STAFF", "SYSTEM"
 * @returns {Promise<object>} - The created Notification database object
 */
const createNotification = async (shopId, userId, title, message, type = "SYSTEM") => {
  try {
    // Create the DB notification record
    const dbNotif = await prisma.notification.create({
      data: {
        shopId,
        userId,
        title,
        message,
        type,
      },
    });

    // Check if user has an active push token and trigger native push
    const user = await prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
      select: { pushToken: true },
    });

    if (user && user.pushToken) {
      sendPushNotification(user.pushToken, title, message);
    }

    return dbNotif;
  } catch (error) {
    console.error("Failed to create notification:", error);
    // Fail silently in production so business logic doesn't crash if notifications fail
    return null;
  }
};

/**
 * Creates notifications for all active users inside a shop (owners and staff).
 *
 * @param {string} shopId - Shop UUID
 * @param {string} title - Notification title
 * @param {string} message - Notification details
 * @param {string} type - Category
 * @param {string} [excludeUserId] - Optional user UUID to exclude (e.g. the person performing the action)
 */
const notifyAllShopUsers = async (shopId, title, message, type = "SYSTEM", excludeUserId = null) => {
  try {
    // Fetch all active users in the shop
    const users = await prisma.user.findMany({
      where: {
        shopId,
        isActive: true,
        deletedAt: null,
        ...(excludeUserId && { id: { not: excludeUserId } }),
      },
      select: { id: true },
    });

    const createPromises = users.map((user) =>
      createNotification(shopId, user.id, title, message, type)
    );

    await Promise.all(createPromises);
  } catch (error) {
    console.error("Failed to broadcast notifications to shop:", error);
  }
};

/**
 * Creates a notification specifically for the owner(s) of a shop.
 *
 * @param {string} shopId - Shop UUID
 * @param {string} title - Notification title
 * @param {string} message - Notification details
 * @param {string} type - Category
 */
const notifyOwner = async (shopId, title, message, type = "SYSTEM") => {
  try {
    // Find all users who are owners of this shop
    const owners = await prisma.user.findMany({
      where: {
        shopId,
        role: "owner",
        isActive: true,
        deletedAt: null,
      },
      select: { id: true },
    });

    const createPromises = owners.map((owner) =>
      createNotification(shopId, owner.id, title, message, type)
    );

    await Promise.all(createPromises);
  } catch (error) {
    console.error("Failed to notify shop owner:", error);
  }
};

module.exports = {
  createNotification,
  notifyAllShopUsers,
  notifyOwner,
};

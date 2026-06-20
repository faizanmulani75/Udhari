// src/utils/auditLogger.js
// Utility to log business-level events (transaction adjustments, customer deletions, staff role updates) to the database.

const prisma = require("../config/prisma");

/**
 * Log an action to the AuditLog database table.
 * 
 * @param {string} shopId - Shop ID
 * @param {string} userId - User ID of the operating user
 * @param {string} action - Action identifier (e.g. CREATE_TRANSACTION)
 * @param {string} details - Log message text
 */
const logActivity = async (shopId, userId, action, details) => {
  try {
    if (!shopId || !userId) return;
    
    await prisma.auditLog.create({
      data: {
        shopId,
        userId,
        action,
        details,
      },
    });
    console.log(`📋 [AuditLog] ${action} by User ${userId}: ${details}`);
  } catch (err) {
    console.error("❌ [AuditLog] Failed to create audit log entry:", err);
  }
};

module.exports = {
  logActivity,
};

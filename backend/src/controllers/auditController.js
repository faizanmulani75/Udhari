const prisma = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

/**
 * GET /api/v1/audit-logs
 * Fetch all audit logs for the active shop. Only accessible to owner.
 */
const getAuditLogs = catchAsync(async (req, res) => {
  // Verify user role is owner
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (!user || user.role !== "owner") {
    throw ApiError.forbidden("Access denied: Only owners can view audit logs");
  }

  // Fetch audit logs
  const logs = await prisma.auditLog.findMany({
    where: {
      shopId: req.shopId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch the users to map userId to user.name
  const users = await prisma.user.findMany({
    where: {
      shopId: req.shopId,
    },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  const userMap = users.reduce((acc, u) => {
    acc[u.id] = u;
    return acc;
  }, {});

  const enrichedLogs = logs.map(log => ({
    ...log,
    userName: userMap[log.userId]?.name || "Unknown User",
    userRole: userMap[log.userId]?.role || "unknown",
  }));

  return ApiResponse.success(res, "Audit logs retrieved successfully", enrichedLogs);
});

module.exports = {
  getAuditLogs,
};

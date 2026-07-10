// src/controllers/staffController.js
// HTTP controller for managing staff accounts.

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/prisma");
const crypto = require("crypto");
const { logActivity } = require("../utils/auditLogger");
const { createNotification, notifyOwner } = require("../services/notificationService");

/**
 * Generate mock authId from phone (same helper as authService.js)
 */
const getMockAuthId = (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const padded = cleanPhone.padEnd(12, "0").substring(0, 12);
  return `00000000-0000-4000-8000-${padded}`;
};

/**
 * Generate a secure 8-character invite code formatted as UDH-XXXX-XXXX
 */
const generateInviteCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No O, 0, I, 1 to prevent user error
  let p1 = "";
  let p2 = "";
  for (let i = 0; i < 4; i++) {
    p1 += chars.charAt(Math.floor(Math.random() * chars.length));
    p2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `UDH-${p1}-${p2}`;
};

/**
 * GET /api/v1/staff
 * Get all staff members for the active shop.
 */
const getStaff = catchAsync(async (req, res) => {
  const staff = await prisma.user.findMany({
    where: {
      shopId: req.shopId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return ApiResponse.success(res, "Staff members retrieved successfully", staff);
});

/**
 * POST /api/v1/staff
 * Invite/add a new staff member.
 */
const inviteStaff = catchAsync(async (req, res) => {
  const { name, phone, role = "staff" } = req.body;

  if (!name || !phone) {
    throw ApiError.badRequest("Name and phone are required");
  }

  // Validate phone format (+ followed by digits)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    throw ApiError.badRequest("Invalid phone number format. Must include country code, e.g., +919876543210");
  }

  // Verify active subscription plan limit for users
  const { getActiveSubscription } = require("../services/subscriptionService");
  const subscription = await getActiveSubscription(req.shopId);

  const maxUsers = subscription ? subscription.maxUsers : 1; // Default to 1 (Free)

  const currentCount = await prisma.user.count({
    where: {
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (currentCount >= maxUsers) {
    throw ApiError.forbidden(
      `Staff limit reached (${currentCount}/${maxUsers}) for your plan. Please upgrade your subscription to add more staff accounts.`
    );
  }

  // Check if phone already exists in User table (active or soft-deleted)
  const existingUser = await prisma.user.findFirst({
    where: { phone },
  });

  const inviteCode = generateInviteCode();
  const inviteCodeExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
  let newUser;

  if (existingUser) {
    // If they are active
    if (existingUser.deletedAt === null) {
      if (existingUser.shopId === req.shopId) {
        throw ApiError.conflict("A user with this phone number is already registered under this shop");
      } else {
        throw ApiError.conflict("A user with this phone number is already registered under another shop");
      }
    }

    // If soft-deleted, reactivate them and assign to current shop
    newUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        shopId: req.shopId,
        name: name.trim(),
        role: role.trim(),
        inviteCode,
        inviteCodeExpiresAt,
        inviteCodeUsed: false,
        isActive: true,
        deletedAt: null, // Reactivate!
      },
    });
  } else {
    // Generate temporary authId
    const tempAuthId = getMockAuthId(phone);

    // Check if authId is unique in User table (active or soft-deleted)
    const existingAuth = await prisma.user.findFirst({
      where: { authId: tempAuthId },
    });

    // Create new user
    newUser = await prisma.user.create({
      data: {
        shopId: req.shopId,
        authId: existingAuth ? crypto.randomUUID() : tempAuthId, // fallback to random UUID if phone matches another shop keeper's mock authId
        name: name.trim(),
        phone: phone.trim(),
        role: role.trim(),
        inviteCode,
        inviteCodeExpiresAt,
        inviteCodeUsed: false,
      },
    });
  }

  await logActivity(
    req.shopId,
    req.userId,
    "INVITE_STAFF",
    `Invited staff member ${newUser.name} with phone ${newUser.phone}`
  );

  // Notify the owner about the new staff invite
  notifyOwner(
    req.shopId,
    "👤 Staff Member Invited",
    `${newUser.name} (${newUser.phone}) has been added as ${newUser.role}. Share the invite code: ${inviteCode}`,
    "STAFF"
  ).catch(() => {});

  return ApiResponse.created(res, "Staff member invited successfully", newUser);
});

/**
 * DELETE /api/v1/staff/:id
 * Delete/deactivate a staff member.
 */
const deleteStaff = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Retrieve user to make sure they belong to the shop and are not the owner
  const user = await prisma.user.findFirst({
    where: {
      id,
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw ApiError.notFound("Staff member not found");
  }

  if (user.role === "owner") {
    throw ApiError.badRequest("Cannot remove/deactivate the shop owner");
  }

  // Soft delete
  await prisma.user.update({
    where: { id },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

  await logActivity(
    req.shopId,
    req.userId,
    "REMOVE_STAFF",
    `Removed staff member ${user.name}`
  );

  // Notify the owner about the removal
  notifyOwner(
    req.shopId,
    "🗑️ Staff Member Removed",
    `${user.name} has been removed from your shop.`,
    "STAFF"
  ).catch(() => {});

  return ApiResponse.success(res, "Staff member removed successfully");
});

/**
 * PUT /api/v1/staff/:id
 * Update a staff member's details (e.g. toggle role between 'staff' and 'restricted').
 */
const updateStaff = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  // Retrieve user to make sure they belong to the shop and are not the owner
  const user = await prisma.user.findFirst({
    where: {
      id,
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw ApiError.notFound("Staff member not found");
  }

  if (user.role === "owner") {
    throw ApiError.badRequest("Cannot modify the shop owner's role");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      role: role.trim(),
    },
  });

  await logActivity(
    req.shopId,
    req.userId,
    "UPDATE_STAFF",
    `Updated staff member ${updatedUser.name} role to ${updatedUser.role}`
  );

  return ApiResponse.success(res, "Staff member updated successfully", updatedUser);
});

/**
 * POST /api/v1/staff/:id/regenerate-code
 * Regenerate invite code for a staff member.
 */
const regenerateInviteCode = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Retrieve user to make sure they belong to the shop and are not the owner
  const user = await prisma.user.findFirst({
    where: {
      id,
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (!user) {
    throw ApiError.notFound("Staff member not found");
  }

  if (user.role === "owner") {
    throw ApiError.badRequest("Cannot generate invite code for the shop owner");
  }

  const inviteCode = generateInviteCode();
  const inviteCodeExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      inviteCode,
      inviteCodeExpiresAt,
      inviteCodeUsed: false,
    },
  });

  await logActivity(
    req.shopId,
    req.userId,
    "REGENERATE_STAFF_INVITE",
    `Regenerated invite code for staff member ${updatedUser.name}`
  );

  return ApiResponse.success(res, "Invite code regenerated successfully", updatedUser);
});

module.exports = {
  getStaff,
  inviteStaff,
  deleteStaff,
  updateStaff,
  regenerateInviteCode,
};

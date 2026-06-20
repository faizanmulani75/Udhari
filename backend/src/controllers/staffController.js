// src/controllers/staffController.js
// HTTP controller for managing staff accounts.

const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/prisma");
const crypto = require("crypto");
const { logActivity } = require("../utils/auditLogger");

/**
 * Generate mock authId from phone (same helper as authService.js)
 */
const getMockAuthId = (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const padded = cleanPhone.padEnd(12, "0").substring(0, 12);
  return `00000000-0000-4000-8000-${padded}`;
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
  const subscription = await prisma.subscription.findFirst({
    where: {
      shopId: req.shopId,
      status: "ACTIVE",
      deletedAt: null,
    },
  });

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

  // Check if phone already registered in this shop
  const existingUser = await prisma.user.findFirst({
    where: {
      shopId: req.shopId,
      phone,
      deletedAt: null,
    },
  });

  if (existingUser) {
    throw ApiError.conflict("A user with this phone number is already registered under this shop");
  }

  // Generate temporary authId
  const tempAuthId = getMockAuthId(phone);

  // Check if authId is unique in User table
  const existingAuth = await prisma.user.findFirst({
    where: { authId: tempAuthId, deletedAt: null },
  });

  // Create user
  const newUser = await prisma.user.create({
    data: {
      shopId: req.shopId,
      authId: existingAuth ? crypto.randomUUID() : tempAuthId, // fallback to random UUID if phone matches another shop keeper's mock authId
      name: name.trim(),
      phone: phone.trim(),
      role: role.trim(),
    },
  });

  await logActivity(
    req.shopId,
    req.userId,
    "INVITE_STAFF",
    `Invited staff member ${newUser.name} with phone ${newUser.phone}`
  );

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

module.exports = {
  getStaff,
  inviteStaff,
  deleteStaff,
  updateStaff,
};

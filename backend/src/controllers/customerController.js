// src/controllers/customerController.js
// HTTP layer for the customer module.
// Extracts request data, calls the service, and sends a standardized response.
// shop_id is expected on req.shopId (set by auth/shop middleware).

const customerService = require("../services/customerService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/prisma");
const { logActivity } = require("../utils/auditLogger");

/**
 * POST /api/v1/customers
 * Add a new customer to the shop.
 */
const createCustomer = catchAsync(async (req, res) => {
  const { name, phone, email, address, notes, creditLimit, reminderInterval } = req.body;

  // Enforce subscription plan customer limits
  const subscription = await prisma.subscription.findFirst({
    where: {
      shopId: req.shopId,
      status: "ACTIVE",
      deletedAt: null,
    },
  });

  const maxCustomers = subscription ? subscription.maxCustomers : 10;

  const currentCount = await prisma.customer.count({
    where: {
      shopId: req.shopId,
      deletedAt: null,
    },
  });

  if (currentCount >= maxCustomers) {
    throw ApiError.forbidden(
      `Customer limit reached (${currentCount}/${maxCustomers}) for your plan. Please upgrade your subscription to add more customers.`
    );
  }

  // Basic validation
  if (!name || !phone) {
    throw ApiError.badRequest("Name and phone are required", [
      ...(!name ? [{ field: "name", message: "Name is required" }] : []),
      ...(!phone ? [{ field: "phone", message: "Phone is required" }] : []),
    ]);
  }

  if (phone && !/^\+?[0-9]{7,15}$/.test(phone.replace(/\s/g, ""))) {
    throw ApiError.badRequest("Invalid phone number format", [
      { field: "phone", message: "Phone must be 7-15 digits, optionally prefixed with +" },
    ]);
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw ApiError.badRequest("Invalid email address format", [
      { field: "email", message: "Invalid email format" }
    ]);
  }

  if (creditLimit !== undefined && (isNaN(creditLimit) || creditLimit < 0 || creditLimit > 99999999)) {
    throw ApiError.badRequest("Credit limit must be a positive number up to 9,99,99,999", [
      { field: "creditLimit", message: "Must be >= 0 and <= 99,999,999" },
    ]);
  }

  if (reminderInterval && !["daily", "weekly", "monthly"].includes(reminderInterval.toLowerCase())) {
    throw ApiError.badRequest("Reminder interval must be one of: daily, weekly, monthly", [
      { field: "reminderInterval", message: "Must be daily, weekly, or monthly" }
    ]);
  }

  const customer = await customerService.createCustomer(req.shopId, {
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() || null,
    address: address?.trim() || null,
    notes: notes?.trim() || null,
    creditLimit: creditLimit ? parseFloat(creditLimit) : 0,
    reminderInterval: reminderInterval ? reminderInterval.trim().toLowerCase() : "weekly",
  });

  await logActivity(
    req.shopId,
    req.userId,
    "CREATE_CUSTOMER",
    `Created customer ${customer.name} with phone ${customer.phone}`
  );

  return ApiResponse.created(res, "Customer created successfully", customer);
});

/**
 * GET /api/v1/customers
 * List customers with search, filters, and pagination.
 *
 * Query params: page, limit, search, sortBy, sortOrder, isActive
 */
const getCustomers = catchAsync(async (req, res) => {
  const { customers, meta } = await customerService.getCustomers(req.shopId, req.query);

  return ApiResponse.success(res, "Customers retrieved successfully", customers, meta);
});

/**
 * GET /api/v1/customers/:id
 * Get full details for a single customer.
 */
const getCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const customer = await customerService.getCustomerById(req.shopId, id);

  return ApiResponse.success(res, "Customer details retrieved", customer);
});

/**
 * PUT /api/v1/customers/:id
 * Update customer information.
 */
const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, address, notes, creditLimit, isActive, reminderInterval } = req.body;

  // Validate phone if provided
  if (phone && !/^\+?[0-9]{7,15}$/.test(phone.replace(/\s/g, ""))) {
    throw ApiError.badRequest("Invalid phone number format", [
      { field: "phone", message: "Phone must be 7-15 digits, optionally prefixed with +" },
    ]);
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw ApiError.badRequest("Invalid email address format", [
      { field: "email", message: "Invalid email format" }
    ]);
  }

  if (creditLimit !== undefined && (isNaN(creditLimit) || creditLimit < 0 || creditLimit > 99999999)) {
    throw ApiError.badRequest("Credit limit must be a positive number up to 9,99,99,999", [
      { field: "creditLimit", message: "Must be >= 0 and <= 99,999,999" },
    ]);
  }

  if (reminderInterval && !["daily", "weekly", "monthly"].includes(reminderInterval.toLowerCase())) {
    throw ApiError.badRequest("Reminder interval must be one of: daily, weekly, monthly", [
      { field: "reminderInterval", message: "Must be daily, weekly, or monthly" }
    ]);
  }

  const updateData = {};
  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone.trim();
  if (email !== undefined) updateData.email = email?.trim() || null;
  if (address !== undefined) updateData.address = address?.trim() || null;
  if (notes !== undefined) updateData.notes = notes?.trim() || null;
  if (creditLimit !== undefined) updateData.creditLimit = parseFloat(creditLimit);
  if (isActive !== undefined) updateData.isActive = Boolean(isActive);
  if (reminderInterval !== undefined) updateData.reminderInterval = reminderInterval.trim().toLowerCase();

  // Ensure at least one field is being updated
  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest("No fields to update");
  }

  const customer = await customerService.updateCustomer(req.shopId, id, updateData);

  await logActivity(
    req.shopId,
    req.userId,
    "UPDATE_CUSTOMER",
    `Updated customer ${customer.name} details`
  );

  return ApiResponse.success(res, "Customer updated successfully", customer);
});

/**
 * DELETE /api/v1/customers/:id
 * Soft-delete a customer.
 */
const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const customer = await prisma.customer.findFirst({
    where: { id, shopId: req.shopId }
  });
  const customerName = customer ? customer.name : "Unknown Customer";

  await customerService.deleteCustomer(req.shopId, id);

  await logActivity(
    req.shopId,
    req.userId,
    "DELETE_CUSTOMER",
    `Deleted customer ${customerName}`
  );

  return ApiResponse.success(res, "Customer deleted successfully");
});

/**
 * GET /api/v1/customers/:id/credit-check?amount=500
 * Check if a credit amount is within the customer's limit.
 */
const checkCreditLimit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.query;

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    throw ApiError.badRequest("A positive amount is required", [
      { field: "amount", message: "Must be a positive number" },
    ]);
  }

  const result = await customerService.checkCreditLimit(
    req.shopId,
    id,
    parseFloat(amount)
  );

  return ApiResponse.success(res, "Credit limit check complete", result);
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  checkCreditLimit,
};

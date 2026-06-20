// src/controllers/shopController.js
// HTTP handlers for shop management and onboarding.

const shopService = require("../services/shopService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * Register a new shop and complete owner onboarding.
 * Expects JWT auth headers (without shopId/userId yet) and shop details in body.
 */
const createShop = catchAsync(async (req, res) => {
  const authId = req.authId;
  const userPhone = req.phone;
  
  const result = await shopService.createShop(authId, userPhone, req.body);

  return ApiResponse.created(res, "Shop registered and onboarding completed successfully", result);
});

/**
 * Fetch details of the current shopkeeper's shop.
 */
const getShop = catchAsync(async (req, res) => {
  const shop = await shopService.getShopById(req.shopId);

  return ApiResponse.success(res, "Shop details fetched successfully", shop);
});

/**
 * Update the current shopkeeper's shop details.
 */
const updateShop = catchAsync(async (req, res) => {
  const updatedShop = await shopService.updateShop(req.shopId, req.body);

  return ApiResponse.success(res, "Shop updated successfully", updatedShop);
});

/**
 * Deactivate/soft-delete the current shopkeeper's shop and staff.
 */
const deleteShop = catchAsync(async (req, res) => {
  const result = await shopService.deleteShop(req.shopId);

  return ApiResponse.success(res, result.message, null);
});

module.exports = {
  createShop,
  getShop,
  updateShop,
  deleteShop,
};

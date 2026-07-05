// src/controllers/paymentClaimController.js
// Controller to manage payment claims for the shopkeeper.

const paymentClaimService = require("../services/paymentClaimService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/payment-claims
 * Fetch all payment claims for the shop.
 */
const getShopClaims = catchAsync(async (req, res) => {
  const claims = await paymentClaimService.getShopClaims(req.shopId, req.query);

  return ApiResponse.success(res, "Payment claims fetched successfully", claims);
});

/**
 * POST /api/v1/payment-claims/:id/confirm
 * Accept or reject a payment claim.
 */
const verifyPaymentClaim = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { confirmed } = req.body;

  const claim = await paymentClaimService.verifyPaymentClaim(req.shopId, id, confirmed, req.userId);

  const statusText = confirmed ? "confirmed" : "rejected";
  return ApiResponse.success(res, `Payment claim ${statusText} successfully`, claim);
});

module.exports = {
  getShopClaims,
  verifyPaymentClaim,
};

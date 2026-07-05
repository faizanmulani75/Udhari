// src/services/paymentClaimService.js
// Business logic for verifying, accepting, or rejecting payment claims.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

/**
 * Get all payment claims for a shop.
 *
 * @param {string} shopId - Shop UUID
 * @param {object} query - Filter options (e.g. status)
 * @returns {Promise<Array>} - List of payment claims with customer profiles
 */
const getShopClaims = async (shopId, query = {}) => {
  const where = {
    shopId,
    ...(query.status && { status: query.status }),
  };

  return await prisma.paymentClaim.findMany({
    where,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Confirm or reject a payment claim.
 * If confirmed, record a PAYMENT ledger transaction and decrement customer balance.
 *
 * @param {string} shopId - Shop UUID
 * @param {string} claimId - PaymentClaim UUID
 * @param {boolean} confirmed - Accept (true) or Reject (false)
 * @param {string} userId - User UUID of operator
 */
const verifyPaymentClaim = async (shopId, claimId, confirmed, userId) => {
  if (!claimId) throw ApiError.badRequest("Claim ID is required");
  if (confirmed === undefined) throw ApiError.badRequest("Confirmation status is required");

  // Find the claim
  const claim = await prisma.paymentClaim.findUnique({
    where: { id: claimId },
    include: { customer: true },
  });

  if (!claim || claim.shopId !== shopId) {
    throw ApiError.notFound("Payment claim not found");
  }

  if (claim.status !== "PENDING_SHOP_CONFIRM") {
    throw ApiError.badRequest(`This payment claim has already been ${claim.status.toLowerCase()}`);
  }

  if (confirmed) {
    // ── CONFIRMED FLOW ──
    const claimAmount = claim.amount;
    const newBalance = claim.customer.balance.minus(claimAmount);

    const [updatedClaim, newTxn] = await prisma.$transaction([
      // 1. Update claim status
      prisma.paymentClaim.update({
        where: { id: claimId },
        data: {
          status: "CONFIRMED",
          shopConfirmedAt: new Date(),
        },
      }),

      // 2. Decrement customer balance
      prisma.customer.update({
        where: { id: claim.customerId },
        data: {
          balance: newBalance,
        },
      }),

      // 3. Create PAYMENT transaction ledger entry
      prisma.transaction.create({
        data: {
          shopId,
          customerId: claim.customerId,
          type: "PAYMENT",
          amount: claimAmount,
          balanceAfter: newBalance,
          description: `UPI Payment (Claim Ref: ${claim.txnRef})`,
          referenceNumber: claim.txnRef,
          paymentMethod: "UPI",
          createdBy: userId,
        },
      }),
    ]);

    // Create a system log / audit record
    await prisma.auditLog.create({
      data: {
        shopId,
        userId,
        action: "CONFIRM_PAYMENT_CLAIM",
        details: `Confirmed payment claim of INR ${claimAmount} for customer ${claim.customer.name} (Ref: ${claim.txnRef})`,
      },
    });

    return updatedClaim;
  } else {
    // ── REJECTED FLOW ──
    const updatedClaim = await prisma.paymentClaim.update({
      where: { id: claimId },
      data: {
        status: "REJECTED",
      },
    });

    await prisma.auditLog.create({
      data: {
        shopId,
        userId,
        action: "REJECT_PAYMENT_CLAIM",
        details: `Rejected payment claim of INR ${claim.amount} for customer ${claim.customer.name} (Ref: ${claim.txnRef})`,
      },
    });

    return updatedClaim;
  }
};

module.exports = {
  getShopClaims,
  verifyPaymentClaim,
};

// src/services/portalService.js
// Business logic for the public customer portal.
// Uses the customer's unique qrToken to fetch details and ledger history.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { parsePagination, buildPaginationMeta } = require("../utils/pagination");

/**
 * Get customer profile and shop info by public qrToken.
 *
 * @param {string} token - Customer qrToken
 * @returns {Promise<object>} - Customer & Shop details
 */
const getCustomerPortalData = async (token) => {
  if (!token) {
    throw ApiError.badRequest("Token is required");
  }

  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { qrToken: token },
        { id: token },
      ],
      isActive: true,
      deletedAt: null,
    },
    include: {
      shop: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          address: true,
          logoUrl: true,
          currency: true,
          upiId: true,
        },
      },
    },
  });

  if (!customer) {
    throw ApiError.notFound("Invalid or expired statement link");
  }

  let upiUrl = null;
  let defaultTxnRef = null;
  if (customer.shop && customer.shop.upiId) {
    defaultTxnRef = `UDH${customer.shop.id.slice(0, 6)}${customer.id.slice(0, 6)}${Date.now()}`;
    const amount = parseFloat(customer.balance);
    if (amount > 0) {
      upiUrl = `upi://pay?pa=${encodeURIComponent(customer.shop.upiId)}` +
               `&pn=${encodeURIComponent(customer.shop.name)}` +
               `&am=${amount}` +
               `&tr=${defaultTxnRef}` +
               `&tn=${encodeURIComponent('Udhari Payment')}` +
               `&cu=INR`;
    }
  }

  return {
    customer: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      balance: parseFloat(customer.balance),
      createdAt: customer.createdAt,
    },
    shop: customer.shop,
    upiUrl,
    defaultTxnRef,
  };
};

/**
 * Get paginated transaction history for a customer by public qrToken.
 *
 * @param {string} token - Customer qrToken
 * @param {object} query - Pagination params { page?, limit?, type?, from?, to? }
 * @returns {Promise<object>} - Transactions list and pagination meta
 */
const getCustomerPortalTransactions = async (token, query) => {
  if (!token) {
    throw ApiError.badRequest("Token is required");
  }

  // 1. Fetch the customer to get customerId and shopId
  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { qrToken: token },
        { id: token },
      ],
      isActive: true,
      deletedAt: null,
    },
    select: {
      id: true,
      shopId: true,
    },
  });

  if (!customer) {
    throw ApiError.notFound("Invalid or expired statement link");
  }

  const { skip, take, page, limit } = parsePagination(query);

  const where = {
    customerId: customer.id,
    shopId: customer.shopId,
    deletedAt: null,
  };

  if (query.type) {
    where.type = query.type;
  }

  if (query.from || query.to) {
    where.transactionDate = {};
    if (query.from) {
      where.transactionDate.gte = new Date(query.from);
    }
    if (query.to) {
      const toDate = new Date(query.to);
      toDate.setHours(23, 59, 59, 999);
      where.transactionDate.lte = toDate;
    }
  }

  const [totalCount, transactions] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      skip,
      take,
      orderBy: { transactionDate: "desc" },
      select: {
        id: true,
        type: true,
        amount: true,
        balanceAfter: true,
        description: true,
        referenceNumber: true,
        paymentMethod: true,
        transactionDate: true,
      },
    }),
  ]);

  const meta = buildPaginationMeta(totalCount, page, limit);

  return { transactions, meta };
};

/**
 * Create a dispute note on a transaction by public qrToken (public, no auth).
 *
 * @param {string} token - Customer qrToken
 * @param {string} transactionId - Transaction UUID
 * @param {string} content - Dispute reason
 * @returns {Promise<object>} - Created dispute note
 */
const createCustomerPortalDispute = async (token, transactionId, content) => {
  if (!token) throw ApiError.badRequest("Token is required");
  if (!transactionId) throw ApiError.badRequest("Transaction ID is required");
  if (!content || content.trim().length === 0) {
    throw ApiError.badRequest("Dispute reason/content is required");
  }

  // Resolve customer
  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { qrToken: token },
        { id: token },
      ],
      isActive: true,
      deletedAt: null,
    },
    select: {
      id: true,
      shopId: true,
    },
  });

  if (!customer) throw ApiError.notFound("Invalid or expired statement link");

  // Resolve transaction and verify it belongs to customer and shop
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      customerId: customer.id,
      shopId: customer.shopId,
      deletedAt: null,
    },
  });

  if (!transaction) throw ApiError.notFound("Transaction not found");

  const note = await prisma.transactionNote.create({
    data: {
      transactionId,
      shopId: customer.shopId,
      content: content.trim(),
      isDispute: true,
    },
  });

  return note;
};

/**
 * Submit a payment verification claim from the public portal.
 *
 * @param {string} token - Customer qrToken
 * @param {number} amount - Paid amount
 * @param {string} txnRef - Transaction reference number
 */
const createPaymentClaim = async (token, amount, txnRef) => {
  if (!token) throw ApiError.badRequest("Token is required");
  if (!amount || amount <= 0) throw ApiError.badRequest("Valid payment amount is required");
  if (!txnRef) throw ApiError.badRequest("Transaction reference is required");

  // Resolve customer
  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { qrToken: token },
        { id: token },
      ],
      isActive: true,
      deletedAt: null,
    },
  });

  if (!customer) throw ApiError.notFound("Invalid or expired statement link");

  // Create the payment claim
  const claim = await prisma.paymentClaim.create({
    data: {
      shopId: customer.shopId,
      customerId: customer.id,
      amount,
      txnRef: txnRef.trim(),
      status: "PENDING_SHOP_CONFIRM",
    },
  });

  // Notify the shopkeeper
  const { notifyAllShopUsers } = require("./notificationService");
  await notifyAllShopUsers(
    customer.shopId,
    "Payment Claim Received",
    `${customer.name} has claimed a UPI payment of INR ${amount.toFixed(2)}. Verify now.`,
    "TRANSACTION"
  );

  return claim;
};

/**
 * Get claims list for a customer (public portal).
 *
 * @param {string} token - Customer qrToken
 */
const getCustomerClaims = async (token) => {
  if (!token) throw ApiError.badRequest("Token is required");

  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { qrToken: token },
        { id: token },
      ],
      isActive: true,
      deletedAt: null,
    },
    select: { id: true },
  });

  if (!customer) throw ApiError.notFound("Invalid or expired statement link");

  return await prisma.paymentClaim.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
};

module.exports = {
  getCustomerPortalData,
  getCustomerPortalTransactions,
  createCustomerPortalDispute,
  createPaymentClaim,
  getCustomerClaims,
};

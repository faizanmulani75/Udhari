// src/services/transactionService.js
// Business logic for the ledger module.
// All balance-mutating operations use Prisma interactive transactions
// to guarantee atomicity — the customer balance and the transaction
// record are always updated together or not at all.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { parsePagination, buildPaginationMeta } = require("../utils/pagination");

// ─── Constants ───────────────────────────────────────────

const TRANSACTION_TYPES = {
  CREDIT: "CREDIT",   // Shop gives goods on credit → customer owes MORE
  DEBIT: "DEBIT",     // Adjustment/return → customer owes LESS
  PAYMENT: "PAYMENT", // Customer pays back → customer owes LESS
};

const PAYMENT_METHODS = ["CASH", "UPI", "BANK_TRANSFER", "CHEQUE", "OTHER"];

// ─── Add Udhari (Credit) ────────────────────────────────

/**
 * Record a credit transaction — the shop extends credit to the customer.
 * Increases the customer's outstanding balance.
 *
 * Uses a Prisma interactive transaction to:
 *   1. Verify the customer exists and belongs to the shop
 *   2. Check the credit limit (if set)
 *   3. Update the customer balance atomically
 *   4. Insert the transaction with a balance_after snapshot
 *
 * @param {string} shopId     - Tenant shop ID
 * @param {string} customerId - Customer UUID
 * @param {object} data       - { amount, description?, referenceNumber? }
 * @param {string} userId     - The user (shopkeeper/staff) recording this entry
 * @returns {Promise<object>} The created transaction record
 */
const addCredit = async (shopId, customerId, data, userId) => {
  const { amount, description, referenceNumber } = data;

  const result = await prisma.$transaction(async (tx) => {
    // 1. Lock and fetch the customer
    const customer = await tx.customer.findFirst({
      where: {
        id: customerId,
        shopId,
        deletedAt: null,
        isActive: true,
      },
    });

    if (!customer) {
      throw ApiError.notFound("Customer not found or inactive");
    }

    const currentBalance = parseFloat(customer.balance);
    const creditLimit = parseFloat(customer.creditLimit);

    // 2. Check credit limit (0 means unlimited)
    if (creditLimit > 0 && currentBalance + amount > creditLimit) {
      throw ApiError.badRequest(
        `Credit limit exceeded. Limit: ₹${creditLimit}, Current balance: ₹${currentBalance}, Requested: ₹${amount}, Available: ₹${Math.max(0, creditLimit - currentBalance)}`
      );
    }

    // 3. Update customer balance
    const newBalance = currentBalance + amount;

    await tx.customer.update({
      where: { id: customerId },
      data: { balance: newBalance },
    });

    // 4. Create transaction record with balance snapshot
    const transaction = await tx.transaction.create({
      data: {
        shopId,
        customerId,
        type: TRANSACTION_TYPES.CREDIT,
        amount,
        balanceAfter: newBalance,
        description: description || null,
        referenceNumber: referenceNumber || null,
        createdBy: userId || null,
      },
    });

    return {
      transaction,
      previousBalance: currentBalance,
      newBalance,
    };
  });

  return result;
};

// ─── Add Payment ─────────────────────────────────────────

/**
 * Record a payment — the customer pays back some or all of their debt.
 * Decreases the customer's outstanding balance.
 *
 * @param {string} shopId     - Tenant shop ID
 * @param {string} customerId - Customer UUID
 * @param {object} data       - { amount, paymentMethod?, description?, referenceNumber? }
 * @param {string} userId     - The user recording this entry
 * @returns {Promise<object>} The created transaction record
 */
const addPayment = async (shopId, customerId, data, userId) => {
  const { amount, paymentMethod, description, referenceNumber } = data;

  const result = await prisma.$transaction(async (tx) => {
    // 1. Fetch the customer
    const customer = await tx.customer.findFirst({
      where: {
        id: customerId,
        shopId,
        deletedAt: null,
      },
    });

    if (!customer) {
      throw ApiError.notFound("Customer not found");
    }

    const currentBalance = parseFloat(customer.balance);

    // 2. Warn if overpaying (but allow it — creates a credit/advance)
    const newBalance = currentBalance - amount;

    // 3. Update customer balance
    await tx.customer.update({
      where: { id: customerId },
      data: { balance: newBalance },
    });

    // 4. Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        shopId,
        customerId,
        type: TRANSACTION_TYPES.PAYMENT,
        amount,
        balanceAfter: newBalance,
        paymentMethod: paymentMethod || "CASH",
        description: description || null,
        referenceNumber: referenceNumber || null,
        createdBy: userId || null,
      },
    });

    return {
      transaction,
      previousBalance: currentBalance,
      newBalance,
    };
  });

  return result;
};

// ─── Add Debit (Adjustment) ──────────────────────────────

/**
 * Record a debit adjustment — reduces the customer's balance.
 * Used for returns, corrections, or discounts.
 *
 * @param {string} shopId     - Tenant shop ID
 * @param {string} customerId - Customer UUID
 * @param {object} data       - { amount, description?, referenceNumber? }
 * @param {string} userId     - The user recording this entry
 * @returns {Promise<object>} The created transaction record
 */
const addDebit = async (shopId, customerId, data, userId) => {
  const { amount, description, referenceNumber } = data;

  const result = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.findFirst({
      where: {
        id: customerId,
        shopId,
        deletedAt: null,
      },
    });

    if (!customer) {
      throw ApiError.notFound("Customer not found");
    }

    const currentBalance = parseFloat(customer.balance);
    const newBalance = currentBalance - amount;

    await tx.customer.update({
      where: { id: customerId },
      data: { balance: newBalance },
    });

    const transaction = await tx.transaction.create({
      data: {
        shopId,
        customerId,
        type: TRANSACTION_TYPES.DEBIT,
        amount,
        balanceAfter: newBalance,
        description: description || null,
        referenceNumber: referenceNumber || null,
        createdBy: userId || null,
      },
    });

    return {
      transaction,
      previousBalance: currentBalance,
      newBalance,
    };
  });

  return result;
};

// ─── Transaction History ─────────────────────────────────

/**
 * Get paginated transaction history for a specific customer.
 *
 * @param {string} shopId     - Tenant shop ID
 * @param {string} customerId - Customer UUID
 * @param {object} query      - { page?, limit?, type?, startDate?, endDate?, sortOrder? }
 * @returns {Promise<{ transactions: array, meta: object }>}
 */
const getCustomerTransactions = async (shopId, customerId, query) => {
  const { skip, take, page, limit } = parsePagination(query);

  // Verify customer belongs to this shop
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null },
    select: { id: true, name: true, phone: true, balance: true },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  // Build where clause
  const where = {
    shopId,
    customerId,
    deletedAt: null,
  };

  // Filter by transaction type
  if (query.type && Object.values(TRANSACTION_TYPES).includes(query.type.toUpperCase())) {
    where.type = query.type.toUpperCase();
  }

  // Filter by date range
  if (query.startDate || query.endDate) {
    where.transactionDate = {};
    if (query.startDate) {
      where.transactionDate.gte = new Date(query.startDate);
    }
    if (query.endDate) {
      // Include the entire end date (set to end of day)
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      where.transactionDate.lte = endDate;
    }
  }

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  const [totalCount, transactions] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      skip,
      take,
      orderBy: { transactionDate: sortOrder },
      select: {
        id: true,
        type: true,
        amount: true,
        balanceAfter: true,
        description: true,
        referenceNumber: true,
        paymentMethod: true,
        transactionDate: true,
        createdAt: true,
        creator: {
          select: { id: true, name: true },
        },
        notes: {
          select: {
            id: true,
            isDispute: true,
            content: true,
            createdAt: true,
          },
        },
      },
    }),
  ]);

  const meta = buildPaginationMeta(totalCount, page, limit);

  return { customer, transactions, meta };
};

// ─── All Shop Transactions ───────────────────────────────

/**
 * Get paginated transaction history across ALL customers for a shop.
 * Used for the shopkeeper's global ledger view.
 *
 * @param {string} shopId - Tenant shop ID
 * @param {object} query  - { page?, limit?, type?, startDate?, endDate?, search? }
 * @returns {Promise<{ transactions: array, meta: object }>}
 */
const getShopTransactions = async (shopId, query) => {
  const { skip, take, page, limit } = parsePagination(query);

  const where = {
    shopId,
    deletedAt: null,
  };

  if (query.type && Object.values(TRANSACTION_TYPES).includes(query.type.toUpperCase())) {
    where.type = query.type.toUpperCase();
  }

  if (query.startDate || query.endDate) {
    where.transactionDate = {};
    if (query.startDate) {
      where.transactionDate.gte = new Date(query.startDate);
    }
    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      where.transactionDate.lte = endDate;
    }
  }

  // Search by customer name or phone
  if (query.search) {
    where.customer = {
      OR: [
        { name: { contains: query.search, mode: "insensitive" } },
        { phone: { contains: query.search } },
      ],
    };
  }

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  const [totalCount, transactions] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      skip,
      take,
      orderBy: { transactionDate: sortOrder },
      select: {
        id: true,
        type: true,
        amount: true,
        balanceAfter: true,
        description: true,
        referenceNumber: true,
        paymentMethod: true,
        transactionDate: true,
        createdAt: true,
        customer: {
          select: { id: true, name: true, phone: true },
        },
        creator: {
          select: { id: true, name: true },
        },
        notes: {
          select: {
            id: true,
            isDispute: true,
            content: true,
            createdAt: true,
          },
        },
      },
    }),
  ]);

  const meta = buildPaginationMeta(totalCount, page, limit);

  return { transactions, meta };
};

// ─── Get Single Transaction ──────────────────────────────

/**
 * Get a single transaction by ID (scoped to shop).
 *
 * @param {string} shopId        - Tenant shop ID
 * @param {string} transactionId - Transaction UUID
 * @returns {Promise<object>} Transaction with customer and creator details
 */
const getTransactionById = async (shopId, transactionId) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      shopId,
      deletedAt: null,
    },
    include: {
      customer: {
        select: { id: true, name: true, phone: true, balance: true },
      },
      creator: {
        select: { id: true, name: true },
      },
    },
  });

  if (!transaction) {
    throw ApiError.notFound("Transaction not found");
  }

  return transaction;
};

// ─── Delete (Reverse) Transaction ────────────────────────

/**
 * Soft-delete a transaction and reverse its effect on the customer balance.
 * This is the only safe way to "undo" a transaction — the original record
 * is preserved for audit trail purposes.
 *
 * @param {string} shopId        - Tenant shop ID
 * @param {string} transactionId - Transaction UUID
 * @param {string} userId        - The user performing the deletion
 * @returns {Promise<object>} The reversed transaction and new balance
 */
const deleteTransaction = async (shopId, transactionId, userId) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. Fetch the transaction
    const transaction = await tx.transaction.findFirst({
      where: {
        id: transactionId,
        shopId,
        deletedAt: null,
      },
    });

    if (!transaction) {
      throw ApiError.notFound("Transaction not found");
    }

    // 2. Fetch current customer balance
    const customer = await tx.customer.findFirst({
      where: { id: transaction.customerId, shopId },
      select: { balance: true },
    });

    const currentBalance = parseFloat(customer.balance);
    const txnAmount = parseFloat(transaction.amount);

    // 3. Reverse the balance effect
    let newBalance;
    if (transaction.type === TRANSACTION_TYPES.CREDIT) {
      // CREDIT added to balance → subtract to reverse
      newBalance = currentBalance - txnAmount;
    } else {
      // PAYMENT and DEBIT subtracted from balance → add to reverse
      newBalance = currentBalance + txnAmount;
    }

    // 4. Update customer balance
    await tx.customer.update({
      where: { id: transaction.customerId },
      data: { balance: newBalance },
    });

    // 5. Soft-delete the transaction
    await tx.transaction.update({
      where: { id: transactionId },
      data: { deletedAt: new Date() },
    });

    return {
      deletedTransaction: transaction,
      previousBalance: currentBalance,
      newBalance,
    };
  });

  return result;
};

// ─── Customer Summary ────────────────────────────────────

/**
 * Get a financial summary for a customer:
 *   - Total credit extended
 *   - Total payments received
 *   - Total debit adjustments
 *   - Current outstanding balance
 *   - Transaction count
 *   - Last transaction date
 *
 * @param {string} shopId     - Tenant shop ID
 * @param {string} customerId - Customer UUID
 * @returns {Promise<object>} Summary object
 */
const getCustomerSummary = async (shopId, customerId) => {
  // Verify customer exists
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null },
    select: {
      id: true,
      name: true,
      phone: true,
      balance: true,
      creditLimit: true,
      createdAt: true,
    },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  // Aggregate transaction totals by type
  const [creditAgg, paymentAgg, debitAgg, lastTransaction] = await Promise.all([
    prisma.transaction.aggregate({
      where: { shopId, customerId, type: TRANSACTION_TYPES.CREDIT, deletedAt: null },
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.transaction.aggregate({
      where: { shopId, customerId, type: TRANSACTION_TYPES.PAYMENT, deletedAt: null },
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.transaction.aggregate({
      where: { shopId, customerId, type: TRANSACTION_TYPES.DEBIT, deletedAt: null },
      _sum: { amount: true },
      _count: { id: true },
    }),
    prisma.transaction.findFirst({
      where: { shopId, customerId, deletedAt: null },
      orderBy: { transactionDate: "desc" },
      select: { transactionDate: true, type: true, amount: true },
    }),
  ]);

  const totalCredit = parseFloat(creditAgg._sum.amount || 0);
  const totalPayments = parseFloat(paymentAgg._sum.amount || 0);
  const totalDebits = parseFloat(debitAgg._sum.amount || 0);
  const creditLimit = parseFloat(customer.creditLimit);

  return {
    customer: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      memberSince: customer.createdAt,
    },
    summary: {
      currentBalance: parseFloat(customer.balance),
      totalCredit,
      totalPayments,
      totalDebits,
      totalTransactions: creditAgg._count.id + paymentAgg._count.id + debitAgg._count.id,
      creditLimit,
      availableCredit: creditLimit > 0
        ? Math.max(0, creditLimit - parseFloat(customer.balance))
        : null, // null = unlimited
      lastTransaction: lastTransaction || null,
    },
  };
};

module.exports = {
  addCredit,
  addPayment,
  addDebit,
  getCustomerTransactions,
  getShopTransactions,
  getTransactionById,
  deleteTransaction,
  getCustomerSummary,
  TRANSACTION_TYPES,
  PAYMENT_METHODS,
};

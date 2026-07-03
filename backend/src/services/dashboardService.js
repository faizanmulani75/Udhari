// src/services/dashboardService.js
// Business logic for the shop dashboard.
// Aggregates shop-wide ledger outstanding, customer lists, and activity logs.
// Uses LRU cache to reduce DB load for frequently-called summary endpoints.

const prisma = require("../config/prisma");
const { dashboardCache } = require("../utils/cache");

/**
 * Get summary stats for the shopkeeper's dashboard:
 *   - Total outstanding credit (receivables)
 *   - Total advance payments (payables/advances)
 *   - Total customer count
 *   - Active customer count
 *
 * @param {string} shopId - Tenant shop ID
 * @returns {Promise<object>}
 */
const getSummary = async (shopId) => {
  const cacheKey = `summary:${shopId}`;
  const cached = dashboardCache.get(cacheKey);
  if (cached) return cached;

  // Aggregate customer balances
  const customers = await prisma.customer.findMany({
    where: {
      shopId,
      deletedAt: null,
    },
    select: {
      balance: true,
      isActive: true,
    },
  });

  let totalCreditOutstanding = 0;
  let totalAdvancePayments = 0;
  let activeCount = 0;

  customers.forEach((c) => {
    const bal = parseFloat(c.balance || 0);
    if (bal > 0) {
      totalCreditOutstanding += bal;
    } else if (bal < 0) {
      totalAdvancePayments += Math.abs(bal);
    }
    if (c.isActive) {
      activeCount++;
    }
  });

  const result = {
    totalOutstanding: totalCreditOutstanding,
    totalAdvances: totalAdvancePayments,
    netReceivable: totalCreditOutstanding - totalAdvancePayments,
    totalCustomers: customers.length,
    activeCustomers: activeCount,
  };

  dashboardCache.set(cacheKey, result);
  return result;
};

/**
 * Get customers with the highest outstanding debts.
 *
 * @param {string} shopId - Tenant shop ID
 * @param {number} limit - Number of debtors to return
 * @returns {Promise<array>}
 */
const getTopDebtors = async (shopId, limit = 5) => {
  const debtors = await prisma.customer.findMany({
    where: {
      shopId,
      balance: { gt: 0 },
      deletedAt: null,
      isActive: true,
    },
    orderBy: {
      balance: "desc",
    },
    take: parseInt(limit),
    select: {
      id: true,
      name: true,
      phone: true,
      balance: true,
      creditLimit: true,
    },
  });

  return debtors;
};

/**
 * Get recent transactions across all customers.
 *
 * @param {string} shopId - Tenant shop ID
 * @param {number} limit - Number of logs to return
 * @returns {Promise<array>}
 */
const getRecentActivity = async (shopId, limit = 10) => {
  const activities = await prisma.transaction.findMany({
    where: {
      shopId,
      deletedAt: null,
    },
    orderBy: {
      transactionDate: "desc",
    },
    take: parseInt(limit),
    select: {
      id: true,
      type: true,
      amount: true,
      balanceAfter: true,
      transactionDate: true,
      description: true,
      customer: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
  });

  return activities;
};

module.exports = {
  getSummary,
  getTopDebtors,
  getRecentActivity,
  getAnalytics,
};

/**
 * Get analytics totals and daily trends.
 *
 * @param {string} shopId - Tenant shop ID
 * @param {number} days - Time period in days (7 or 30)
 * @returns {Promise<object>}
 */
async function getAnalytics(shopId, days = 7) {
  const cacheKey = `analytics:${shopId}:${days}`;
  const cached = dashboardCache.get(cacheKey);
  if (cached) return cached;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

  // Find all transactions in this period
  const [transactions, customersAdded, topDebtors] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        shopId,
        deletedAt: null,
        transactionDate: { gte: cutoffDate },
      },
      select: {
        type: true,
        amount: true,
        transactionDate: true,
      },
    }),
    // Customers added in the selected period
    prisma.customer.count({
      where: {
        shopId,
        deletedAt: null,
        createdAt: { gte: cutoffDate },
      },
    }),
    // Top 5 customers by outstanding balance
    prisma.customer.findMany({
      where: {
        shopId,
        balance: { gt: 0 },
        deletedAt: null,
        isActive: true,
      },
      orderBy: { balance: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        phone: true,
        balance: true,
      },
    }),
  ]);

  let totalCredit = 0;
  let totalPayments = 0;
  let totalDebitAdjustments = 0;

  // Let's bucket them by date (YYYY-MM-DD)
  const dailyMap = new Map();
  // Pre-populate daily map with 0s for all days in range
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    dailyMap.set(dateStr, { date: dateStr, credit: 0, payment: 0 });
  }

  transactions.forEach((tx) => {
    const amt = parseFloat(tx.amount || 0);
    const dateStr = new Date(tx.transactionDate).toISOString().split("T")[0];
    
    if (tx.type === "CREDIT") {
      totalCredit += amt;
      if (dailyMap.has(dateStr)) {
        dailyMap.get(dateStr).credit += amt;
      }
    } else if (tx.type === "PAYMENT") {
      totalPayments += amt;
      if (dailyMap.has(dateStr)) {
        dailyMap.get(dateStr).payment += amt;
      }
    } else if (tx.type === "DEBIT") {
      totalDebitAdjustments += amt;
    }
  });

  const dailyTrends = Array.from(dailyMap.values()).reverse();

  const result = {
    totalCredit,
    totalPayments,
    totalDebitAdjustments,
    customersAdded,
    topDebtors,
    dailyTrends,
  };

  dashboardCache.set(cacheKey, result);
  return result;
}

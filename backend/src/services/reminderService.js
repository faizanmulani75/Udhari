// src/services/reminderService.js
// Business logic for manual and bulk payment reminder management.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { parsePagination, buildPaginationMeta } = require("../utils/pagination");

/**
 * Send a single reminder to a specific customer.
 * @param {string} shopId
 * @param {string} customerId
 * @param {string} userId - Who triggered it
 * @returns {Promise<object>}
 */
const sendSingleReminder = async (shopId, customerId, userId) => {
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null, isActive: true },
    include: { shop: { select: { name: true, currency: true } } },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  const balance = parseFloat(customer.balance);
  if (balance <= 0) {
    throw ApiError.badRequest("Customer has no outstanding balance to remind about");
  }

  const portalUrl = `${process.env.PORTAL_BASE_URL || "https://udhari-tracking.vercel.app"}/customer/${customer.qrToken || customer.id}`;
  const message = `Hello ${customer.name}, this is a friendly reminder from ${customer.shop.name}. Your outstanding balance is ${customer.shop.currency} ${balance.toFixed(2)}. Please clear your dues at your convenience. View statement: ${portalUrl}`;

  const reminder = await prisma.reminder.create({
    data: {
      shopId,
      customerId,
      channel: "WHATSAPP",
      status: "SENT",
      message,
      amountDue: customer.balance,
      sentAt: new Date(),
      createdBy: userId,
    },
  });

  // Update customer's lastReminderAt
  await prisma.customer.update({
    where: { id: customerId },
    data: { lastReminderAt: new Date() },
  });

  console.log(`💬 [Simulated WhatsApp] Sent to ${customer.name} (${customer.phone}) — ${customer.shop.currency} ${balance.toFixed(2)}`);

  return { reminder, customer: { name: customer.name, phone: customer.phone, balance } };
};

/**
 * Send bulk reminders to all customers with outstanding balances.
 * Rate-limited: max 50 per batch to prevent SMS spam.
 * @param {string} shopId
 * @param {string} userId
 * @returns {Promise<object>}
 */
const sendBulkReminders = async (shopId, userId) => {
  const debtors = await prisma.customer.findMany({
    where: {
      shopId,
      deletedAt: null,
      isActive: true,
      balance: { gt: 0 },
    },
    include: { shop: { select: { name: true, currency: true } } },
    take: 50, // Rate limit: max 50 per batch
    orderBy: { balance: "desc" }, // Highest debtors first
  });

  if (debtors.length === 0) {
    throw ApiError.notFound("No customers with outstanding balances found");
  }

  const results = [];
  const now = new Date();

  // We can update the customers in bulk or individually. Since we have their IDs, let's do it inside the loop.
  for (const customer of debtors) {
    const balance = parseFloat(customer.balance);
    const portalUrl = `${process.env.PORTAL_BASE_URL || "https://udhari-tracking.vercel.app"}/customer/${customer.qrToken || customer.id}`;
    const message = `Hello ${customer.name}, this is a friendly reminder from ${customer.shop.name}. Your outstanding balance is ${customer.shop.currency} ${balance.toFixed(2)}. Please clear your dues at your convenience. View statement: ${portalUrl}`;

    const reminder = await prisma.reminder.create({
      data: {
        shopId,
        customerId: customer.id,
        channel: "WHATSAPP",
        status: "SENT",
        message,
        amountDue: customer.balance,
        sentAt: now,
        createdBy: userId,
      },
    });

    await prisma.customer.update({
      where: { id: customer.id },
      data: { lastReminderAt: now },
    });

    results.push({
      customerId: customer.id,
      name: customer.name,
      phone: customer.phone,
      balance,
      reminderId: reminder.id,
    });

    console.log(`💬 [Simulated WhatsApp Bulk] → ${customer.name} (${customer.phone}) | Message: ${message}`);
  }

  return {
    totalSent: results.length,
    results,
  };
};

/**
 * Get paginated reminder history for the shop.
 * @param {string} shopId
 * @param {object} query - { page?, limit?, customerId?, status? }
 * @returns {Promise<object>}
 */
const getReminderHistory = async (shopId, query) => {
  const { skip, take, page, limit } = parsePagination(query);

  const where = { shopId, deletedAt: null };

  if (query.customerId) {
    where.customerId = query.customerId;
  }
  if (query.status) {
    where.status = query.status;
  }

  const [totalCount, reminders] = await Promise.all([
    prisma.reminder.count({ where }),
    prisma.reminder.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
      },
    }),
  ]);

  const meta = buildPaginationMeta(totalCount, page, limit);
  return { reminders, meta };
};

module.exports = {
  sendSingleReminder,
  sendBulkReminders,
  getReminderHistory,
};

// src/services/customerService.js
// Business logic for customer CRUD operations.
// Every query is scoped to shopId for multi-tenant isolation.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { parsePagination, buildPaginationMeta } = require("../utils/pagination");

/**
 * Create a new customer for a shop.
 *
 * @param {string} shopId - The shop this customer belongs to
 * @param {object} data   - { name, phone, email?, address?, notes?, creditLimit? }
 * @returns {Promise<object>} Created customer
 */
const createCustomer = async (shopId, data) => {
  const { name, phone, email, address, notes, creditLimit } = data;

  // Check for duplicate phone within this shop (among non-deleted customers)
  const existing = await prisma.customer.findFirst({
    where: {
      shopId,
      phone,
      deletedAt: null,
    },
  });

  if (existing) {
    throw ApiError.conflict(`Customer with phone ${phone} already exists in this shop`);
  }

  const customer = await prisma.customer.create({
    data: {
      shopId,
      name,
      phone,
      email: email || null,
      address: address || null,
      notes: notes || null,
      creditLimit: creditLimit || 0,
      reminderInterval: data.reminderInterval || "weekly",
      balance: 0,
    },
  });

  return customer;
};

/**
 * Get all customers for a shop with search, filters, and pagination.
 *
 * @param {string} shopId - Shop to filter by
 * @param {object} query  - { page?, limit?, search?, sortBy?, sortOrder?, isActive? }
 * @returns {Promise<{ customers: array, meta: object }>}
 */
const getCustomers = async (shopId, query) => {
  const { skip, take, page, limit } = parsePagination(query);

  // Build where clause
  const where = {
    shopId,
    deletedAt: null,
  };

  // Filter by active status if specified
  if (query.isActive !== undefined) {
    where.isActive = query.isActive === "true";
  }

  // Filter by tag if specified
  if (query.tagId) {
    where.tags = {
      some: {
        tagId: query.tagId,
      },
    };
  }

  // Search by name or phone
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search } },
    ];
  }

  // Sort configuration
  const allowedSortFields = ["name", "balance", "createdAt", "updatedAt"];
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  // Run count and find in parallel
  const [totalCount, customers] = await Promise.all([
    prisma.customer.count({ where }),
    prisma.customer.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        balance: true,
        creditLimit: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastReminderAt: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    }),
  ]);

  const meta = buildPaginationMeta(totalCount, page, limit);

  return { customers, meta };
};

/**
 * Get a single customer by ID (scoped to shop).
 *
 * @param {string} shopId     - Shop the customer must belong to
 * @param {string} customerId - Customer UUID
 * @returns {Promise<object>} Customer with full details
 */
const getCustomerById = async (shopId, customerId) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      shopId,
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          transactions: {
            where: { deletedAt: null },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  return customer;
};

/**
 * Update a customer's information.
 *
 * @param {string} shopId     - Shop the customer belongs to
 * @param {string} customerId - Customer UUID
 * @param {object} data       - Fields to update: { name?, phone?, email?, address?, notes?, creditLimit?, isActive? }
 * @returns {Promise<object>} Updated customer
 */
const updateCustomer = async (shopId, customerId, data) => {
  // Verify customer exists and belongs to this shop
  const existing = await prisma.customer.findFirst({
    where: {
      id: customerId,
      shopId,
      deletedAt: null,
    },
  });

  if (!existing) {
    throw ApiError.notFound("Customer not found");
  }

  // If phone is being changed, check for duplicates
  if (data.phone && data.phone !== existing.phone) {
    const duplicate = await prisma.customer.findFirst({
      where: {
        shopId,
        phone: data.phone,
        deletedAt: null,
        id: { not: customerId },
      },
    });

    if (duplicate) {
      throw ApiError.conflict(`Another customer with phone ${data.phone} already exists`);
    }
  }

  // Build update payload — only include provided fields
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.notes !== undefined) updateData.notes = data.notes;
  if (data.creditLimit !== undefined) updateData.creditLimit = data.creditLimit;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.reminderInterval !== undefined) updateData.reminderInterval = data.reminderInterval;

  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: updateData,
  });

  return customer;
};

/**
 * Soft-delete a customer.
 * Sets deletedAt timestamp and deactivates the customer.
 *
 * @param {string} shopId     - Shop the customer belongs to
 * @param {string} customerId - Customer UUID
 * @returns {Promise<void>}
 */
const deleteCustomer = async (shopId, customerId) => {
  const existing = await prisma.customer.findFirst({
    where: {
      id: customerId,
      shopId,
      deletedAt: null,
    },
  });

  if (!existing) {
    throw ApiError.notFound("Customer not found");
  }

  // Check if customer has outstanding balance
  if (parseFloat(existing.balance) !== 0) {
    throw ApiError.badRequest(
      `Cannot delete customer with outstanding balance of ₹${existing.balance}. Settle the balance first.`
    );
  }

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      deletedAt: new Date(),
      isActive: false,
    },
  });
};

/**
 * Check if adding credit would exceed the customer's credit limit.
 *
 * @param {string} shopId     - Shop ID
 * @param {string} customerId - Customer UUID
 * @param {number} amount     - Amount of credit being extended
 * @returns {Promise<{ allowed: boolean, currentBalance: number, creditLimit: number, availableCredit: number }>}
 */
const checkCreditLimit = async (shopId, customerId, amount) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      shopId,
      deletedAt: null,
    },
    select: {
      balance: true,
      creditLimit: true,
    },
  });

  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  const currentBalance = parseFloat(customer.balance);
  const creditLimit = parseFloat(customer.creditLimit);

  // creditLimit of 0 means unlimited
  if (creditLimit === 0) {
    return {
      allowed: true,
      currentBalance,
      creditLimit,
      availableCredit: Infinity,
    };
  }

  const availableCredit = creditLimit - currentBalance;
  const allowed = currentBalance + amount <= creditLimit;

  return {
    allowed,
    currentBalance,
    creditLimit,
    availableCredit: Math.max(0, availableCredit),
  };
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  checkCreditLimit,
};

// src/services/shopService.js
// Business logic for shops and owner onboarding.

const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-jwt-secret-min-32-chars-long";
const JWT_EXPIRES_IN = "7d";

/**
 * Register a new shop and its owner user atomically.
 * Automatically provisions a FREE subscription.
 *
 * @param {string} authId - The UUID from authenticated credentials
 * @param {string} userPhone - User phone number from authentication
 * @param {object} data - { shopName, shopPhone, ownerName, email?, address?, city?, state?, pincode?, currency? }
 * @returns {Promise<object>} The shop, user, and a fresh JWT token
 */
const createShop = async (authId, userPhone, data) => {
  const {
    shopName,
    shopPhone,
    ownerName,
    email,
    address,
    city,
    state,
    pincode,
    currency = "INR",
  } = data;

  if (!shopName || !shopPhone || !ownerName) {
    throw ApiError.badRequest("Shop name, shop phone, and owner name are required");
  }

  // 1. Check if authId is already linked to a user/shop
  const existingUser = await prisma.user.findFirst({
    where: { authId, deletedAt: null },
  });
  if (existingUser) {
    throw ApiError.conflict("User onboarding has already been completed for this account");
  }

  // 2. Check if shop phone already exists
  const existingShop = await prisma.shop.findFirst({
    where: { phone: shopPhone, deletedAt: null },
  });
  if (existingShop) {
    throw ApiError.conflict("A shop with this phone number is already registered");
  }

  // Run database insertions inside an atomic transaction
  const result = await prisma.$transaction(async (tx) => {
    // A. Create the Shop
    const shop = await tx.shop.create({
      data: {
        name: shopName,
        phone: shopPhone,
        email: email || null,
        address: address || null,
        city: city || null,
        state: state || null,
        pincode: pincode || null,
        currency,
      },
    });

    // B. Create the User (owner)
    const user = await tx.user.create({
      data: {
        shopId: shop.id,
        authId,
        name: ownerName,
        phone: userPhone,
        email: email || null,
        role: "owner",
      },
    });

    // C. Provision default FREE subscription plan
    await tx.subscription.create({
      data: {
        shopId: shop.id,
        plan: "FREE",
        status: "ACTIVE",
        maxCustomers: 50,
        maxUsers: 1,
        amount: 0.0,
        currency,
        billingCycle: "monthly",
      },
    });

    return { shop, user };
  });

  // 3. Generate a fresh JWT containing the newly created userId and shopId
  const accessToken = jwt.sign(
    {
      authId,
      phone: userPhone,
      userId: result.user.id,
      shopId: result.shop.id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    accessToken,
    user: {
      id: result.user.id,
      name: result.user.name,
      phone: result.user.phone,
      email: result.user.email,
      role: result.user.role,
    },
    shop: {
      id: result.shop.id,
      name: result.shop.name,
      phone: result.shop.phone,
      currency: result.shop.currency,
    },
  };
};

/**
 * Get shop details by ID.
 *
 * @param {string} shopId
 * @returns {Promise<object>}
 */
const getShopById = async (shopId) => {
  const shop = await prisma.shop.findFirst({
    where: { id: shopId, deletedAt: null },
    include: {
      subscriptions: {
        where: { status: "ACTIVE" },
        take: 1,
      },
    },
  });

  if (!shop) {
    throw ApiError.notFound("Shop not found");
  }

  return shop;
};

/**
 * Update shop details.
 *
 * @param {string} shopId
 * @param {object} updateData
 * @returns {Promise<object>}
 */
const updateShop = async (shopId, updateData) => {
  const { name, phone, email, address, city, state, pincode, logoUrl, currency, upiId } = updateData;

  if (upiId && !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9.\-_]{2,256}$/.test(upiId.trim())) {
    throw ApiError.badRequest("Invalid UPI ID format. Must be a valid VPA (e.g., name@upi)");
  }

  // Verify shop exists
  const shop = await prisma.shop.findFirst({
    where: { id: shopId, deletedAt: null },
  });
  if (!shop) {
    throw ApiError.notFound("Shop not found");
  }

  // If changing phone, verify uniqueness
  if (phone && phone !== shop.phone) {
    const existing = await prisma.shop.findFirst({
      where: { phone, deletedAt: null },
    });
    if (existing) {
      throw ApiError.conflict("A shop with this phone number is already registered");
    }
  }

  const updatedShop = await prisma.shop.update({
    where: { id: shopId },
    data: {
      name: name || undefined,
      phone: phone || undefined,
      email: email !== undefined ? email : undefined,
      address: address !== undefined ? address : undefined,
      city: city !== undefined ? city : undefined,
      state: state !== undefined ? state : undefined,
      pincode: pincode !== undefined ? pincode : undefined,
      logoUrl: logoUrl !== undefined ? logoUrl : undefined,
      currency: currency || undefined,
      upiId: upiId !== undefined ? upiId : undefined,
    },
  });

  return updatedShop;
};

/**
 * Soft-delete a shop and all its users.
 *
 * @param {string} shopId
 * @returns {Promise<object>}
 */
const deleteShop = async (shopId) => {
  const shop = await prisma.shop.findFirst({
    where: { id: shopId, deletedAt: null },
  });
  if (!shop) {
    throw ApiError.notFound("Shop not found");
  }

  await prisma.$transaction(async (tx) => {
    // Soft delete Shop
    await tx.shop.update({
      where: { id: shopId },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // Soft delete Users
    await tx.user.updateMany({
      where: { shopId, deletedAt: null },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  });

  return { success: true, message: "Shop and users successfully deactivated" };
};

module.exports = {
  createShop,
  getShopById,
  updateShop,
  deleteShop,
};

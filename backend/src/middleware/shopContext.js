// src/middleware/shopContext.js
// Tenant isolation middleware.
// Ensures that the request contains a valid, active shop context.
// Uses LRU cache to avoid hitting DB on every request.

const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const { shopCache } = require("../utils/cache");

/**
 * Middleware to enforce tenant context.
 * Checks that req.shopId is set (by auth middleware) and verifies the shop exists and is active.
 * Caches shop lookups for 5 minutes to reduce DB load.
 */
const shopContext = async (req, res, next) => {
  // shopId should be attached to req by the authMiddleware (from the JWT payload).
  // We also check headers for testing or temporary fallbacks.
  const shopId = req.shopId || req.headers["x-shop-id"];

  if (!shopId) {
    return next(ApiError.unauthorized("Shop context is missing. Active shop required."));
  }

  try {
    // Check cache first
    const cacheKey = `shop:${shopId}`;
    let shop = shopCache.get(cacheKey);

    if (!shop) {
      // Cache miss — query DB
      shop = await prisma.shop.findFirst({
        where: {
          id: shopId,
          isActive: true,
          deletedAt: null,
        },
      });

      if (!shop) {
        return next(ApiError.forbidden("Access denied: Shop not found or inactive"));
      }

      // Store in cache
      shopCache.set(cacheKey, shop);
    }

    // Standardize shopId and attach full shop object to request
    req.shopId = shop.id;
    req.shop = {
      id: shop.id,
      name: shop.name,
      phone: shop.phone,
      currency: shop.currency,
    };

    // Attach the current user's role so controllers can check it
    // (e.g. to decide whether to notify the owner of a staff action)
    if (req.userId) {
      try {
        const user = await prisma.user.findFirst({
          where: { id: req.userId, shopId: shop.id, deletedAt: null },
          select: { role: true },
        });
        req.userRole = user?.role || "staff";

        // Enforce subscription check: if user is staff (not owner) and subscription is expired or free, block access!
        if (req.userRole !== "owner") {
          const { getActiveSubscription } = require("../services/subscriptionService");
          const subscription = await getActiveSubscription(shop.id);
          // If no active subscription (expired/free), max users is 1, which means staff are not allowed to access the ledger!
          if (!subscription || subscription.plan === "FREE") {
            return next(ApiError.forbidden("Access denied: Shop subscription has expired. Please ask the owner to renew."));
          }
        }
      } catch (err) {
        if (err.statusCode === 403) return next(err);
        req.userRole = "staff";
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = shopContext;


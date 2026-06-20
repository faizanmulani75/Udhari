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

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = shopContext;


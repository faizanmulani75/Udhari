// src/middleware/auth.js
// Authentication middleware that verifies the incoming JWT token.
// Scopes: Extracts authId, phone, userId, and shopId, and attaches them to req.

const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const JWT_SECRET = process.env.JWT_SECRET || "fallback-jwt-secret-min-32-chars-long";

/**
 * Middleware to protect routes with JWT authentication.
 */
const authMiddleware = (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return next(ApiError.unauthorized("Authentication token required"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    // Attach authentication context to request object
    req.authId = payload.authId;
    req.phone = payload.phone;
    req.userId = payload.userId || null;
    req.shopId = payload.shopId || null;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(ApiError.unauthorized("Authentication token has expired"));
    }
    return next(ApiError.unauthorized("Invalid or malformed authentication token"));
  }
};

module.exports = authMiddleware;

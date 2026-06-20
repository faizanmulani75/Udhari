// src/middleware/errorHandler.js
// Global Express error-handling middleware.
// Catches all errors thrown/forwarded by controllers and sends a consistent JSON response.

const ApiError = require("../utils/ApiError");

/**
 * Global error handler — must be registered LAST in the Express middleware chain.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Default to 500 if no status code is set
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  // Prisma known errors
  if (err.code === "P2002") {
    statusCode = 409;
    const target = err.meta?.target;
    message = `A record with this ${target ? target.join(", ") : "value"} already exists`;
  }

  if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
  }

  // Log unexpected (non-operational) errors
  if (!err.isOperational) {
    console.error("💥 Unexpected Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;

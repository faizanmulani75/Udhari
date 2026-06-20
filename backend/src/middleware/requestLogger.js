// src/middleware/requestLogger.js
// Structured JSON request/response logger with timing and request IDs.
// Logs method, path, status, duration, and user context for debugging.

const crypto = require("crypto");

/**
 * Attach a unique request ID and log request/response lifecycle.
 */
const requestLogger = (req, res, next) => {
  // Generate unique request ID
  req.requestId = crypto.randomUUID();
  res.setHeader("X-Request-Id", req.requestId);

  const startTime = Date.now();
  const startHrTime = process.hrtime.bigint();

  // Log on response finish
  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startHrTime) / 1e6;
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.get("User-Agent")?.substring(0, 100),
      userId: req.userId || null,
      shopId: req.shopId || null,
    };

    // Color-code by status for dev readability
    if (res.statusCode >= 500) {
      console.error("❌ REQ", JSON.stringify(logEntry));
    } else if (res.statusCode >= 400) {
      console.warn("⚠️  REQ", JSON.stringify(logEntry));
    } else if (process.env.NODE_ENV !== "production" || durationMs > 1000) {
      // In dev log everything; in prod only log slow requests
      console.log("✅ REQ", JSON.stringify(logEntry));
    }
  });

  next();
};

module.exports = requestLogger;

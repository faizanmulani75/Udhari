// src/utils/catchAsync.js
// Wraps an async route handler so that rejected promises are forwarded to
// Express's error-handling middleware via next(err) — no try/catch boilerplate.

/**
 * @param {Function} fn - Async Express route handler (req, res, next) => Promise
 * @returns {Function}  - Wrapped handler that catches errors automatically
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = catchAsync;

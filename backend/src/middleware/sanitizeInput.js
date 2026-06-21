// src/middleware/sanitizeInput.js
// Global middleware to prevent XSS script injection and normalize Indian phone numbers.

const ApiError = require("../utils/ApiError");

/**
 * Normalizes Indian phone numbers to E.164 format (+91XXXXXXXXXX).
 */
const formatIndianPhoneNumber = (phone) => {
  if (!phone || typeof phone !== "string") return phone;

  // Clean all whitespace, dashes, brackets, etc.
  let cleaned = phone.replace(/[\s\-\(\)]/g, "");

  // If it's a valid 10-digit Indian number starting with 6-9
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return "+91" + cleaned;
  }
  // Starting with 0 followed by 10 digits
  if (/^0[6-9]\d{9}$/.test(cleaned)) {
    return "+91" + cleaned.substring(1);
  }
  // Starting with 91 followed by 10 digits
  if (/^91[6-9]\d{9}$/.test(cleaned)) {
    return "+" + cleaned;
  }
  // Starting with +91 followed by 10 digits
  if (/^\+91[6-9]\d{9}$/.test(cleaned)) {
    return cleaned;
  }

  // If already prefixed with '+' but doesn't match above, return cleaned as is
  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  // Fallback: if it's 10 digits, prepend +91
  if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
    return "+91" + cleaned;
  }

  return cleaned;
};

/**
 * Checks if a string contains HTML tags, script blocks, or XSS vectors.
 */
const containsScript = (val) => {
  if (typeof val !== "string") return false;

  const scriptTagPattern = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
  const htmlTagPattern = /<[^>]+>/g;
  const javascriptUriPattern = /javascript\s*:/gi;
  const inlineHandlerPattern = /\bon[a-z]+\s*=\s*['"][^'"]*['"]/gi; // e.g. onload="..." or onerror="..."

  return (
    scriptTagPattern.test(val) ||
    htmlTagPattern.test(val) ||
    javascriptUriPattern.test(val) ||
    inlineHandlerPattern.test(val)
  );
};

/**
 * Recursively scans and sanitizes query params, body, and path parameters.
 * Returns true if a script tag is detected.
 */
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return false;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];

      if (typeof val === "string") {
        // 1. Block XSS script tags
        if (containsScript(val)) {
          return true; // Script detected
        }

        // 2. Format Indian phone numbers automatically
        const isPhoneField =
          key.toLowerCase() === "phone" ||
          key.toLowerCase() === "userphone" ||
          (key.toLowerCase() === "identifier" && /^\d+$/.test(val.replace(/[\s\-\(\)]/g, "")));

        if (isPhoneField) {
          obj[key] = formatIndianPhoneNumber(val);
        }
      } else if (typeof val === "object" && val !== null) {
        if (sanitizeObject(val)) {
          return true; // Script detected in nested child
        }
      }
    }
  }
  return false;
};

const sanitizeInput = (req, res, next) => {
  // Check and sanitize body, query, and route parameters
  if (
    sanitizeObject(req.body) ||
    sanitizeObject(req.query) ||
    sanitizeObject(req.params)
  ) {
    return next(ApiError.badRequest("Malicious input or script tags detected. Input rejected."));
  }
  next();
};

module.exports = sanitizeInput;

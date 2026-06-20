// src/utils/format.js
// Standard formatting helpers for currency and dates.

/**
 * Format numeric amount to Indian Rupee (INR) or USD currency format.
 *
 * @param {number|string} amount - The amount to format
 * @param {string} currencyCode - 'INR' or 'USD'
 * @returns {string} Formatted string
 */
export const formatCurrency = (amount, currencyCode = "INR") => {
  const numericVal = parseFloat(amount || 0);
  
  if (currencyCode === "USD") {
    return `$${numericVal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Indian format: ₹XX,XX,XXX.XX
  return `₹${numericVal.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format ISO date string into readable date-time.
 *
 * @param {string|Date} dateVal
 * @param {boolean} includeTime
 * @returns {string} Formatted date string
 */
export const formatDate = (dateVal, includeTime = false) => {
  if (!dateVal) return "";
  const d = new Date(dateVal);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  return d.toLocaleDateString("en-IN", options);
};

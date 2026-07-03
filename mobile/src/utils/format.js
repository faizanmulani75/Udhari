// src/utils/format.js
// Standard formatting helpers for currency and dates.

/**
 * Format numeric amount to Indian Rupee (INR) currency format.
 *
 * @param {number|string} amount - The amount to format
 * @param {string} currencyCode - 'INR'
 * @returns {string} Formatted string
 */
export const formatCurrency = (amount, currencyCode = "INR") => {
  const numericVal = parseFloat(amount || 0);
  
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

/**
 * Format date to a friendly relative indicator (Today, Yesterday, or X days ago)
 *
 * @param {string|Date} dateVal
 * @returns {string} Relative or formatted date string
 */
export const formatRelativeDate = (dateVal) => {
  if (!dateVal) return "";
  const date = new Date(dateVal);
  const now = new Date();
  
  // Reset time portions for pure day-to-day comparison
  const dStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = nowStart.getTime() - dStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

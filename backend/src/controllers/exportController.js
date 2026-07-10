// src/controllers/exportController.js
// Controller for CSV/PDF export endpoints.

const exportService = require("../services/exportService");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/export/customers/csv
 * Export all customers as a downloadable CSV file.
 */
const exportCustomersCSV = catchAsync(async (req, res) => {
  const { getActiveSubscription } = require("../services/subscriptionService");
  const subscription = await getActiveSubscription(req.shopId);
  if (!subscription || subscription.plan !== "PRO") {
    return res.status(403).json({ success: false, message: "Exporting statements is a Pro-only feature. Please upgrade your plan." });
  }

  const csv = await exportService.exportCustomersCSV(req.shopId);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="customers_${Date.now()}.csv"`);
  return res.send(csv);
});

/**
 * GET /api/v1/export/transactions/csv
 * Export transactions as a downloadable CSV file.
 * Query params: customerId?, from?, to?
 */
const exportTransactionsCSV = catchAsync(async (req, res) => {
  const { getActiveSubscription } = require("../services/subscriptionService");
  const subscription = await getActiveSubscription(req.shopId);
  if (!subscription || subscription.plan !== "PRO") {
    return res.status(403).json({ success: false, message: "Exporting statements is a Pro-only feature. Please upgrade your plan." });
  }

  const { customerId, from, to } = req.query;
  const csv = await exportService.exportTransactionsCSV(req.shopId, { customerId, from, to });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="transactions_${Date.now()}.csv"`);
  return res.send(csv);
});

/**
 * GET /api/v1/export/transactions/pdf
 * Export a customer's transaction statement as a branded PDF.
 * Query params: customerId (required), from?, to?
 */
const exportTransactionsPDF = catchAsync(async (req, res) => {
  const { getActiveSubscription } = require("../services/subscriptionService");
  const subscription = await getActiveSubscription(req.shopId);
  if (!subscription || subscription.plan !== "PRO") {
    return res.status(403).json({ success: false, message: "Exporting statements is a Pro-only feature. Please upgrade your plan." });
  }

  const { customerId, from, to } = req.query;

  if (!customerId) {
    return res.status(400).json({ success: false, message: "customerId query parameter is required" });
  }

  const pdfDoc = await exportService.exportTransactionsPDF(req.shopId, customerId, { from, to });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="statement_${Date.now()}.pdf"`);
  pdfDoc.pipe(res);
});

module.exports = {
  exportCustomersCSV,
  exportTransactionsCSV,
  exportTransactionsPDF,
};

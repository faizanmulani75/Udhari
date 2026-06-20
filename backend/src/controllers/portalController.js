// src/controllers/portalController.js
// Controller for the public customer portal module.

const portalService = require("../services/portalService");
const exportService = require("../services/exportService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/portal/:token
 * Fetch customer profile and shop info by public qrToken.
 */
const getCustomerPortalData = catchAsync(async (req, res) => {
  const { token } = req.params;
  const data = await portalService.getCustomerPortalData(token);
  
  return ApiResponse.success(res, "Portal details retrieved successfully", data);
});

/**
 * GET /api/v1/portal/:token/transactions
 * Fetch paginated transaction statement list by public qrToken.
 */
const getCustomerPortalTransactions = catchAsync(async (req, res) => {
  const { token } = req.params;
  const data = await portalService.getCustomerPortalTransactions(token, req.query);

  return ApiResponse.success(
    res,
    "Portal transactions statement retrieved successfully",
    data.transactions,
    data.meta
  );
});

/**
 * GET /api/v1/portal/:token/pdf
 * Generate and download a PDF statement for the customer (public, no auth).
 */
const getCustomerPortalPDF = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { from, to } = req.query;

  // First resolve the customer from the token
  const data = await portalService.getCustomerPortalData(token);
  
  // Generate PDF using the export service
  const pdfDoc = await exportService.exportTransactionsPDF(
    data.shop.id,
    data.customer.id,
    { from, to }
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="statement_${data.customer.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf"`);
  pdfDoc.pipe(res);
});

/**
 * POST /api/v1/portal/:token/transactions/:transactionId/disputes
 * Create a transaction dispute/note from the public portal.
 */
const createCustomerPortalDispute = catchAsync(async (req, res) => {
  const { token, transactionId } = req.params;
  const { content } = req.body;

  const note = await portalService.createCustomerPortalDispute(token, transactionId, content);

  return ApiResponse.created(res, "Dispute raised successfully", note);
});

module.exports = {
  getCustomerPortalData,
  getCustomerPortalTransactions,
  getCustomerPortalPDF,
  createCustomerPortalDispute,
};

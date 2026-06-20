// src/controllers/transactionController.js
// HTTP layer for the ledger module.
// Validates request data, delegates to transactionService,
// and returns standardized API responses.

const transactionService = require("../services/transactionService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const prisma = require("../config/prisma");
const { logActivity } = require("../utils/auditLogger");
const PDFDocument = require("pdfkit");

// ─── Validation Helpers ──────────────────────────────────

/**
 * Validate the common fields for credit/debit/payment requests.
 * @param {object} body - Request body
 * @param {string} customerId - From URL params
 * @returns {{ amount: number }} Parsed and validated amount
 */
const validateTransactionInput = (body, customerId) => {
  if (!customerId) {
    throw ApiError.badRequest("Customer ID is required in the URL");
  }

  const { amount } = body;

  if (amount === undefined || amount === null || amount === "") {
    throw ApiError.badRequest("Amount is required", [
      { field: "amount", message: "Amount is required" },
    ]);
  }

  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw ApiError.badRequest("Amount must be a positive number", [
      { field: "amount", message: "Must be greater than 0" },
    ]);
  }

  // Cap at a reasonable max to prevent data entry errors
  if (parsedAmount > 99_99_999) {
    throw ApiError.badRequest("Amount exceeds maximum allowed (₹99,99,999)", [
      { field: "amount", message: "Maximum transaction amount is ₹99,99,999" },
    ]);
  }

  return { amount: parsedAmount };
};

// ─── Add Udhari (Credit) ─────────────────────────────────

/**
 * POST /api/v1/customers/:customerId/transactions/credit
 * Record a new credit (udhari) — customer owes more.
 */
const addCredit = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const { amount } = validateTransactionInput(req.body, customerId);

  const { description, referenceNumber } = req.body;

  const result = await transactionService.addCredit(
    req.shopId,
    customerId,
    {
      amount,
      description: description?.trim() || null,
      referenceNumber: referenceNumber?.trim() || null,
    },
    req.userId || null
  );

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: { name: true }
  });
  const customerName = customer ? customer.name : "Unknown Customer";
  await logActivity(
    req.shopId,
    req.userId,
    "CREATE_TRANSACTION",
    `Recorded credit of ₹${amount} for customer ${customerName}`
  );

  return ApiResponse.created(res, "Udhari recorded successfully", {
    transaction: result.transaction,
    previousBalance: result.previousBalance,
    newBalance: result.newBalance,
  });
});

// ─── Add Payment ─────────────────────────────────────────

/**
 * POST /api/v1/customers/:customerId/transactions/payment
 * Record a payment — customer pays back.
 */
const addPayment = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const { amount } = validateTransactionInput(req.body, customerId);

  const { paymentMethod, description, referenceNumber } = req.body;

  // Validate payment method if provided
  if (paymentMethod && !transactionService.PAYMENT_METHODS.includes(paymentMethod.toUpperCase())) {
    throw ApiError.badRequest(
      `Invalid payment method. Allowed: ${transactionService.PAYMENT_METHODS.join(", ")}`,
      [{ field: "paymentMethod", message: `Must be one of: ${transactionService.PAYMENT_METHODS.join(", ")}` }]
    );
  }

  const result = await transactionService.addPayment(
    req.shopId,
    customerId,
    {
      amount,
      paymentMethod: paymentMethod ? paymentMethod.toUpperCase() : "CASH",
      description: description?.trim() || null,
      referenceNumber: referenceNumber?.trim() || null,
    },
    req.userId || null
  );

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: { name: true }
  });
  const customerName = customer ? customer.name : "Unknown Customer";
  await logActivity(
    req.shopId,
    req.userId,
    "CREATE_TRANSACTION",
    `Recorded payment of ₹${amount} from customer ${customerName}`
  );

  return ApiResponse.created(res, "Payment recorded successfully", {
    transaction: result.transaction,
    previousBalance: result.previousBalance,
    newBalance: result.newBalance,
  });
});

// ─── Add Debit (Adjustment) ──────────────────────────────

/**
 * POST /api/v1/customers/:customerId/transactions/debit
 * Record a debit adjustment — return, discount, or correction.
 */
const addDebit = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const { amount } = validateTransactionInput(req.body, customerId);

  const { description, referenceNumber } = req.body;

  const result = await transactionService.addDebit(
    req.shopId,
    customerId,
    {
      amount,
      description: description?.trim() || null,
      referenceNumber: referenceNumber?.trim() || null,
    },
    req.userId || null
  );

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: { name: true }
  });
  const customerName = customer ? customer.name : "Unknown Customer";
  await logActivity(
    req.shopId,
    req.userId,
    "CREATE_TRANSACTION",
    `Recorded debit adjustment of ₹${amount} for customer ${customerName}`
  );

  return ApiResponse.created(res, "Debit adjustment recorded successfully", {
    transaction: result.transaction,
    previousBalance: result.previousBalance,
    newBalance: result.newBalance,
  });
});

// ─── Customer Transaction History ────────────────────────

/**
 * GET /api/v1/customers/:customerId/transactions
 * List transactions for a specific customer with filters and pagination.
 *
 * Query: page, limit, type (CREDIT|DEBIT|PAYMENT), startDate, endDate, sortOrder
 */
const getCustomerTransactions = catchAsync(async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    throw ApiError.badRequest("Customer ID is required");
  }

  const result = await transactionService.getCustomerTransactions(
    req.shopId,
    customerId,
    req.query
  );

  return ApiResponse.success(
    res,
    "Transaction history retrieved",
    {
      customer: result.customer,
      transactions: result.transactions,
    },
    result.meta
  );
});

// ─── All Shop Transactions ───────────────────────────────

/**
 * GET /api/v1/transactions
 * List all transactions across the shop (global ledger view).
 *
 * Query: page, limit, type, startDate, endDate, search, sortOrder
 */
const getShopTransactions = catchAsync(async (req, res) => {
  const result = await transactionService.getShopTransactions(req.shopId, req.query);

  return ApiResponse.success(
    res,
    "Shop transactions retrieved",
    result.transactions,
    result.meta
  );
});

// ─── Single Transaction ──────────────────────────────────

/**
 * GET /api/v1/transactions/:id
 * Get a single transaction by ID.
 */
const getTransactionById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const transaction = await transactionService.getTransactionById(req.shopId, id);

  return ApiResponse.success(res, "Transaction details retrieved", transaction);
});

// ─── Delete (Reverse) Transaction ────────────────────────

/**
 * DELETE /api/v1/transactions/:id
 * Soft-delete a transaction and reverse its balance effect.
 */
const deleteTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;

  // Retrieve transaction details for logging before deleting
  const transaction = await prisma.transaction.findFirst({
    where: { id, shopId: req.shopId },
    include: { customer: { select: { name: true } } }
  });
  const customerName = transaction?.customer?.name || "Unknown Customer";
  const type = transaction?.type || "TRANSACTION";
  const amount = transaction?.amount || 0;

  const result = await transactionService.deleteTransaction(
    req.shopId,
    id,
    req.userId || null
  );

  await logActivity(
    req.shopId,
    req.userId,
    "REVERSE_TRANSACTION",
    `Reversed transaction of type ${type} worth ₹${amount} for customer ${customerName}`
  );

  return ApiResponse.success(res, "Transaction reversed successfully", {
    deletedTransaction: result.deletedTransaction,
    previousBalance: result.previousBalance,
    newBalance: result.newBalance,
  });
});

// ─── Customer Summary ────────────────────────────────────

/**
 * GET /api/v1/customers/:customerId/summary
 * Get financial summary for a customer.
 */
const getCustomerSummary = catchAsync(async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    throw ApiError.badRequest("Customer ID is required");
  }

  const summary = await transactionService.getCustomerSummary(req.shopId, customerId);

  return ApiResponse.success(res, "Customer summary retrieved", summary);
});

/**
 * GET /api/v1/customers/:customerId/transactions/export-pdf
 * Export customer statement as PDF.
 */
const exportPdf = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const shopId = req.shopId;

  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null },
  });
  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  const transactions = await prisma.transaction.findMany({
    where: { shopId, customerId, deletedAt: null },
    orderBy: { transactionDate: "asc" },
  });

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=statement_${customer.name.replace(/\s+/g, "_")}.pdf`);
  doc.pipe(res);

  // Styling / colors
  const primaryColor = "#10B981"; // Emerald Green
  const textColor = "#1A1A1E";
  const lightGrey = "#F4F4F5";

  // Header
  doc.fillColor(primaryColor).fontSize(20).text("Udhari Ledger Statement", { align: "center" });
  doc.moveDown(0.5);
  doc.fillColor(textColor).fontSize(10).text(`Generated on: ${new Date().toLocaleString("en-IN")}`, { align: "center" });
  doc.moveDown(1.5);

  // Shop details
  doc.fontSize(12).fillColor(textColor).text(`Shop Name: ${req.shop.name}`, { bold: true });
  if (req.shop.phone) doc.text(`Shop Phone: ${req.shop.phone}`);
  doc.moveDown(1);

  // Customer details
  doc.text(`Customer Name: ${customer.name}`, { bold: true });
  doc.text(`Phone: ${customer.phone}`);
  doc.text(`Current Outstanding Balance: INR ${parseFloat(customer.balance).toFixed(2)}`, { bold: true });
  doc.moveDown(1.5);

  // Table header
  doc.fontSize(10).fillColor(primaryColor);
  const startY = doc.y;
  doc.text("Date", 50, startY);
  doc.text("Type", 130, startY);
  doc.text("Amount (INR)", 210, startY);
  doc.text("Balance After (INR)", 300, startY);
  doc.text("Description", 410, startY);
  
  // Underline header
  doc.moveDown(0.2);
  doc.strokeColor(primaryColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Table rows
  doc.fillColor(textColor);
  transactions.forEach((t) => {
    // If running out of page space, add page
    if (doc.y > 700) {
      doc.addPage();
      // Re-draw table header
      doc.fontSize(10).fillColor(primaryColor);
      const newY = doc.y;
      doc.text("Date", 50, newY);
      doc.text("Type", 130, newY);
      doc.text("Amount (INR)", 210, newY);
      doc.text("Balance After (INR)", 300, newY);
      doc.text("Description", 410, newY);
      doc.moveDown(0.2);
      doc.strokeColor(primaryColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);
      doc.fillColor(textColor);
    }

    const rowY = doc.y;
    const dateStr = new Date(t.transactionDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    
    doc.text(dateStr, 50, rowY);
    doc.text(t.type, 130, rowY);
    doc.text(`INR ${parseFloat(t.amount).toFixed(2)}`, 210, rowY);
    doc.text(`INR ${parseFloat(t.balanceAfter).toFixed(2)}`, 300, rowY);
    doc.text(t.description || "-", 410, rowY, { width: 140, height: 20 });
    
    // Draw row separator line
    doc.moveDown(0.8);
    doc.strokeColor(lightGrey).lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.4);
  });

  doc.end();
});

/**
 * GET /api/v1/customers/:customerId/transactions/export-csv
 * Export customer statement as CSV.
 */
const exportCsv = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const shopId = req.shopId;

  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId, deletedAt: null },
  });
  if (!customer) {
    throw ApiError.notFound("Customer not found");
  }

  const transactions = await prisma.transaction.findMany({
    where: { shopId, customerId, deletedAt: null },
    orderBy: { transactionDate: "asc" },
  });

  // Set headers
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=statement_${customer.name.replace(/\s+/g, "_")}.csv`);

  let csvContent = "Date,Type,Amount (INR),Balance After (INR),Description,Reference Number\n";
  for (const t of transactions) {
    const dateStr = new Date(t.transactionDate).toLocaleDateString("en-IN");
    const description = t.description ? `"${t.description.replace(/"/g, '""')}"` : "";
    const refNum = t.referenceNumber ? `"${t.referenceNumber.replace(/"/g, '""')}"` : "";
    csvContent += `${dateStr},${t.type},${parseFloat(t.amount).toFixed(2)},${parseFloat(t.balanceAfter).toFixed(2)},${description},${refNum}\n`;
  }
  return res.status(200).send(csvContent);
});

module.exports = {
  addCredit,
  addPayment,
  addDebit,
  getCustomerTransactions,
  getShopTransactions,
  getTransactionById,
  deleteTransaction,
  getCustomerSummary,
  exportPdf,
  exportCsv,
};

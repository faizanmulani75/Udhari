// src/routes/transactionRoutes.js
// Ledger module routes.
//
// Two route groups:
//   1. Customer-scoped:  /api/v1/customers/:customerId/transactions/*
//   2. Shop-wide:        /api/v1/transactions/*
//
// Both are exported and mounted separately in app.js.

const { Router } = require("express");
const transactionController = require("../controllers/transactionController");

// ─── Customer-scoped transaction routes ──────────────────
// Mounted at: /api/v1/customers/:customerId/transactions
// The :customerId param is inherited via mergeParams.

const customerTransactionRouter = Router({ mergeParams: true });

// List transaction history for a customer
customerTransactionRouter.get("/", transactionController.getCustomerTransactions);

// Export statement PDF and CSV
customerTransactionRouter.get("/export-pdf", transactionController.exportPdf);
customerTransactionRouter.get("/export-csv", transactionController.exportCsv);

// Add udhari (credit)
customerTransactionRouter.post("/credit", transactionController.addCredit);

// Record payment
customerTransactionRouter.post("/payment", transactionController.addPayment);

// Add debit adjustment (return/correction)
customerTransactionRouter.post("/debit", transactionController.addDebit);

// ─── Customer summary route ─────────────────────────────
// Mounted at: /api/v1/customers/:customerId/summary

const customerSummaryRouter = Router({ mergeParams: true });

customerSummaryRouter.get("/", transactionController.getCustomerSummary);

// ─── Shop-wide transaction routes ────────────────────────
// Mounted at: /api/v1/transactions

const shopTransactionRouter = Router();

// List all shop transactions (global ledger)
shopTransactionRouter.get("/", transactionController.getShopTransactions);

// Get a single transaction
shopTransactionRouter.get("/:id", transactionController.getTransactionById);

// Reverse (soft-delete) a transaction
shopTransactionRouter.delete("/:id", transactionController.deleteTransaction);

module.exports = {
  customerTransactionRouter,
  customerSummaryRouter,
  shopTransactionRouter,
};

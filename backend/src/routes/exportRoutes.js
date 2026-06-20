// src/routes/exportRoutes.js
// Routes for CSV/PDF export downloads.

const { Router } = require("express");
const exportController = require("../controllers/exportController");

const router = Router();

// Customer list CSV
router.get("/customers/csv", exportController.exportCustomersCSV);

// Transaction ledger CSV (optional filters: ?customerId=&from=&to=)
router.get("/transactions/csv", exportController.exportTransactionsCSV);

// Customer statement PDF (required: ?customerId=, optional: &from=&to=)
router.get("/transactions/pdf", exportController.exportTransactionsPDF);

module.exports = router;

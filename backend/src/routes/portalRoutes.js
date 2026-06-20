// src/routes/portalRoutes.js
// Public customer portal routes.
// These endpoints do not require authentication or shop headers,
// as they are accessed by scanning a customer-specific QR token.

const express = require("express");
const portalController = require("../controllers/portalController");

const router = express.Router();

// Retrieve customer details and shop configurations
router.get("/:token", portalController.getCustomerPortalData);

// Retrieve statement transaction history
router.get("/:token/transactions", portalController.getCustomerPortalTransactions);

// Download statement as PDF
router.get("/:token/pdf", portalController.getCustomerPortalPDF);

// Dispute a transaction
router.post("/:token/transactions/:transactionId/disputes", portalController.createCustomerPortalDispute);

module.exports = router;


// src/routes/customerRoutes.js
// Customer module routes.
// All routes are prefixed with /api/v1/customers (mounted in the route aggregator).
// Authentication and shop context middleware are applied at the router level.

const { Router } = require("express");
const customerController = require("../controllers/customerController");

const router = Router();

// ── CRUD ─────────────────────────────────────────────────

// List customers (with search, filters, pagination)
router.get("/", customerController.getCustomers);

// Create a new customer
router.post("/", customerController.createCustomer);

// Get a single customer by ID
router.get("/:id", customerController.getCustomerById);

// Update a customer
router.put("/:id", customerController.updateCustomer);

// Soft-delete a customer
router.delete("/:id", customerController.deleteCustomer);

// ── Credit ───────────────────────────────────────────────

// Check credit limit before extending credit
router.get("/:id/credit-check", customerController.checkCreditLimit);

module.exports = router;

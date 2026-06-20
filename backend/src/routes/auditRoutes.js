// src/routes/auditRoutes.js
// Audit logs routes.

const { Router } = require("express");
const auditController = require("../controllers/auditController");

const router = Router();

// Retrieve all audit logs for the shop (Owner only)
router.get("/", auditController.getAuditLogs);

module.exports = router;

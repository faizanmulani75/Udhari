// src/routes/dashboardRoutes.js
// Dashboard reporting routes.
// Scoped to authMiddleware and shopContext.

const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// Fetch all consolidated dashboard details
router.get("/", dashboardController.getDashboardData);

// Fetch summary metrics
router.get("/summary", dashboardController.getSummary);

// Fetch top debtor accounts
router.get("/top-debtors", dashboardController.getTopDebtors);

// Fetch recent shop activity
router.get("/recent-activity", dashboardController.getRecentActivity);

// Fetch analytics charts/trends
router.get("/analytics", dashboardController.getAnalytics);

module.exports = router;

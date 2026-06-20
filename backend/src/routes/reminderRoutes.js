// src/routes/reminderRoutes.js
// Routes for payment reminder management.

const { Router } = require("express");
const reminderController = require("../controllers/reminderController");

const router = Router();

// Send reminder to a specific customer
router.post("/send/:customerId", reminderController.sendReminder);

// Bulk send reminders to all debtors
router.post("/bulk-send", reminderController.sendBulkReminders);

// Get reminder history
router.get("/history", reminderController.getReminderHistory);

module.exports = router;

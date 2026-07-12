// src/controllers/reminderController.js
// Controller for manual reminder management.

const reminderService = require("../services/reminderService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * POST /api/v1/reminders/send/:customerId
 * Send a single reminder to a specific customer.
 */
const sendReminder = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const result = await reminderService.sendSingleReminder(req.shopId, customerId, req.userId);
  return ApiResponse.success(res, "Reminder sent successfully", result);
});

/**
 * GET /api/v1/reminders/history
 * Fetch paginated reminder history.
 */
const getReminderHistory = catchAsync(async (req, res) => {
  const result = await reminderService.getReminderHistory(req.shopId, req.query);
  return ApiResponse.success(res, "Reminder history fetched", result.reminders, result.meta);
});

module.exports = {
  sendReminder,
  getReminderHistory,
};

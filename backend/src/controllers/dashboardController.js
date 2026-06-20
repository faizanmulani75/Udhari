// src/controllers/dashboardController.js
// Controller for the dashboard module.

const dashboardService = require("../services/dashboardService");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/dashboard/summary
 * Fetch outstanding credit balances, advance accounts, and customer counts.
 */
const getSummary = catchAsync(async (req, res) => {
  const data = await dashboardService.getSummary(req.shopId);
  return ApiResponse.success(res, "Dashboard summary retrieved successfully", data);
});

/**
 * GET /api/v1/dashboard/top-debtors
 * Fetch customers with highest outstanding balance.
 */
const getTopDebtors = catchAsync(async (req, res) => {
  const limit = req.query.limit || 5;
  const data = await dashboardService.getTopDebtors(req.shopId, limit);
  return ApiResponse.success(res, "Top debtors retrieved successfully", data);
});

/**
 * GET /api/v1/dashboard/recent-activity
 * Fetch recent credit and payment transactions across all customers.
 */
const getRecentActivity = catchAsync(async (req, res) => {
  const limit = req.query.limit || 10;
  const data = await dashboardService.getRecentActivity(req.shopId, limit);
  return ApiResponse.success(res, "Recent activities retrieved successfully", data);
});

/**
 * GET /api/v1/dashboard
 * Consolidated dashboard endpoint returning summary, debtors, and activity.
 * Minimizes client network requests.
 */
const getDashboardData = catchAsync(async (req, res) => {
  const [summary, topDebtors, recentActivity] = await Promise.all([
    dashboardService.getSummary(req.shopId),
    dashboardService.getTopDebtors(req.shopId, 5),
    dashboardService.getRecentActivity(req.shopId, 10),
  ]);

  return ApiResponse.success(res, "Dashboard loaded successfully", {
    summary,
    topDebtors,
    recentActivity,
  });
});

/**
 * GET /api/v1/dashboard/analytics
 * Fetch visual trends and credit vs payment distributions.
 */
const getAnalytics = catchAsync(async (req, res) => {
  const days = req.query.days || 7;
  const data = await dashboardService.getAnalytics(req.shopId, days);
  return ApiResponse.success(res, "Analytics data loaded successfully", data);
});

module.exports = {
  getSummary,
  getTopDebtors,
  getRecentActivity,
  getDashboardData,
  getAnalytics,
};

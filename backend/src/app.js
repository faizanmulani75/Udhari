// src/app.js
// Express application setup.
// Mounts middleware, routes, and the global error handler.

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Global rate limiting rule: 300 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for Auth/Login: 20 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/auth");
const shopContext = require("./middleware/shopContext");
const requestLogger = require("./middleware/requestLogger");

// Route imports
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const customerRoutes = require("./routes/customerRoutes");
const {
  customerTransactionRouter,
  customerSummaryRouter,
  shopTransactionRouter,
} = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const portalRoutes = require("./routes/portalRoutes");
const aiRoutes = require("./routes/aiRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const staffRoutes = require("./routes/staffRoutes");
const auditRoutes = require("./routes/auditRoutes");
const exportRoutes = require("./routes/exportRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const tagRoutes = require("./routes/tagRoutes");
const noteRoutes = require("./routes/noteRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const sanitizeInput = require("./middleware/sanitizeInput");

const app = express();

// ── Global Middleware ────────────────────────────────────

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(requestLogger);
app.use(globalLimiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

// ── Health Check ─────────────────────────────────────────

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Udhari SaaS API is running",
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ───────────────────────────────────────────

// Auth routes (public for login/verify, protected for profile)
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/auth", authLimiter, authRoutes);

// Shop routes (public for onboarding/creation, protected for updates/CRUD)
app.use("/api/v1/shops", shopRoutes);

// Public Customer Portal routes (authenticated by qrToken)
app.use("/api/v1/portal", portalRoutes);

// AI helpers (protected)
app.use("/api/v1/ai", authMiddleware, aiRoutes);

// Subscription billing management (protected, shop-scoped)
app.use("/api/v1/subscription", authMiddleware, shopContext, subscriptionRoutes);

// Staff management (protected, shop-scoped)
app.use("/api/v1/staff", authMiddleware, shopContext, staffRoutes);

// Audit logs (protected, shop-scoped, owner-only check inside controller)
app.use("/api/v1/audit-logs", authMiddleware, shopContext, auditRoutes);

// CSV/PDF exports (protected, shop-scoped)
app.use("/api/v1/export", authMiddleware, shopContext, exportRoutes);

// Reminder management (protected, shop-scoped)
app.use("/api/v1/reminders", authMiddleware, shopContext, reminderRoutes);

// Customer tags (protected, shop-scoped)
app.use("/api/v1/tags", authMiddleware, shopContext, tagRoutes);

// Transaction notes (protected, shop-scoped)
app.use("/api/v1/notes", authMiddleware, shopContext, noteRoutes);

// In-app notifications (protected, shop-scoped)
app.use("/api/v1/notifications", authMiddleware, shopContext, notificationRoutes);

// Dashboard reports (protected, shop-scoped)
app.use("/api/v1/dashboard", authMiddleware, shopContext, dashboardRoutes);
// Customer CRUD (protected, shop-scoped)
app.use("/api/v1/customers", authMiddleware, shopContext, customerRoutes);


// Customer-scoped transactions (nested under customers, protected, shop-scoped)
app.use(
  "/api/v1/customers/:customerId/transactions",
  authMiddleware,
  shopContext,
  customerTransactionRouter
);

// Customer financial summary (protected, shop-scoped)
app.use(
  "/api/v1/customers/:customerId/summary",
  authMiddleware,
  shopContext,
  customerSummaryRouter
);

// Shop-wide transaction ledger (protected, shop-scoped)
app.use("/api/v1/transactions", authMiddleware, shopContext, shopTransactionRouter);

// ── 404 Handler ──────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler (must be last) ──────────────────

app.use(errorHandler);

module.exports = app;


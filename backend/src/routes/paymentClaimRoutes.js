// src/routes/paymentClaimRoutes.js
// Routes for payment claims verification.
// Mounted at: /api/v1/payment-claims

const express = require("express");
const paymentClaimController = require("../controllers/paymentClaimController");
const authMiddleware = require("../middleware/auth");
const shopContext = require("../middleware/shopContext");

const router = express.Router();

// Apply auth and shop validation to all routes
router.use(authMiddleware);
router.use(shopContext);

// List payment claims
router.get("/", paymentClaimController.getShopClaims);

// Confirm / Reject a claim
router.post("/:id/confirm", paymentClaimController.verifyPaymentClaim);

module.exports = router;

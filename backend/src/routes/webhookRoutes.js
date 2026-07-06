const { Router } = require("express");
const webhookController = require("../controllers/webhookController");

const router = Router();

// Endpoint: POST /api/v1/webhooks/razorpay
router.post("/razorpay", webhookController.handleRazorpayWebhook);

module.exports = router;

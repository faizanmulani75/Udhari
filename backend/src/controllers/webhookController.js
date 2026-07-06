const crypto = require("crypto");
const ApiError = require("../utils/ApiError");
const { activateSubscription } = require("../services/subscriptionService");

/**
 * POST /api/v1/webhooks/razorpay
 * Secure Razorpay Webhook handler to receive event updates (like order.paid)
 * and confirm subscription upgrades.
 */
const handleRazorpayWebhook = async (req, res, next) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
      throw ApiError.badRequest("Webhook signature is missing");
    }

    if (!webhookSecret) {
      console.warn("⚠️ RAZORPAY_WEBHOOK_SECRET is not configured in .env. Webhook signature check is bypassed.");
    } else {
      // Compute the signature hash
      const shasum = crypto.createHmac("sha256", webhookSecret);
      shasum.update(req.rawBody || "");
      const digest = shasum.digest("hex");

      if (digest !== signature) {
        console.error("❌ Razorpay Webhook signature verification failed!");
        throw ApiError.badRequest("Invalid signature");
      }
    }

    // Signature verified successfully
    const payload = req.body;
    console.log(`📥 Received verified Razorpay webhook event: ${payload.event}`);

    // We only care about order.paid
    if (payload.event === "order.paid") {
      const order = payload.payload?.order?.entity;
      if (!order) {
        throw ApiError.badRequest("Missing order payload entity");
      }

      const notes = order.notes || {};
      const { shopId, plan } = notes;

      if (!shopId || !plan) {
        console.warn(`⚠️ Webhook order ${order.id} missing shopId/plan notes. Ignoring.`);
      } else if (plan === "PRO") {
        console.log(`💳 Webhook: Activating PRO plan for shop ${shopId}...`);
        await activateSubscription(shopId, plan);
        console.log(`✨ Webhook: Successfully activated subscription for shop ${shopId}!`);
      } else {
        console.warn(`⚠️ Webhook order ${order.id} has plan ${plan}. Only PRO subscription updates are supported.`);
      }
    }

    // Always respond with 200 OK to Razorpay to prevent retries
    return res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("Error handling Razorpay Webhook:", err);
    next(err);
  }
};

module.exports = {
  handleRazorpayWebhook,
};

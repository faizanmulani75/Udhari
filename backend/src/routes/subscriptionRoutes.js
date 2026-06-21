// src/routes/subscriptionRoutes.js
// Routes for subscription billing management.

const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.get("/", subscriptionController.getSubscription);
router.post("/upgrade", subscriptionController.upgradeSubscription);
router.post("/create-order", subscriptionController.createOrder);
router.post("/verify-payment", subscriptionController.verifyPayment);

module.exports = router;

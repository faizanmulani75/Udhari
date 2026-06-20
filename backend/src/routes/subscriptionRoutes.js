// src/routes/subscriptionRoutes.js
// Routes for subscription billing management.

const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.get("/", subscriptionController.getSubscription);
router.post("/upgrade", subscriptionController.upgradeSubscription);

module.exports = router;

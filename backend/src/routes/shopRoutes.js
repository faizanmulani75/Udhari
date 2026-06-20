// src/routes/shopRoutes.js
// Shop routes for onboarding and tenant management.

const express = require("express");
const shopController = require("../controllers/shopController");
const authMiddleware = require("../middleware/auth");
const shopContext = require("../middleware/shopContext");

const router = express.Router();

// Onboarding route: requires authentication, but shopContext is NOT required yet.
router.post("/", authMiddleware, shopController.createShop);

// Scoped routes: require authentication and a valid shop context.
router.get("/me", authMiddleware, shopContext, shopController.getShop);
router.put("/me", authMiddleware, shopContext, shopController.updateShop);
router.delete("/me", authMiddleware, shopContext, shopController.deleteShop);

module.exports = router;

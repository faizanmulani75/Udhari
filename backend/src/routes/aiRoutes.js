// src/routes/aiRoutes.js
// Routes for AI helper utilities.

const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const authMiddleware = require("../middleware/auth");
const shopContext = require("../middleware/shopContext");

router.post("/parse-transaction", authMiddleware, shopContext, aiController.parseTransaction);
router.post("/voice-entry", authMiddleware, shopContext, aiController.voiceEntry);

module.exports = router;

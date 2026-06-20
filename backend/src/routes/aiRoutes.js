// src/routes/aiRoutes.js
// Routes for AI helper utilities.

const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const authMiddleware = require("../middleware/auth");

router.post("/parse-transaction", authMiddleware, aiController.parseTransaction);

module.exports = router;

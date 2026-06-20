// src/routes/tagRoutes.js
// Routes for customer tag management.

const { Router } = require("express");
const tagController = require("../controllers/tagController");

const router = Router();

// CRUD for tags
router.get("/", tagController.getTags);
router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

// Assign tags to customer
router.post("/assign", tagController.assignTags);

// Get tags for a customer
router.get("/customer/:customerId", tagController.getCustomerTags);

module.exports = router;

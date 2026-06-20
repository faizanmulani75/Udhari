// src/routes/noteRoutes.js
// Routes for transaction notes/disputes.

const { Router } = require("express");
const noteController = require("../controllers/noteController");

const router = Router();

// Get notes for a transaction
router.get("/transaction/:transactionId", noteController.getTransactionNotes);

// Add a note to a transaction
router.post("/transaction/:transactionId", noteController.addTransactionNote);

// Delete a note
router.delete("/:noteId", noteController.deleteNote);

module.exports = router;

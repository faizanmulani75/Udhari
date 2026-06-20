// src/controllers/noteController.js
// Controller for transaction notes/dispute threads.

const prisma = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/notes/transaction/:transactionId
 * Get all notes for a transaction.
 */
const getTransactionNotes = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  // Verify transaction belongs to shop
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, shopId: req.shopId },
  });
  if (!transaction) throw ApiError.notFound("Transaction not found");

  const notes = await prisma.transactionNote.findMany({
    where: { transactionId },
    orderBy: { createdAt: "asc" },
  });

  return ApiResponse.success(res, "Notes fetched", notes);
});

/**
 * POST /api/v1/notes/transaction/:transactionId
 * Add a note to a transaction.
 */
const addTransactionNote = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const { content, isDispute } = req.body;

  if (!content || content.trim().length === 0) {
    throw ApiError.badRequest("Note content is required");
  }
  if (content.trim().length > 2000) {
    throw ApiError.badRequest("Note must be 2000 characters or less");
  }

  // Verify transaction belongs to shop
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, shopId: req.shopId },
  });
  if (!transaction) throw ApiError.notFound("Transaction not found");

  const note = await prisma.transactionNote.create({
    data: {
      transactionId,
      shopId: req.shopId,
      userId: req.userId || null,
      content: content.trim(),
      isDispute: isDispute || false,
    },
  });

  return ApiResponse.created(res, "Note added", note);
});

/**
 * DELETE /api/v1/notes/:noteId
 * Delete a note.
 */
const deleteNote = catchAsync(async (req, res) => {
  const { noteId } = req.params;

  const note = await prisma.transactionNote.findFirst({
    where: { id: noteId, shopId: req.shopId },
  });
  if (!note) throw ApiError.notFound("Note not found");

  await prisma.transactionNote.delete({ where: { id: noteId } });
  return ApiResponse.success(res, "Note deleted");
});

module.exports = {
  getTransactionNotes,
  addTransactionNote,
  deleteNote,
};

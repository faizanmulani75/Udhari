// src/controllers/tagController.js
// Controller for customer tag management.

const prisma = require("../config/prisma");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

/**
 * GET /api/v1/tags
 * List all tags for the shop.
 */
const getTags = catchAsync(async (req, res) => {
  const tags = await prisma.tag.findMany({
    where: { shopId: req.shopId },
    orderBy: { name: "asc" },
    include: {
      _count: { select: { customers: true } },
    },
  });

  const result = tags.map((t) => ({
    id: t.id,
    name: t.name,
    color: t.color,
    customerCount: t._count.customers,
    createdAt: t.createdAt,
  }));

  return ApiResponse.success(res, "Tags fetched", result);
});

/**
 * POST /api/v1/tags
 * Create a new tag.
 */
const createTag = catchAsync(async (req, res) => {
  const { name, color } = req.body;

  if (!name || name.trim().length === 0) {
    throw ApiError.badRequest("Tag name is required");
  }
  if (name.trim().length > 50) {
    throw ApiError.badRequest("Tag name must be 50 characters or less");
  }

  // Check for duplicate
  const existing = await prisma.tag.findFirst({
    where: { shopId: req.shopId, name: name.trim() },
  });
  if (existing) {
    throw ApiError.conflict(`Tag "${name.trim()}" already exists`);
  }

  const tag = await prisma.tag.create({
    data: {
      shopId: req.shopId,
      name: name.trim(),
      color: color || "#6366F1",
    },
  });

  return ApiResponse.created(res, "Tag created", tag);
});

/**
 * PUT /api/v1/tags/:id
 * Update a tag.
 */
const updateTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;

  const tag = await prisma.tag.findFirst({ where: { id, shopId: req.shopId } });
  if (!tag) throw ApiError.notFound("Tag not found");

  const updated = await prisma.tag.update({
    where: { id },
    data: {
      ...(name && { name: name.trim() }),
      ...(color && { color }),
    },
  });

  return ApiResponse.success(res, "Tag updated", updated);
});

/**
 * DELETE /api/v1/tags/:id
 * Delete a tag (cascade removes customer associations).
 */
const deleteTag = catchAsync(async (req, res) => {
  const { id } = req.params;

  const tag = await prisma.tag.findFirst({ where: { id, shopId: req.shopId } });
  if (!tag) throw ApiError.notFound("Tag not found");

  await prisma.tag.delete({ where: { id } });
  return ApiResponse.success(res, "Tag deleted");
});

/**
 * POST /api/v1/tags/assign
 * Assign tags to a customer. Body: { customerId, tagIds: [] }
 */
const assignTags = catchAsync(async (req, res) => {
  const { customerId, tagIds } = req.body;

  if (!customerId || !Array.isArray(tagIds)) {
    throw ApiError.badRequest("customerId and tagIds[] are required");
  }

  // Verify customer belongs to shop
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, shopId: req.shopId, deletedAt: null },
  });
  if (!customer) throw ApiError.notFound("Customer not found");

  // Remove existing tags and re-assign
  await prisma.customerTag.deleteMany({ where: { customerId } });

  if (tagIds.length > 0) {
    await prisma.customerTag.createMany({
      data: tagIds.map((tagId) => ({
        customerId,
        tagId,
      })),
      skipDuplicates: true,
    });
  }

  // Return updated customer with tags
  const updatedTags = await prisma.customerTag.findMany({
    where: { customerId },
    include: { tag: true },
  });

  return ApiResponse.success(res, "Tags assigned", updatedTags.map((ct) => ct.tag));
});

/**
 * GET /api/v1/tags/customer/:customerId
 * Get tags for a specific customer.
 */
const getCustomerTags = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const tags = await prisma.customerTag.findMany({
    where: { customerId },
    include: { tag: true },
  });

  return ApiResponse.success(res, "Customer tags fetched", tags.map((ct) => ct.tag));
});

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  assignTags,
  getCustomerTags,
};

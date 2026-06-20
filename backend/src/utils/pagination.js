// src/utils/pagination.js
// Pagination helper — extracts page/limit from query params and returns
// Prisma-compatible skip/take values + a metadata object for the response.

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Parse pagination params from the request query string.
 *
 * @param {object} query - Express req.query
 * @returns {{ skip: number, take: number, page: number, limit: number }}
 */
const parsePagination = (query) => {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (isNaN(page) || page < 1) page = DEFAULT_PAGE;
  if (isNaN(limit) || limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const skip = (page - 1) * limit;

  return { skip, take: limit, page, limit };
};

/**
 * Build pagination metadata for the response.
 *
 * @param {number} totalCount - Total number of records matching the query
 * @param {number} page       - Current page number
 * @param {number} limit      - Records per page
 * @returns {object} Pagination metadata
 */
const buildPaginationMeta = (totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    currentPage: page,
    perPage: limit,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { parsePagination, buildPaginationMeta };

// src/utils/ApiResponse.js
// Standardized API response wrapper.
// Ensures every endpoint returns a consistent JSON shape.

class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message    - Human-readable message
   * @param {*}      data       - Response payload
   * @param {object} meta       - Optional metadata (pagination, etc.)
   */
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }

  /**
   * Send this response through an Express res object.
   * @param {import('express').Response} res
   */
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
      ...(this.meta && { meta: this.meta }),
    });
  }

  // ── Convenience factories ──

  static success(res, message, data, meta) {
    return new ApiResponse(200, message, data, meta).send(res);
  }

  static created(res, message, data) {
    return new ApiResponse(201, message, data).send(res);
  }

  static noContent(res) {
    return res.status(204).end();
  }
}

module.exports = ApiResponse;

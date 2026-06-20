// src/services/auditService.js
// API client for fetching audit logs.

import api from "./api";

/**
 * Fetch all audit logs for the active shop.
 * @returns {Promise<object>}
 */
export const getAuditLogs = async () => {
  const response = await api.get("/audit-logs");
  return response.data;
};

// src/store/customerStore.js
// Zustand store for customer state.
// Manages: customer listings, search, pagination, detail screens, and CRUD state.

import { create } from "zustand";
import * as customerService from "../services/customerService";

const useCustomerStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────

  customers: [],
  selectedCustomer: null,
  meta: {
    page: 1,
    limit: 15,
    totalPages: 1,
    totalCount: 0,
  },
  isLoading: false,
  isActionLoading: false,
  error: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Fetch a list of customers.
   * Can append results for infinite scrolling/pagination.
   *
   * @param {object} params - Query params (page, limit, search, isActive)
   * @param {boolean} append - If true, appends results to list
   */
  fetchCustomers: async (params = {}, append = false) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customerService.getCustomers(params);
      const fetchedCustomers = response.data;
      const { meta } = response;

      set((state) => ({
        customers: append ? [...state.customers, ...fetchedCustomers] : fetchedCustomers,
        meta: meta || state.meta,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load customers",
      });
      return false;
    }
  },

  /**
   * Fetch single customer details.
   *
   * @param {string} id - Customer UUID
   */
  fetchCustomerById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customerService.getCustomerById(id);
      set({
        selectedCustomer: response.data,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to fetch customer details",
      });
      return false;
    }
  },

  /**
   * Add a new customer.
   *
   * @param {object} customerData - Customer form fields
   */
  createCustomer: async (customerData) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await customerService.createCustomer(customerData);
      const newCustomer = response.data;

      // Add to local list at the beginning
      set((state) => ({
        customers: [newCustomer, ...state.customers],
        isActionLoading: false,
      }));
      return newCustomer;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to create customer",
      });
      return null;
    }
  },

  /**
   * Update an existing customer's details.
   *
   * @param {string} id - Customer UUID
   * @param {object} customerData - Fields to update
   */
  updateCustomer: async (id, customerData) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await customerService.updateCustomer(id, customerData);
      const updatedCustomer = response.data;

      set((state) => ({
        // Update in list
        customers: state.customers.map((c) => (c.id === id ? updatedCustomer : c)),
        // Update selected detail view if matching
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === id
            ? { ...state.selectedCustomer, ...updatedCustomer }
            : state.selectedCustomer,
        isActionLoading: false,
      }));
      return updatedCustomer;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to update customer",
      });
      return null;
    }
  },

  /**
   * Soft-delete a customer.
   * Removes from current list view.
   *
   * @param {string} id - Customer UUID
   */
  deleteCustomer: async (id) => {
    set({ isActionLoading: true, error: null });

    try {
      await customerService.deleteCustomer(id);

      set((state) => ({
        // Filter out from active lists
        customers: state.customers.filter((c) => c.id !== id),
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === id ? null : state.selectedCustomer,
        isActionLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to delete customer",
      });
      return false;
    }
  },

  /**
   * Clear active selected customer details.
   */
  clearSelectedCustomer: () => set({ selectedCustomer: null }),

  /**
   * Clear error state.
   */
  clearError: () => set({ error: null }),
}));

export default useCustomerStore;

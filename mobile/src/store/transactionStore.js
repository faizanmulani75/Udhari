// src/store/transactionStore.js
// Zustand store for ledger transactions and global shop summaries.

import { create } from "zustand";
import * as transactionService from "../services/transactionService";
import useCustomerStore from "./customerStore";

const useTransactionStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────

  transactions: [],
  meta: {
    page: 1,
    limit: 15,
    totalPages: 1,
    totalCount: 0,
  },
  customerSummary: null,
  isLoading: false,
  isActionLoading: false,
  error: null,

  // ── Actions ────────────────────────────────────────────

  /**
   * Fetch paginated transactions for a specific customer.
   */
  fetchCustomerTransactions: async (customerId, params = {}, append = false) => {
    set({ isLoading: true, error: null });

    try {
      const response = await transactionService.getCustomerTransactions(customerId, params);
      const transactions = response.data?.transactions || [];
      const meta = response.meta;

      set((state) => ({
        transactions: append ? [...state.transactions, ...transactions] : transactions,
        meta: meta || state.meta,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load customer transactions",
      });
      return false;
    }
  },

  /**
   * Fetch global shop-wide transactions (global ledger).
   */
  fetchShopTransactions: async (params = {}, append = false) => {
    set({ isLoading: true, error: null });

    try {
      const response = await transactionService.getShopTransactions(params);
      const transactions = response.data || [];
      const meta = response.meta;

      set((state) => ({
        transactions: append ? [...state.transactions, ...transactions] : transactions,
        meta: meta || state.meta,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load shop ledger",
      });
      return false;
    }
  },

  /**
   * Fetch customer financial summary (credit limit, outstanding, total payments).
   */
  fetchCustomerSummary: async (customerId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await transactionService.getCustomerSummary(customerId);
      set({
        customerSummary: response.data.summary,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load customer summary",
      });
      return false;
    }
  },

  /**
   * Record credit transaction.
   * Updates local customer balance in customerStore atomically on success.
   */
  addCredit: async (customerId, txnData) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await transactionService.addCredit(customerId, txnData);
      const { transaction, newBalance } = response.data;

      // Update local transaction list if matches
      set((state) => ({
        transactions: [transaction, ...state.transactions],
        isActionLoading: false,
      }));

      // Atomically update balance in customerStore
      useCustomerStore.setState((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, balance: newBalance } : c
        ),
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === customerId
            ? { ...state.selectedCustomer, balance: newBalance }
            : state.selectedCustomer,
      }));

      return response.data;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to add credit transaction",
      });
      return null;
    }
  },

  /**
   * Record payment transaction.
   * Updates local customer balance in customerStore atomically on success.
   */
  addPayment: async (customerId, txnData) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await transactionService.addPayment(customerId, txnData);
      const { transaction, newBalance } = response.data;

      set((state) => ({
        transactions: [transaction, ...state.transactions],
        isActionLoading: false,
      }));

      useCustomerStore.setState((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, balance: newBalance } : c
        ),
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === customerId
            ? { ...state.selectedCustomer, balance: newBalance }
            : state.selectedCustomer,
      }));

      return response.data;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to record payment",
      });
      return null;
    }
  },

  /**
   * Record debit transaction.
   * Updates local customer balance in customerStore atomically on success.
   */
  addDebit: async (customerId, txnData) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await transactionService.addDebit(customerId, txnData);
      const { transaction, newBalance } = response.data;

      set((state) => ({
        transactions: [transaction, ...state.transactions],
        isActionLoading: false,
      }));

      useCustomerStore.setState((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, balance: newBalance } : c
        ),
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === customerId
            ? { ...state.selectedCustomer, balance: newBalance }
            : state.selectedCustomer,
      }));

      return response.data;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to record debit adjustment",
      });
      return null;
    }
  },

  /**
   * Delete/Reverse a transaction.
   * Preserves audit log, updates state, and adjusts balance.
   */
  deleteTransaction: async (id) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await transactionService.deleteTransaction(id);
      const { deletedTransaction, newBalance } = response.data;
      const { customerId } = deletedTransaction;

      // Filter out from active transactions list
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        isActionLoading: false,
      }));

      // Adjust customer balance inside customerStore
      useCustomerStore.setState((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, balance: newBalance } : c
        ),
        selectedCustomer:
          state.selectedCustomer && state.selectedCustomer.id === customerId
            ? { ...state.selectedCustomer, balance: newBalance }
            : state.selectedCustomer,
      }));

      return true;
    } catch (error) {
      set({
        isActionLoading: false,
        error: error.message || "Failed to reverse transaction",
      });
      return false;
    }
  },

  /**
   * Reset store transaction lists.
   */
  clearTransactions: () => set({ transactions: [], customerSummary: null }),

  /**
   * Clear error state.
   */
  clearError: () => set({ error: null }),
}));

export default useTransactionStore;

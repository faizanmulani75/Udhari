// src/components/TransactionList.js
// Renders the transaction history table with mobile-responsive card fallback and pagination controls.

import React, { useState } from "react";
import { formatCurrency, formatDate } from "../utils/format";
import { createPortalDispute } from "../services/api";

export default function TransactionList({
  transactions,
  meta,
  currencyCode = "INR",
  onPageChange,
  isLoading,
  token,
}) {
  const [disputeTxnId, setDisputeTxnId] = useState(null);
  const [disputeContent, setDisputeContent] = useState("");
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [successTxnId, setSuccessTxnId] = useState(null);
  const [disputeError, setDisputeError] = useState(null);

  const handleRaiseDispute = async (e) => {
    e.preventDefault();
    if (!disputeContent.trim()) return;
    setIsSubmittingDispute(true);
    setDisputeError(null);
    try {
      await createPortalDispute(token, disputeTxnId, disputeContent);
      setSuccessTxnId(disputeTxnId);
      setDisputeTxnId(null);
      setDisputeContent("");
      // Clear success state after 4 seconds
      setTimeout(() => {
        setSuccessTxnId(null);
      }, 4000);
    } catch (err) {
      console.error(err);
      setDisputeError(err.response?.data?.message || "Failed to raise dispute. Please try again.");
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400 font-semibold">Updating statement ledger...</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-[#1A1A1E]/80 border border-white/5 rounded-3xl p-12 text-center shadow-xl">
        <span className="text-5xl block mb-4">📑</span>
        <h3 className="text-lg font-bold text-white mb-2">No Transactions Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          No ledger entries have been recorded for this statement account yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Ledger Card / Container */}
      <div className="bg-[#1A1A1E]/80 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-white tracking-tight">
            Transaction History
          </h3>
          <span className="text-xs font-bold text-slate-400 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            {meta.totalCount} {meta.totalCount === 1 ? "Entry" : "Entries"}
          </span>
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/40 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Transaction Type</th>
                <th className="py-4 px-6">Details / Description</th>
                <th className="py-4 px-6">Reference No</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Balance After</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {transactions.map((txn) => {
                const isCredit = txn.type === "CREDIT";
                const amountColor = isCredit ? "text-rose-400" : "text-emerald-400";
                const amountPrefix = isCredit ? "+" : "-";

                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-white/2 transition-colors duration-150 text-slate-200"
                  >
                    <td className="py-4 px-6 font-medium">
                      {formatDate(txn.transactionDate, true)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isCredit
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {txn.type}
                      </span>
                      {txn.paymentMethod && (
                        <span className="text-xs text-slate-400 ml-2 font-medium">
                          ({txn.paymentMethod})
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 max-w-[240px] truncate text-slate-300 font-medium">
                      {txn.description || <span className="text-slate-550 font-normal italic">—</span>}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {txn.referenceNumber || <span className="text-slate-550 font-normal italic">—</span>}
                    </td>
                    <td className={`py-4 px-6 text-right font-black ${amountColor}`}>
                      {amountPrefix} {formatCurrency(parseFloat(txn.amount), currencyCode)}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-white">
                      {formatCurrency(parseFloat(txn.balanceAfter), currencyCode)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {successTxnId === txn.id ? (
                        <span className="text-xs font-bold text-rose-400 animate-pulse bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
                          Disputed
                        </span>
                      ) : (
                        <button
                          onClick={() => { setDisputeTxnId(txn.id); setDisputeError(null); }}
                          className="text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 px-3 py-1.5 rounded-xl transition-all duration-200"
                        >
                          Dispute
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="block md:hidden divide-y divide-white/5">
          {transactions.map((txn) => {
            const isCredit = txn.type === "CREDIT";
            const amountColor = isCredit ? "text-rose-400" : "text-emerald-400";
            const amountPrefix = isCredit ? "+" : "-";

            return (
              <div key={txn.id} className="p-5 flex flex-col gap-3 text-slate-300">
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isCredit
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {txn.type}
                    </span>
                    {txn.paymentMethod && (
                      <span className="text-xs text-slate-400 ml-2 font-semibold">
                        ({txn.paymentMethod})
                      </span>
                    )}
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {formatDate(txn.transactionDate, true)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-base font-black ${amountColor}`}>
                      {amountPrefix} {formatCurrency(parseFloat(txn.amount), currencyCode)}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Bal: {formatCurrency(parseFloat(txn.balanceAfter), currencyCode)}
                    </p>
                  </div>
                </div>

                {txn.description && (
                  <p className="text-sm text-slate-350 bg-slate-900/30 border border-white/2 rounded-xl px-3 py-2 leading-relaxed">
                    {txn.description}
                  </p>
                )}

                {txn.referenceNumber && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[10px] uppercase tracking-wider">Ref No:</span>
                    <span className="font-mono">{txn.referenceNumber}</span>
                  </div>
                )}

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                  {successTxnId === txn.id ? (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                      Disputed Raised Successfully
                    </span>
                  ) : (
                    <button
                      onClick={() => { setDisputeTxnId(txn.id); setDisputeError(null); }}
                      className="text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 px-3 py-1 rounded-xl transition-all duration-200"
                    >
                      ⚠️ Dispute Transaction
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dispute Modal Dialog */}
      {disputeTxnId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121214]/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1E] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-extrabold text-white mb-2">Dispute Transaction</h3>
            <p className="text-xs text-slate-400 mb-4">
              Specify why you are disputing this transaction. The shop owner will be notified to review the ledger.
            </p>
            
            <form onSubmit={handleRaiseDispute}>
              <textarea
                required
                rows={4}
                value={disputeContent}
                onChange={(e) => setDisputeContent(e.target.value)}
                placeholder="Enter the reason for dispute (e.g., Incorrect amount, Goods not received, Paid twice)..."
                className="w-full px-4 py-3 bg-[#121214] border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:border-rose-500/50 focus:outline-none transition-colors duration-200 resize-none"
              />

              {disputeError && (
                <p className="text-xs text-rose-400 mt-2 font-medium">{disputeError}</p>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => { setDisputeTxnId(null); setDisputeContent(""); }}
                  disabled={isSubmittingDispute}
                  className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-bold rounded-2xl transition-all duration-200 active:scale-98 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDispute || !disputeContent.trim()}
                  className="flex-1 py-3 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 text-rose-400 text-sm font-bold rounded-2xl transition-all duration-200 active:scale-98 disabled:opacity-50"
                >
                  {isSubmittingDispute ? "Submitting..." : "Submit Dispute"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => onPageChange(meta.page - 1)}
            disabled={meta.page <= 1 || isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A1A1E]/80 border border-white/5 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
          >
            ← Previous
          </button>
          <span className="text-sm font-semibold text-slate-400">
            Page <strong className="text-white font-extrabold">{meta.page}</strong> of{" "}
            <strong className="text-white font-extrabold">{meta.totalPages}</strong>
          </span>
          <button
            onClick={() => onPageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages || isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A1A1E]/80 border border-white/5 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

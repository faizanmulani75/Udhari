// src/app/customer/[token]/page.js
// Public customer portal page.
// Renders the customer statement, balance card, and paginated transaction history.
// Features: date filtering, transaction type filtering, PDF download.

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getPortalData,
  getPortalTransactions,
  submitPaymentClaim,
  getCustomerClaims,
} from "../../../services/api";
import ShopHeader from "../../../components/ShopHeader";
import BalanceCard from "../../../components/BalanceCard";
import TransactionList from "../../../components/TransactionList";
import DateFilter from "../../../components/DateFilter";
import DownloadStatement from "../../../components/DownloadStatement";

export default function CustomerPortalPage() {
  const { token } = useParams();

  // ── States ──────────────────────────────────────────────
  const [data, setData] = useState(null); // { customer, shop }
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 15, totalPages: 1, totalCount: 0 });

  const [isLoading, setIsLoading] = useState(true);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [dateFilter, setDateFilter] = useState({});
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Payment claims states
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimsList, setClaimsList] = useState([]);
  const [claimAmount, setClaimAmount] = useState("");
  const [claimTxnRef, setClaimTxnRef] = useState("");
  const [isClaimSubmitting, setIsClaimSubmitting] = useState(false);
  const [claimError, setClaimError] = useState(null);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      loadPortalData();
      loadClaims();
    }
  }, [token]);

  const loadPortalData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Load profile & shop data
      const dataRes = await getPortalData(token);
      setData(dataRes.data);
      if (dataRes.data?.customer) {
        setClaimAmount(parseFloat(dataRes.data.customer.balance).toFixed(2));
      }

      // 2. Load initial transactions
      const txnRes = await getPortalTransactions(token, { page: 1, limit: 15 });
      setTransactions(txnRes.data);
      if (txnRes.meta) {
        setMeta(txnRes.meta);
      }
    } catch (err) {
      console.error("Failed to load portal data:", err.message);
      setError(
        err.response?.data?.message ||
        "Failed to load statement. This link may be invalid or expired. Please contact the shopkeeper for a fresh link."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadClaims = async () => {
    try {
      const claimsRes = await getCustomerClaims(token);
      setClaimsList(claimsRes.data || []);
    } catch (err) {
      console.warn("Failed to load claims:", err.message);
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!claimAmount || parseFloat(claimAmount) <= 0) {
      setClaimError("Please enter a valid paid amount.");
      return;
    }
    if (!claimTxnRef.trim()) {
      setClaimError("Please enter the transaction reference / UTR number.");
      return;
    }

    setIsClaimSubmitting(true);
    setClaimError(null);
    setClaimSuccess(false);

    try {
      await submitPaymentClaim(token, parseFloat(claimAmount), claimTxnRef.trim());
      setClaimSuccess(true);
      setClaimTxnRef("");
      loadClaims();
      // Auto close modal after a short delay
      setTimeout(() => {
        setClaimModalOpen(false);
        setClaimSuccess(false);
      }, 2000);
    } catch (err) {
      setClaimError(err.response?.data?.message || err.message || "Failed to submit claim. Try again.");
    } finally {
      setIsClaimSubmitting(false);
    }
  };

  const loadTransactions = async (params = {}) => {
    setIsTxnLoading(true);
    try {
      const txnRes = await getPortalTransactions(token, {
        page: params.page || 1,
        limit: 15,
        ...dateFilter,
        ...(typeFilter !== "ALL" && { type: typeFilter }),
      });
      setTransactions(txnRes.data);
      if (txnRes.meta) {
        setMeta(txnRes.meta);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err.message);
    } finally {
      setIsTxnLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    await loadTransactions({ page: newPage });
  };

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    // Reload with filter applied
    setIsTxnLoading(true);
    getPortalTransactions(token, { page: 1, limit: 15, ...filter, ...(typeFilter !== "ALL" && { type: typeFilter }) })
      .then((txnRes) => {
        setTransactions(txnRes.data);
        if (txnRes.meta) setMeta(txnRes.meta);
      })
      .catch((err) => console.error("Filter error:", err))
      .finally(() => setIsTxnLoading(false));
  };

  const handleClearDateFilter = () => {
    setDateFilter({});
    loadTransactions({ page: 1 });
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setIsTxnLoading(true);
    getPortalTransactions(token, { page: 1, limit: 15, ...dateFilter, ...(type !== "ALL" && { type }) })
      .then((txnRes) => {
        setTransactions(txnRes.data);
        if (txnRes.meta) setMeta(txnRes.meta);
      })
      .catch((err) => console.error("Filter error:", err))
      .finally(() => setIsTxnLoading(false));
  };

  // ── Render States ──

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121214] text-slate-100 flex flex-col justify-center items-center gap-6 p-6">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-white animate-pulse">Loading Statement Ledger</h2>
          <p className="text-sm text-slate-400 font-semibold">Retrieving secure record...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121214] text-slate-100 flex items-center justify-center p-6">
        <div className="bg-[#1A1A1E]/80 border border-red-500/20 max-w-md w-full rounded-3xl p-8 text-center shadow-2xl backdrop-blur-md">
          <span className="text-6xl block mb-6">⚠️</span>
          <h2 className="text-xl font-black text-rose-400 tracking-tight mb-3">
            Access Error
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {error}
          </p>
          <button
            onClick={loadPortalData}
            className="w-full py-3.5 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-bold rounded-2xl active:scale-95 transition-all duration-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { customer, shop } = data || {};
  const currencyCode = shop?.currency || "INR";

  const typeOptions = [
    { label: "All", value: "ALL" },
    { label: "Credit", value: "CREDIT" },
    { label: "Payment", value: "PAYMENT" },
    { label: "Debit", value: "DEBIT" },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "REJECTED":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      default:
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-slate-100 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-6 md:gap-8 relative z-10">
        <ShopHeader shop={shop} />

        <BalanceCard
          customer={customer}
          shop={shop}
          onOpenClaim={() => setClaimModalOpen(true)}
        />

        {/* ── Recent Claims List ── */}
        {claimsList.length > 0 && (
          <div className="bg-[#1A1A1E]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
              Recent Verification Claims
            </h3>
            <div className="flex flex-col gap-3">
              {claimsList.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">INR {parseFloat(claim.amount).toFixed(2)}</p>
                    <p className="text-xs text-slate-500">Ref: {claim.txnRef}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadgeClass(claim.status)}`}>
                    {claim.status === "PENDING_SHOP_CONFIRM" ? "Pending Confirm" : claim.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Filter Bar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleTypeFilter(opt.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 border ${
                  typeFilter === opt.value
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : "bg-[#1A1A1E]/85 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <DateFilter onFilter={handleDateFilter} onClear={handleClearDateFilter} />
            <DownloadStatement token={token} />
          </div>
        </div>

        {/* Ledger Transaction Statement Table */}
        <TransactionList
          transactions={transactions}
          meta={meta}
          currencyCode={currencyCode}
          onPageChange={handlePageChange}
          isLoading={isTxnLoading}
          token={token}
        />

        <div className="text-center py-6 border-t border-white/5 text-xs text-slate-500 font-semibold tracking-wider uppercase mt-4">
          Powered by Udhari SaaS Ledger Books
        </div>
      </div>

      {/* ── Payment Claim Modal ── */}
      {claimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1A1A1E] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Claim Payment Verification</h3>
            <p className="text-xs text-slate-400 mb-6">
              Settle outstanding balances by confirming your transaction reference code with the merchant.
            </p>

            <form onSubmit={handleClaimSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Paid Amount (INR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-[#121214] border border-white/10 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Amount"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  UPI Transaction Ref / UTR / Reference Number
                </label>
                <input
                  type="text"
                  className="w-full bg-[#121214] border border-white/10 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="UTR/Ref Code (from GPay/PhonePe)"
                  value={claimTxnRef}
                  onChange={(e) => setClaimTxnRef(e.target.value)}
                />
              </div>

              {claimError && (
                <p className="text-xs font-semibold text-rose-400">{claimError}</p>
              )}

              {claimSuccess && (
                <p className="text-xs font-semibold text-emerald-400">
                  🎉 Payment claim submitted successfully! Verification pending.
                </p>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setClaimModalOpen(false)}
                  className="flex-1 py-3.5 bg-transparent border border-white/10 hover:bg-white/5 active:scale-95 text-slate-300 font-bold rounded-2xl transition-all duration-150"
                  disabled={isClaimSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black rounded-2xl transition-all duration-150 flex items-center justify-center gap-2"
                  disabled={isClaimSubmitting}
                >
                  {isClaimSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span>Submit Claim</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

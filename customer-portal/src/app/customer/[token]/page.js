// src/app/customer/[token]/page.js
// Public customer portal page.
// Renders the customer statement, balance card, and paginated transaction history.
// Features: date filtering, transaction type filtering, PDF download.

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPortalData, getPortalTransactions } from "../../../services/api";
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

  useEffect(() => {
    if (token) {
      loadPortalData();
    }
  }, [token]);

  const loadPortalData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Load profile & shop data
      const dataRes = await getPortalData(token);
      setData(dataRes.data);

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
        {/* Skeleton animation loaders */}
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

  return (
    <div className="min-h-screen bg-[#121214] text-slate-100 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background ambient orbs */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-6 md:gap-8 relative z-10">
        {/* Shop Name & Logo Bar */}
        <ShopHeader shop={shop} />

        {/* Balance Status Overview Card */}
        <BalanceCard customer={customer} shop={shop} />

        {/* ── Filter Bar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Type filter pills */}
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

          {/* Date filter + Download */}
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

        {/* Footer brand info */}
        <div className="text-center py-6 border-t border-white/5 text-xs text-slate-500 font-semibold tracking-wider uppercase mt-4">
          Powered by Udhari SaaS Ledger Books
        </div>
      </div>
    </div>
  );
}

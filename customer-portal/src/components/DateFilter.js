// src/components/DateFilter.js
// Date range filter component for filtering transactions.

"use client";

import React, { useState } from "react";

export default function DateFilter({ onFilter, onClear }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    if (from || to) {
      onFilter({ from, to });
    }
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    onClear();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1E]/85 border border-white/10 hover:border-emerald-500/30 rounded-xl text-sm text-slate-300 font-semibold transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {from || to ? "Filtered" : "Date Range"}
        {(from || to) && (
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-[#1A1A1E] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl min-w-[280px]">
          <h4 className="text-sm font-bold text-white mb-4 tracking-tight">Filter by Date</h4>
          
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 block">From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1 block">To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#121214] border border-white/10 rounded-xl text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { handleClear(); setIsOpen(false); }}
              className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-bold rounded-xl transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => { handleApply(); setIsOpen(false); }}
              className="flex-1 py-2.5 bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-400 text-sm font-bold rounded-xl transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

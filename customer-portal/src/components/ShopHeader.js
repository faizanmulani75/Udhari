// src/components/ShopHeader.js
// Shop identity component displaying business name, logo placeholder, contact details, and print statement button.

"use client";

import React from "react";

export default function ShopHeader({ shop }) {
  if (!shop) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#1A1A1E]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-300 hover:border-white/10">
      <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Udhari Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight leading-none mb-2">
            {shop.name}
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Smart credit statements ledger
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <a
          href={`tel:${shop.phone}`}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 active:scale-95 transition-all duration-200"
        >
          <span>📞</span> Call Shop
        </a>
        {shop.email && (
          <a
            href={`mailto:${shop.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 active:scale-95 transition-all duration-200"
          >
            <span>✉️</span> Email
          </a>
        )}
        <button
          onClick={handlePrint}
          className="print-hide flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-600/30 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span>🖨️</span> Print Statement
        </button>
      </div>
    </div>
  );
}

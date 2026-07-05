// src/components/BalanceCard.js
// Large dashboard card highlighting the customer's outstanding balance or advance surplus.

import React from "react";
import { formatCurrency } from "../utils/format";

export default function BalanceCard({ customer, shop, onOpenClaim }) {
  if (!customer) return null;

  const balance = parseFloat(customer.balance || 0);
  const isNegative = balance < 0;
  const currencyCode = shop?.currency || "INR";

  // Determine status configurations
  const balanceColor = isNegative ? "text-emerald-400" : balance > 0 ? "text-rose-400" : "text-slate-300";
  const balanceBg = isNegative ? "from-emerald-500/10 to-transparent" : balance > 0 ? "from-rose-500/10 to-transparent" : "from-slate-500/10 to-transparent";
  const borderGlow = isNegative ? "hover:border-emerald-500/20" : balance > 0 ? "hover:border-rose-500/20" : "hover:border-slate-500/20";
  const labelText = isNegative ? "Advance Payment Surplus" : balance > 0 ? "Total Outstanding Balance" : "Ledger Fully Settled";

  const upiUrl = shop?.upiId && balance > 0
    ? `upi://pay?pa=${shop.upiId}&pn=${encodeURIComponent(shop.name || "Udhari Merchant")}&am=${balance}&cu=INR&tn=${encodeURIComponent(`Udhari Payment to ${shop.name}`)}`
    : "";

  const qrImageUrl = upiUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiUrl)}`
    : "";

  return (
    <div className={`bg-gradient-to-b ${balanceBg} bg-[#1A1A1E]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl transition-all duration-300 ${borderGlow}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Statement For
          </p>
          <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-1">
            {customer.name}
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Customer Account: {customer.phone}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {qrImageUrl && (
            <div className="bg-white p-2 rounded-2xl flex flex-col items-center justify-center shadow-lg w-[140px] h-[140px] shrink-0 print:hidden">
              <img src={qrImageUrl} alt="Payment QR" className="w-[120px] h-[120px] rounded-lg" />
              <span className="text-[9px] text-slate-600 font-bold tracking-tight mt-0.5">Scan to Pay UPI</span>
            </div>
          )}

          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              {labelText}
            </span>
            <span className={`text-4xl md:text-5xl font-black tracking-tight ${balanceColor} drop-shadow`}>
              {formatCurrency(Math.abs(balance), currencyCode)}
            </span>
            <p className="text-xs text-slate-500 mt-2 max-w-[250px] md:max-w-none">
              {balance > 0
                ? qrImageUrl
                  ? "Scan the QR code to pay instantly via UPI."
                  : "Please settle this outstanding balance directly at the shop."
                : balance < 0
                ? "You have advance credit available for your next purchase."
                : "No outstanding payments due at this moment."}
            </p>
          </div>
        </div>
      </div>

      {/* Pay & Claims Actions Row */}
      {upiUrl && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5 print:hidden">
          <a
            href={upiUrl}
            className="flex-1 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold rounded-2xl text-center shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>📱 Pay via UPI App</span>
          </a>
          <button
            onClick={onOpenClaim}
            className="flex-1 px-6 py-4 bg-slate-900/60 hover:bg-slate-800 active:scale-95 text-emerald-400 font-extrabold rounded-2xl text-center border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✅ Maine Payment Kar Diya</span>
          </button>
        </div>
      )}
    </div>
  );
}

// src/app/refund/page.js
import React from "react";
import Link from "next/link";

export default function RefundPage() {
  const sections = [
    {
      heading: "1. Subscription Cancellations",
      body: "You can cancel your subscription plan at any time. Upon cancellation, your access will remain active until the end of your current prepaid billing cycle, and no further renewals will be charged."
    },
    {
      heading: "2. Refund Eligibility",
      body: "Subscription fees are non-refundable. Since we offer instant activation of cloud services and limits, we do not issue refunds or pro-rated credits for partial subscription periods."
    },
    {
      heading: "3. Exceptions",
      body: "If you were charged twice for a single transaction due to a payment gateway error, please contact our support team with transaction details, and we will initiate a charge reversal immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121214] text-slate-100 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold mb-8">
          <span>←</span> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-8">
          Last Updated: July 6, 2026
        </p>

        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-[#1A1A1E]/80 border border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-white mb-2">{sec.heading}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-slate-500 font-semibold">
          © 2026 Udhari SaaS. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

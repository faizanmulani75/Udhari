// src/app/terms/page.js
import React from "react";
import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      heading: "1. Acceptance of Terms",
      body: "By downloading, installing, or using the Udhari application or visiting the Udhari website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
    },
    {
      heading: "2. Description of Service",
      body: "Udhari is a digital ledger and bookkeeping SaaS tool that allows merchants to record credit (Udhaar) and payment history of their customers, send automated reminder notifications, and manage balances. All calculations and records are entered directly by the merchants."
    },
    {
      heading: "3. User Registration & Security",
      body: "To use the service, you must register and secure your account using an OTP. You are entirely responsible for maintaining the confidentiality of your credentials and all activities logged under your shop profile."
    },
    {
      heading: "4. Permitted Use & Restrictions",
      body: "You agree to record only authentic business transactions. Any use of the application for illegal activities, fraud, or money laundering is strictly prohibited and will lead to immediate account termination."
    },
    {
      heading: "5. Limitation of Liability",
      body: "Udhari is provided 'as is' without warranties of any kind. We are not liable for any data loss, financial losses, transaction errors, or disputes arising between shopkeepers and customers."
    },
    {
      heading: "6. Changes to Terms",
      body: "We reserve the right to modify these terms at any time. Continued use of the application after changes constitutes your acceptance of the new terms."
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
          Terms & Conditions
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

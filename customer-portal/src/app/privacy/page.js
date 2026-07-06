// src/app/privacy/page.js
import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      heading: "1. Information We Collect",
      body: "We collect user registration details (name, email, phone number) and business settings. We also store ledger transaction data (amounts, items, customer details) entered by you to sync with your database."
    },
    {
      heading: "2. How We Use Data",
      body: "Your data is used solely to provide and improve the bookkeeping ledger services, sync transactions offline, send reminders to your customers, and secure your account with OTP logins."
    },
    {
      heading: "3. Data Security",
      body: "We implement industry-standard encryption and security protocols (hosted on Supabase secure cloud databases) to safeguard your data from unauthorized access, loss, or alteration."
    },
    {
      heading: "4. Push Notifications",
      body: "The app registers a push token with Expo and FCM servers to deliver real-time notifications about customer payment claims and system updates. You can toggle this permission in your device settings."
    },
    {
      heading: "5. Third-Party Sharing",
      body: "We do not sell, rent, or trade your personal or business ledger details with any third-party marketing companies."
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
          Privacy Policy
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

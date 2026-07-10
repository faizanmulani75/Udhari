"use client";

// src/app/page.js
// Home landing page for the public Udhari Customer Portal & SaaS Product.

import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showIosNotice, setShowIosNotice] = useState(false);

  const features = [
    {
      title: "🎙️ AI Voice Entries",
      description: "Record your credits and payments in mixed Hinglish, Hindi, or English. Speak to add items instantly."
    },
    {
      title: "📴 100% Offline Bookkeeping",
      description: "Keep recording transactions offline. They are safely cached and auto-synced the moment connection is restored."
    },
    {
      title: "🔔 Real-time Push Alerts",
      description: "Get push notification alerts on your device the moment a customer submits a UPI payment claim."
    },
    {
      title: "🧾 Easy Portal Access",
      description: "Customers scan a counter QR code to view statements, balance history, and claim online payments instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121214] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient glow orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto z-10">
        {/* Logo Icon */}
        <div className="w-20 h-20 mb-6 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/5 animate-pulse">
          <span className="text-4xl">📚</span>
        </div>

        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
          Udhari SaaS Ledger
        </h1>
        <p className="text-base md:text-lg text-slate-400 font-medium mb-10 max-w-2xl leading-relaxed">
          Modern credit bookkeeping and automated debt-collection SaaS for small businesses and freelancers. Streamline your ledgers, receive payment claims, and track account logs effortlessly.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-md justify-center">
          <button
            onClick={() => {
              setShowIosNotice(false);
              setShowDownloadModal(true);
            }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-extrabold px-6 py-4 rounded-2xl shadow-xl shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📥</span> Download App
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full max-w-3xl mb-12">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-[#1A1A1E]/60 border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-colors">
              <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Platform Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="bg-[#1A1A1E] border border-white/10 rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <span className="text-4xl mb-4 block">📱</span>
            <h3 className="text-xl font-bold text-white mb-2">Download Udhari Ledger</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Select your platform to install the Udhari app on your device.
            </p>

            <div className="flex flex-col gap-3">
              {/* Android Download */}
              <a
                href="/app-release.apk"
                download
                onClick={() => setShowDownloadModal(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>🤖</span> Android App (APK)
              </a>

              {/* iOS Download */}
              <button
                onClick={() => setShowIosNotice(true)}
                className="bg-[#24242A] hover:bg-[#2C2C34] text-white border border-white/10 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>🍎</span> Apple iOS App
              </button>
            </div>

            {showIosNotice && (
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl leading-relaxed text-left">
                ⚠️ The iOS app is currently in Apple App Store review. Please contact the administrator for TestFlight beta access, or download the Android build.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#17171A]/40 backdrop-blur-md py-10 z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
            © 2026 Udhari SaaS Ledger Books
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refunds & Cancellations</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

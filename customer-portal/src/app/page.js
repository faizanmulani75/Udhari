// src/app/page.js
// Home landing page for the public Udhari Customer Portal.

import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121214] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient glow orbs */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto z-10">
        <div className="w-20 h-20 mb-8 animate-bounce">
          <img src="/logo.png" alt="Udhari Logo" className="w-full h-full object-contain" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Udhari Ledger Portal
        </h1>
        
        <p className="text-base text-slate-400 font-semibold mb-8 leading-relaxed">
          Welcome to the Udhari statements viewer. Scan the QR code provided by your shopkeeper to view your real-time balance, payments history, and statement log.
        </p>

        <div className="bg-[#1A1A1E]/85 border border-white/5 rounded-2xl p-5 w-full flex items-center gap-4 text-left">
          <span className="text-2xl">📱</span>
          <div>
            <h4 className="text-sm font-extrabold text-white">No App Install Needed</h4>
            <p className="text-xs text-slate-400 mt-1">
              Access your ledger instantly by scanning the QR code at your shop counter.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/5 text-xs text-slate-500 font-semibold tracking-wider uppercase z-10">
        Powered by Udhari SaaS Ledger Books
      </footer>
    </div>
  );
}

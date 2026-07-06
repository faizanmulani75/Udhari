// src/app/contact/page.js
import React from "react";
import Link from "next/link";

export default function ContactPage() {
  const sections = [
    {
      heading: "Business Legal Entity Name",
      body: "Udhari SaaS (Udharitracker)"
    },
    {
      heading: "Registered Office Address",
      body: "Paudgaon , Tal. Mulshi , Dist. Pune , Maharashtra , 412108"
    },
    {
      heading: "Email Support",
      body: "faizanmulani1810@gmail.com"
    },
    {
      heading: "Phone Helpline",
      body: "+91 95295 17475"
    },
    {
      heading: "Support Operating Hours",
      body: "Monday to Saturday (10:00 AM to 6:00 PM IST)"
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
          Contact Us
        </h1>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-8">
          Last Updated: July 6, 2026
        </p>

        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-[#1A1A1E]/80 border border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-400 mb-1">{sec.heading}</h3>
              <p className="text-base font-extrabold text-white leading-relaxed">{sec.body}</p>
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

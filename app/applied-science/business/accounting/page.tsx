"use client";
import Link from "next/link";
import LedgerBackground from "./LedgerBackground";
import BalanceSheetLab from "./BalanceSheetLab";
import { 
  Calculator, FileSpreadsheet, Scale, ShieldCheck, 
  ArrowRight, PieChart, Landmark 
} from "lucide-react";

export default function AccountingPage() {
  const branches = [
    { title: "Financial Accounting", icon: FileSpreadsheet, desc: "Reporting financial information to external parties (Investors, Creditors)." },
    { title: "Managerial Accounting", icon: PieChart, desc: "Measurement and analysis for internal management decision-making." },
    { title: "Auditing", icon: ShieldCheck, desc: "Independent examination of financial information to ensure accuracy." },
    { title: "Tax Accounting", icon: Landmark, desc: "Compliance with tax laws and strategic planning." }
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <LedgerBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="mb-12 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/business" className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors">
              <Calculator className="text-emerald-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Business // Language
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            ACCOUN<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">TING</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
            The process of recording, summarizing, analyzing, and reporting financial transactions. It provides the quantitative truth upon which business decisions are made.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: BRANCHES */}
          <div className="lg:col-span-7 space-y-8">
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Core Disciplines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((b) => (
                  <div key={b.title} className="p-6 bg-slate-900/60 border border-white/5 hover:border-emerald-500/50 rounded-xl transition-all group hover:-translate-y-1">
                    <b.icon className="text-slate-500 group-hover:text-emerald-400 transition-colors mb-4" size={24} />
                    <h4 className="text-lg font-bold text-white mb-2">{b.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
              <h4 className="text-sm font-bold text-white uppercase mb-2">Double-Entry Bookkeeping</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The foundation of modern accounting. Every financial transaction has equal and opposite effects in at least two different accounts. 
                <span className="text-emerald-400 block mt-2 font-mono">Debits must always equal Credits.</span>
              </p>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE LAB */}
          <div className="lg:col-span-5 space-y-6">
            <BalanceSheetLab />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">GAAP</span>
                <p className="text-[9px] text-slate-400 mt-1">Generally Accepted Accounting Principles</p>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">IFRS</span>
                <p className="text-[9px] text-slate-400 mt-1">International Financial Reporting Standards</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
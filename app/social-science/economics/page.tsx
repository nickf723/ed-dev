"use client";
import Link from "next/link";
import MarketBackground from "@/app/social-science/economics/MarketBackground";
import SupplyDemand from "@/app/social-science/economics/SupplyDemand";
import { 
  ArrowLeft, Coins, TrendingUp, Globe, Scale, 
  Briefcase, BarChart, RefreshCcw
} from "lucide-react";

export default function EconomicsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden selection:bg-emerald-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <MarketBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/social-science" className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Social Science // Economics
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                    <Coins size={40} className="text-emerald-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl font-serif">
                        ECONOMICS
                    </h1>
                    <p className="text-emerald-500/60 text-lg font-light tracking-wide italic">
                        The study of how people choose to use resources.
                    </p>
                 </div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: MACRO & MICRO */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* MICROECONOMICS */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 rounded-xl hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
                    
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white">Microeconomics</h2>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        The study of individual agents (people, households, firms). It focuses on decisions, incentives, and the allocation of resources.
                    </p>
                    <div className="flex gap-2">
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-emerald-300/80 border border-white/5">Incentives</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-emerald-300/80 border border-white/5">Utility</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-emerald-300/80 border border-white/5">Game Theory</span>
                    </div>
                </div>

                {/* MACROECONOMICS */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-8 rounded-xl hover:border-blue-500/50 transition-colors group relative overflow-hidden">
                     <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />

                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Macroeconomics</h2>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        The study of the economy as a whole. It looks at aggregate phenomena like growth, inflation, and unemployment.
                    </p>
                    <div className="flex gap-2">
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-blue-300/80 border border-white/5">GDP</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-blue-300/80 border border-white/5">Inflation</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-xs text-blue-300/80 border border-white/5">Interest Rates</span>
                    </div>
                </div>

                {/* SCARCITY CARD */}
                <div className="bg-gradient-to-r from-amber-900/20 to-slate-900 border border-amber-500/20 rounded-xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-amber-900/20 rounded-lg">
                        <Scale className="text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-100 mb-1">The Core Problem: Scarcity</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            We have unlimited wants but limited resources. Economics is the science of making choices under these constraints. Every choice has an <strong>Opportunity Cost</strong> (the value of the next best alternative foregone).
                        </p>
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE WIDGET */}
            <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                
                {/* WIDGET */}
                <SupplyDemand />

                {/* INVISIBLE HAND */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 w-full group hover:bg-slate-800 transition-colors cursor-default">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <RefreshCcw size={18} className="text-slate-400 group-hover:rotate-180 transition-transform duration-700" /> The Invisible Hand
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Adam Smith's metaphor describing how individual self-interest creates unintended social benefits. By pursuing their own gain, people frequently promote that of the society more effectively than when they really intend to promote it.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}
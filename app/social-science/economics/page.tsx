"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import MarketDynamicsBackground from "./MarketDynamicsBackground";
import SupplyDemand from "./SupplyDemand";
import { 
  Coins, TrendingUp, Globe, Scale, 
  Briefcase, BarChart, RefreshCcw, LayoutGrid, ChevronRight
} from "lucide-react";

export default function EconomicsPage() {
  const categories = [
    {
      title: "Micro-Economics",
      icon: Briefcase,
      color: "text-emerald-400",
      links: ["Consumer Theory", "Firm Dynamics", "Game Theory", "Market Failure"]
    },
    {
      title: "Macro-Economics",
      icon: Globe,
      color: "text-blue-400",
      links: ["GDP & Growth", "Inflation Control", "Monetary Policy", "Global Trade"]
    },
    {
      title: "Applied Social Science",
      icon: Scale,
      color: "text-amber-400",
      links: ["Behavioral Finance", "Developmental Econ", "Public Policy", "Econometrics"]
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-200 selection:bg-emerald-500/30">
      <MarketDynamicsBackground />
      
      {/* Overlay Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="relative z-10 container mx-auto px-6 py-12">


        {/* Economics Hero Replacement */}
        <div className="relative z-20 pt-12 pb-8 px-6 border-b border-emerald-500/20 bg-slate-950/50 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">System.Terminal // v2.0</span>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter italic">ECONOMICS</h1>
            </div>
            <div className="flex gap-8 border-l border-white/10 pl-8">
            <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Market Sentiment</div>
                <div className="text-xl font-mono text-emerald-400">+12.4%</div>
            </div>
            <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Scarcity Index</div>
                <div className="text-xl font-mono text-amber-500">Critical</div>
            </div>
            </div>
        </div>
        </div>

        {/* --- NAVIGATION CONSOLE --- */}
        <section className="mt-12 mb-20">
          <div className="flex items-center gap-3 mb-6 opacity-60">
            <LayoutGrid size={18} />
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em]">Subdomain Router</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className={cat.color} size={20} />
                  <h3 className="font-bold text-white tracking-tight">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.links.map(link => (
                    <li key={link}>
                      <Link href={`/social-science/economics/${link.toLowerCase().replace(/ /g, '-')}`} 
                            className="group flex items-center justify-between text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                        {link}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- INTERACTIVE LABS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Visual: Supply & Demand Lab */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Equilibrium Lab</h2>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] text-emerald-400 font-bold uppercase">Active_Model</div>
              </div>
              <SupplyDemand />
            </div>
          </div>

          {/* Theoretical Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-black border border-slate-800 group hover:border-emerald-500/50 transition-colors cursor-default">
              <RefreshCcw size={32} className="text-emerald-500 mb-4 group-hover:rotate-180 transition-transform duration-1000" />
              <h3 className="text-xl font-bold text-white mb-2">The Invisible Hand</h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "By pursuing his own interest he frequently promotes that of the society more effectually than when he really intends to promote it."
              </p>
              <div className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">— Adam Smith (1776)</div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-900/20 to-stone-900 border border-amber-900/30">
               <Scale className="text-amber-500 mb-4" />
               <h3 className="text-lg font-bold text-amber-100 mb-1">Opportunity Cost</h3>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Every choice entails the sacrifice of the next best alternative. In social studies, this is the fundamental engine of human behavior.
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
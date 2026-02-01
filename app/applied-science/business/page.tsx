"use client";
import Link from "next/link";
import GlobalTradeBackground from "./GlobalTradeBackground";
import GrowthSimulator from "./GrowthSimulator";
import { 
  Briefcase, TrendingUp, Users, PieChart, 
  Globe, Building2, Target, ArrowRight 
} from "lucide-react";

export default function BusinessPage() {
  const sectors = [
    { 
      title: "Finance", 
      icon: TrendingUp, 
      color: "text-emerald-400", 
      desc: "The language of business. Managing assets, risk, and capital markets.",
      href: "/applied-science/business/finance"
    },
    { 
      title: "Marketing", 
      icon: Target, 
      color: "text-rose-400", 
      desc: "Understanding consumer needs and communicating value propositions.",
      href: "/applied-science/business/marketing"
    },
    { 
      title: "Management", 
      icon: Users, 
      color: "text-blue-400", 
      desc: "Leading organizations, strategy, and human resources.",
      href: "/applied-science/business/management" 
    },
    { 
      title: "Operations", 
      icon: Building2, 
      color: "text-amber-400", 
      desc: "The engine of the firm. Supply chain, logistics, and efficiency.",
      href: "/applied-science/business/operations" 
    },
    {
        title: "Accounting", 
        icon: PieChart, 
        color: "text-violet-400", 
        desc: "Tracking financial performance and ensuring regulatory compliance.",
        href: "/applied-science/business/accounting"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      <GlobalTradeBackground />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* HEADER */}
        <header className="mb-16 border-b border-emerald-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
              <Briefcase className="text-emerald-400" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
              Applied Science // Commerce
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            BUSINESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ADMIN</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light border-l-2 border-emerald-500/30 pl-6">
            The study of organizational management, markets, and value creation. Turning resources into goods and services to serve societal needs.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: SECTORS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {sectors.map((s) => (
                <Link key={s.title} href={`/applied-science/business/${s.title.toLowerCase()}`} className="group relative p-6 bg-slate-900/60 border border-white/5 hover:border-emerald-500/50 rounded-xl transition-all hover:translate-x-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-black/40 border border-white/5 ${s.color} group-hover:scale-110 transition-transform`}>
                        <s.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-xl">{s.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-slate-600 group-hover:text-emerald-400 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Core Concept: The Triple Bottom Line */}
            <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl">
              <h4 className="text-sm font-bold text-white uppercase mb-3 flex items-center gap-2">
                <Globe size={16} className="text-emerald-400" /> Modern Philosophy
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Contemporary business moves beyond profit maximization to the <strong>Triple Bottom Line</strong>: focusing on <span className="text-emerald-300">Profit</span>, <span className="text-emerald-300">People</span>, and <span className="text-emerald-300">Planet</span>.
              </p>
            </div>
          </div>

          {/* RIGHT: STRATEGY LAB */}
          <div className="lg:col-span-5 space-y-6">
            {/* The Simulation Widget */}
            <GrowthSimulator />

            {/* KPI Dashboard (Static Visual) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Global GDP</span>
                <div className="text-lg font-mono text-white mt-1">$105 Trillion</div>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Startups/Year</span>
                <div className="text-lg font-mono text-emerald-400 mt-1">305 Million</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
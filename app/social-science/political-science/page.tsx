"use client";
import Link from "next/link";
import HexMapBackground from "./HexMapBackground";
import ParliamentWidget from "./ParliamentWidget";
import { Gavel, Globe, Scale, Users, ShieldAlert, ChevronRight, Landmark } from "lucide-react";

export default function PoliticalSciencePage() {
  const categories = [
    { title: "Political Theory", icon: Scale, color: "text-amber-400", links: ["Justice & Rights", "Social Contract", "Modern Ideologies"] },
    { title: "Comparative Systems", icon: Users, color: "text-blue-400", links: ["Democracy vs. Autocracy", "Regime Change", "Voting Systems"] },
    { title: "Global Relations", icon: Globe, color: "text-emerald-400", links: ["Geopolitics", "Diplomacy", "International Law"] },
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] text-slate-200 overflow-hidden selection:bg-amber-500/30">
      <HexMapBackground /> {/* Abstract Geopolitical Grid */}
      
      {/* 1. HERO HUD REPLACEMENT */}
      {/* Political Science Hero HUD */}
      <div className="relative z-20 pt-16 pb-12 px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-amber-500/80 uppercase">
                Governance.Root // Session_Active
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              POLITICAL <br /> <span className="text-amber-500 italic">SCIENCE</span>
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 border-l border-white/10 pl-8 h-fit self-end">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-[9px] text-slate-500 uppercase font-bold">Policy Consensus</div>
              <div className="text-xl font-mono text-white">42%</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-[9px] text-slate-500 uppercase font-bold">Geopolitical Risk</div>
              <div className="text-xl font-mono text-rose-500">Elevated</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* --- DOMAIN INDEX --- */}
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((cat) => (
            <div key={cat.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className={cat.color} size={20} />
                <h3 className="font-bold text-white uppercase tracking-tighter italic">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.links.map(link => (
                  <li key={link}>
                    <Link href={`/social-science/political-science/${link.toLowerCase().replace(/ /g, '-')}`} 
                          className="group flex items-center justify-between text-xs text-slate-400 hover:text-amber-400 transition-colors">
                      {link}
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
          {/* INTERACTIVE LAB: THE PARLIAMENT SIMULATOR */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">The Assembly Lab</h2>
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] text-amber-500 font-bold uppercase">Proportional_Sim</div>
            </div>
            <ParliamentWidget /> {/* Visualizes how seat distribution changes based on vote share */}
          </div>

          {/* THEORETICAL SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-black border border-slate-800 hover:border-amber-500/50 transition-colors group">
              <Landmark size={32} className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Machiavelli's Realism</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                "It is much safer to be feared than loved, if one of the two must be lacking."
              </p>
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">— Niccolò Machiavelli (1513)</div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-900/20 to-slate-950 border border-rose-900/30">
              <ShieldAlert className="text-rose-500 mb-4" />
              <h3 className="text-lg font-bold text-rose-100 mb-2 italic">Institutional Decay</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The process by which political institutions lose their effectiveness and legitimacy over time, often leading to systemic crisis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
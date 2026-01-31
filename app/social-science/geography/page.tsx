"use client";
import Link from "next/link";
import GlobeBackground from "./GlobeBackground";
import PopulationPyramid from "./PopulationPyramid"; // New interactive widget
import { 
  Map, Globe, Users, Building2, 
  Flag, Factory, ChevronRight, Compass
} from "lucide-react";

export default function HumanGeographyPage() {
  const routes = [
    { label: "Population Dynamics", icon: Users, color: "text-blue-400" },
    { label: "Urban Settlements", icon: Building2, color: "text-amber-400" },
    { label: "Cultural Landscapes", icon: Globe, color: "text-emerald-400" },
    { label: "Geopolitics & Borders", icon: Flag, color: "text-red-400" },
    { label: "Economic Space", icon: Factory, color: "text-purple-400" }
  ];

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden selection:bg-sky-500/30">
      <GlobeBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">

        {/* Human Geography Hero Replacement */}
        <div className="relative z-20 pt-16 pb-12 px-6 overflow-hidden">
          {/* Decorative Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-sky-500/30 animate-scan shadow-[0_0_15px_sky-500]" />
          
          <div className="max-w-4xl">
            <div className="inline-block px-2 py-1 bg-sky-500 text-slate-950 text-[10px] font-black uppercase mb-4">
              Satellite Feed // Active
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              HUMAN <br />
              <span className="text-transparent border-text-sky-500" style={{ WebkitTextStroke: '1px rgba(14, 165, 233, 0.5)' }}>GEOGRAPHY</span>
            </h1>
            <p className="mt-6 text-sky-200/60 max-w-xl font-medium leading-relaxed">
              Mapping the spatial distribution of human civilization and the environmental feedback loops that define our places.
            </p>
          </div>
        </div>

        {/* --- NAV SYSTEM --- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-2 border-t border-b border-white/10 bg-white/5 backdrop-blur-md">
            {routes.map((route) => (
                <Link key={route.label} href={`/social-science/geography/${route.label.toLowerCase().replace(/ /g, '-')}`}
                      className="p-6 border-x border-white/5 hover:bg-white/5 transition-all group">
                    <route.icon className={`${route.color} mb-3 group-hover:scale-110 transition-transform`} size={20} />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white">{route.label}</h3>
                </Link>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
            {/* INTERACTIVE LAB: THE POPULATION PYRAMID */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-sky-500/20 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Demographic Lab</h2>
                    <div className="px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-full text-[10px] text-sky-400 font-bold">LIVE_DATA_VIS</div>
                </div>
                <PopulationPyramid /> {/* Interactive Profile Visualizer */}
            </div>

            {/* SIDEBAR: CORE THEMES */}
            <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-3xl bg-black border border-slate-800 hover:border-sky-500/50 transition-colors group">
                    <Compass size={32} className="text-sky-500 mb-4 group-hover:rotate-45 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">The Five Themes</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        The foundation of geographic education: **Location**, **Place**, **Region**, **Movement**, and **Human-Environment Interaction**.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Space", "Place", "Scale", "Mobility"].map(tag => (
                            <span key={tag} className="text-[9px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-900/20 to-slate-950 border border-sky-900/30">
                    <h3 className="text-lg font-bold text-sky-100 mb-2 italic">Possibilism vs. Determinism</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        A core debate: Does the environment set limits on human social development (**Determinism**), or do we adapt and adjust to our surroundings through culture and technology (**Possibilism**)?
                    </p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
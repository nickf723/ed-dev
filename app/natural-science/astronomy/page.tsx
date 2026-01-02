"use client";
import Link from "next/link";
import AstroBackground from "@/app/natural-science/astronomy/AstroBackground";
import StarForge from "@/app/natural-science/astronomy/StarForge";
import { 
  ArrowLeft, Telescope, Globe, Orbit, 
  Atom, Rocket, Star, ArrowUpRight, Activity
} from "lucide-react";

// --- CONFIG: DOMAINS ---
const DOMAINS = [
  {
    id: "cosmology", title: "Cosmology", icon: Atom,
    desc: "The study of the origin, evolution, and fate of the Universe itself. Big Bang to Heat Death.",
    color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10"
  },
  {
    id: "astrophysics", title: "Astrophysics", icon: Star,
    desc: "The physics of celestial bodies. Stellar fusion, black holes, and neutron stars.",
    color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10"
  },
  {
    id: "planetary", title: "Planetary Science", icon: Globe,
    desc: "The study of planets, moons, and planetary systems (including our own).",
    color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10"
  },
  {
    id: "exoplanets", title: "Exoplanets", icon: Orbit,
    desc: "The search for worlds orbiting other stars. The hunt for Earth 2.0.",
    color: "text-teal-400", border: "border-teal-500/20", bg: "bg-teal-500/10"
  },
  {
    id: "observation", title: "Observational", icon: Telescope,
    desc: "Collecting data via telescopes. Radio, Infrared, Optical, and X-Ray astronomy.",
    color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10"
  }
];

export default function AstronomyPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-300 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <AstroBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science" className="flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Formal Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-slate-900 border border-purple-500/50 rounded">
                    <Telescope size={18} className="text-purple-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    ASTRONOMY
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Looking Up
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Final Frontier</h2>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-mono">
                                Astronomy is the oldest natural science. It is the study of everything that exists beyond Earth's atmosphere. From the fusion cores of stars to the event horizons of black holes, it is the physics of the infinite.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Globe size={14} className="text-blue-400" />
                                    <span className="text-xs font-mono">Matter</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Orbit size={14} className="text-purple-400" />
                                    <span className="text-xs font-mono">Gravity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of spiral galaxy structure]


                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DOMAINS.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/formal-science/astronomy/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-[#0f172a]/40 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-[#0f172a]/80
                                    ${d.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${d.bg}`}>
                                            <d.icon className={d.color} size={18} />
                                        </div>
                                        <h3 className="font-bold text-white text-sm font-sans">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <StarForge />

                    {/* H-R DIAGRAM CARD */}
                    <div className="bg-[#0f172a]/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Activity size={18} className="text-purple-500" /> The H-R Diagram
                        </h3>
                         

[Image of Hertzsprung-Russell diagram]

                        <p className="text-xs text-slate-400 leading-relaxed mb-3 mt-3">
                            The Hertzsprung-Russell diagram is the periodic table of stars. It plots Luminosity vs Temperature. Most stars (like our Sun) sit on the "Main Sequence," burning hydrogen into helium.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
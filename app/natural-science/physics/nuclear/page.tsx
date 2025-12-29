"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import ReactorBackground from "@/app/natural-science/physics/nuclear/ReactorBackground";
import { ArrowLeft, Radiation, Zap, CircleDot, AlertTriangle, Layers } from "lucide-react";
import { useState } from "react";

// --- PARTICLE DATA ---
const standardModel = [
  { id: "u", symbol: "u", name: "Up Quark", type: "Quark", charge: "+2/3", mass: "2.2 MeV", color: "bg-purple-500" },
  { id: "d", symbol: "d", name: "Down Quark", type: "Quark", charge: "-1/3", mass: "4.7 MeV", color: "bg-purple-500" },
  { id: "e", symbol: "e⁻", name: "Electron", type: "Lepton", charge: "-1", mass: "0.511 MeV", color: "bg-emerald-500" },
  { id: "ve", symbol: "νe", name: "e-Neutrino", type: "Lepton", charge: "0", mass: "<1 eV", color: "bg-emerald-500" },
  { id: "g", symbol: "g", name: "Gluon", type: "Boson", charge: "0", mass: "0", color: "bg-rose-500" },
  { id: "y", symbol: "γ", name: "Photon", type: "Boson", charge: "0", mass: "0", color: "bg-rose-500" },
];

export default function NuclearPage() {
  const [activeParticle, setActiveParticle] = useState(standardModel[0]);

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-hidden selection:bg-yellow-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <ReactorBackground />
      
      {/* VIGNETTE & SCANLINES */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 border-b-4 border-yellow-500 pb-6 bg-black/40 backdrop-blur-sm p-6 rounded-t-xl">
             <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs font-bold font-mono text-yellow-500 hover:text-yellow-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> PHYSICS_ENGINE // SECTOR_06
                 </Link>
                 <div className="flex items-center gap-4">
                     <Radiation size={48} className="text-yellow-500 animate-[spin_10s_linear_infinite]" />
                     <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter shadow-yellow-500 drop-shadow-sm">
                        NUCLEAR
                     </h1>
                 </div>
             </div>
             <div className="hidden md:block text-right font-mono text-yellow-500/60 text-xs">
                 <div className="border border-yellow-500/30 px-3 py-1 rounded mb-2 inline-block">
                     CAUTION: RADIOACTIVE AREA
                 </div>
                 <div>BACKGROUND: {`< 0.15 μSv/h`}</div>
                 <div>CORE STATUS: STABLE</div>
             </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CONCEPTS */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1: FISSION */}
                <div className="bg-neutral-900/80 border border-yellow-500/20 p-6 rounded-xl hover:border-yellow-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <AlertTriangle className="text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Nuclear Fission</h2>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        The splitting of a heavy nucleus into lighter nuclei. This process releases massive amounts of energy (and neutrons).
                        <span className="block mt-2 text-yellow-500 text-xs font-mono">// CLICK BACKGROUND TO TRIGGER REACTION</span>
                    </p>
                    <div className="bg-black/50 p-4 rounded border border-white/5">
                        <div className="text-xs font-mono text-neutral-500 mb-2">ENERGY RELEASE</div>
                        <div className="text-xl font-serif text-white"><M>{"E = \\Delta mc^2"}</M></div>
                    </div>
                </div>

                {/* CARD 2: FORCES */}
                <div className="bg-neutral-900/80 border border-yellow-500/20 p-6 rounded-xl hover:border-yellow-500/50 transition-all">
                    <h2 className="text-2xl font-bold text-white mb-2">Strong Force</h2>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        Protons repel each other electrically, but the Strong Nuclear Force glues them together. It is 137x stronger than electromagnetism but only works at ranges of <M>{"10^{-15}m"}</M>.
                    </p>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-black/50 p-3 rounded border border-white/5 text-center">
                            <Zap size={16} className="mx-auto text-rose-500 mb-1" />
                            <div className="text-[10px] text-neutral-500">GLUONS</div>
                        </div>
                        <div className="flex-1 bg-black/50 p-3 rounded border border-white/5 text-center">
                            <CircleDot size={16} className="mx-auto text-blue-500 mb-1" />
                            <div className="text-[10px] text-neutral-500">MESONS</div>
                        </div>
                    </div>
                </div>

                {/* CARD 3: FUSION (Wide) */}
                <div className="md:col-span-2 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40 border border-yellow-500/20 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/50">
                            <SunIcon className="text-orange-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Nuclear Fusion</h2>
                            <div className="text-xs font-mono text-orange-400">POWERING THE STARS</div>
                        </div>
                    </div>
                    <p className="text-neutral-400 max-w-2xl">
                        Combining light nuclei to form heavier ones. Requires immense heat and pressure to overcome the Coulomb barrier.
                    </p>
                </div>

            </div>


            {/* RIGHT: THE PARTICLE ZOO (Interactive Widget) */}
            <div className="lg:col-span-4">
                <div className="bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-md sticky top-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                        <Layers size={18} className="text-purple-400" />
                        <h3 className="font-bold text-white tracking-wide">STANDARD MODEL</h3>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {standardModel.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setActiveParticle(p)}
                                className={`
                                    aspect-square rounded-lg flex items-center justify-center text-xl font-bold font-serif
                                    border transition-all duration-200
                                    ${activeParticle.id === p.id 
                                        ? "bg-white text-black border-white scale-110 shadow-lg z-10" 
                                        : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:border-white/30"
                                    }
                                `}
                            >
                                {p.symbol}
                            </button>
                        ))}
                    </div>

                    {/* Detail View */}
                    <div className="bg-neutral-900 rounded-lg p-6 border-l-4 border-purple-500 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${activeParticle.color} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`} />
                        
                        <div className="relative z-10">
                            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">{activeParticle.type}</div>
                            <div className="text-3xl font-bold text-white mb-4">{activeParticle.name}</div>
                            
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-neutral-500">CHARGE</span>
                                    <span className="text-white">{activeParticle.charge}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-neutral-500">MASS</span>
                                    <span className="text-white">{activeParticle.mass}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </main>
  );
}

function SunIcon({className, size}: {className?: string, size?: number}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    )
}
"use client";
import { useState } from "react";
import Link from "next/link";
import { M } from "@/components/Math";
import TectonicBackground from "@/app/natural-science/earth-science/geology/TectonicBackground";
import { 
  ArrowLeft, Mountain, Pickaxe, Flame, RefreshCw, 
  Layers, Search, Clock, Hammer, Globe
} from "lucide-react";

export default function GeologyPage() {
  // ROCK CYCLE STATE
  const [rockStage, setRockStage] = useState<"magma" | "igneous" | "sedimentary" | "metamorphic">("magma");

  const cycleData = {
      magma: {
          label: "MAGMA",
          desc: "Molten rock beneath the Earth's surface.",
          process: "Cooling & Crystallization",
          next: "igneous",
          color: "text-orange-500",
          bg: "bg-orange-500",
          icon: Flame
      },
      igneous: {
          label: "IGNEOUS",
          desc: "Formed from cooled magma/lava (e.g., Granite, Basalt).",
          process: "Weathering & Erosion",
          next: "sedimentary",
          color: "text-neutral-200",
          bg: "bg-neutral-500",
          icon: Mountain
      },
      sedimentary: {
          label: "SEDIMENTARY",
          desc: "Formed by accumulation of particles (e.g., Sandstone).",
          process: "Heat & Pressure",
          next: "metamorphic",
          color: "text-amber-200",
          bg: "bg-amber-600",
          icon: Layers
      },
      metamorphic: {
          label: "METAMORPHIC",
          desc: "Transformed by intense heat/pressure (e.g., Marble).",
          process: "Melting",
          next: "magma",
          color: "text-slate-200",
          bg: "bg-slate-600",
          icon: RefreshCw
      }
  };

  const current = cycleData[rockStage];

  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-white overflow-hidden selection:bg-orange-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <TectonicBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/earth-science" className="flex items-center gap-2 text-xs font-mono text-orange-500 hover:text-orange-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Earth_Science // Sector_01
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                        <Pickaxe size={32} className="text-orange-500" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-stone-200 tracking-tighter drop-shadow-lg">
                        GEOLOGY
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right">
                 <div className="text-[10px] font-mono text-stone-500 mb-1 uppercase">Current Era</div>
                 <div className="text-2xl font-bold font-serif text-white">CENOZOIC</div>
                 <div className="text-sm text-stone-400">Quaternary Period</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT COLUMN: THE CYCLE ENGINE */}
            <div className="lg:col-span-5 flex flex-col">
                <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                    
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-stone-200 flex items-center gap-2">
                            <RefreshCw size={20} className="text-orange-500" /> THE ROCK CYCLE
                        </h2>
                        <span className="text-[10px] font-mono text-stone-500 uppercase border border-stone-700 px-2 py-1 rounded">Interactive</span>
                    </div>

                    {/* CYCLE VISUALIZER */}
                    <div className="relative aspect-square flex items-center justify-center mb-8">
                        {/* Connecting Ring */}
                        <div className="absolute inset-0 border-4 border-stone-800 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
                        
                        {/* Central Active Node */}
                        <button 
                            onClick={() => setRockStage(current.next as any)}
                            className={`
                                relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-4
                                transition-all duration-500 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]
                                ${current.bg} group-hover:scale-105
                            `}
                        >
                            <current.icon size={48} className="mb-2 text-white/90" />
                            <div className="text-2xl font-black text-white">{current.label}</div>
                            <div className="text-[10px] font-mono text-white/60 mt-2 uppercase tracking-widest">Click to Evolve</div>
                        </button>

                        {/* Process Label (Orbiting) */}
                        <div className="absolute bottom-4 w-full text-center">
                            <div className="text-xs font-mono text-orange-400 animate-pulse">
                                Next Process: {current.process}
                            </div>
                        </div>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed text-center border-t border-stone-800 pt-6">
                        {current.desc}
                    </p>

                </div>
            </div>


            {/* RIGHT COLUMN: TECTONICS & TIME */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* CARD 1: TECTONICS */}
                <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700 rounded-xl p-6 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe size={24} className="text-orange-500" />
                        <h3 className="text-xl font-bold text-white">Plate Tectonics</h3>
                    </div>
                    <p className="text-stone-400 text-sm mb-6">
                        The lithosphere is broken into tectonic plates that float on the semi-fluid asthenosphere.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-black/30 p-3 rounded border border-stone-800 text-center">
                            <div className="text-[10px] text-stone-500 mb-1">DIVERGENT</div>
                            <div className="text-lg text-white">← →</div>
                            <div className="text-[10px] text-orange-400">Rifts</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded border border-stone-800 text-center">
                            <div className="text-[10px] text-stone-500 mb-1">CONVERGENT</div>
                            <div className="text-lg text-white">→ ←</div>
                            <div className="text-[10px] text-red-400">Mountains</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded border border-stone-800 text-center">
                            <div className="text-[10px] text-stone-500 mb-1">TRANSFORM</div>
                            <div className="text-lg text-white">⇅</div>
                            <div className="text-[10px] text-yellow-400">Quakes</div>
                        </div>
                    </div>
                </div>

                {/* CARD 2: DEEP TIME (Stratigraphy) */}
                <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700 rounded-xl p-6 hover:border-orange-500/30 transition-colors flex gap-6">
                    {/* Visual Column */}
                    <div className="w-16 flex-shrink-0 flex flex-col rounded overflow-hidden border border-stone-800 opacity-80">
                        <div className="flex-1 bg-stone-500" title="Cenozoic"></div>
                        <div className="flex-1 bg-stone-600" title="Mesozoic"></div>
                        <div className="flex-1 bg-stone-700" title="Paleozoic"></div>
                        <div className="h-16 bg-stone-800" title="Precambrian"></div>
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock size={24} className="text-stone-400" />
                            <h3 className="text-xl font-bold text-white">Deep Time</h3>
                        </div>
                        <p className="text-stone-400 text-sm mb-4">
                            Geologic time is measured in millions of years (Ma). The Earth is approximately 4.54 billion years old.
                        </p>
                        <div className="bg-black/30 p-4 rounded border border-stone-800 flex justify-between items-center">
                             <span className="text-xs text-stone-500">AGE OF EARTH</span>
                             <span className="font-mono text-xl text-orange-200">4.54 Ga</span>
                        </div>
                    </div>
                </div>

                {/* CARD 3: MINERALOGY */}
                <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700 rounded-xl p-6 hover:border-orange-500/30 transition-colors">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Hammer size={16} className="text-stone-500" /> Mineralogy
                        </h3>
                        <span className="text-[10px] font-mono text-stone-600">MOHS SCALE</span>
                     </div>
                     <div className="w-full bg-stone-800 h-2 rounded-full mt-4 relative">
                         <div className="absolute left-[10%] -top-1 w-2 h-4 bg-stone-600" title="Talc (1)" />
                         <div className="absolute left-[70%] -top-1 w-2 h-4 bg-stone-400" title="Quartz (7)" />
                         <div className="absolute right-0 -top-1 w-2 h-4 bg-white shadow-[0_0_10px_white]" title="Diamond (10)" />
                     </div>
                     <div className="flex justify-between text-[10px] text-stone-500 mt-2 font-mono">
                         <span>SOFT (Talc)</span>
                         <span>HARD (Diamond)</span>
                     </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}
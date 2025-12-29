"use client";
import { useState } from "react";
import Link from "next/link";
import GlobeBackground, { EarthLayer } from "@/app/natural-science/earth-science/GlobeBackground";
import { 
  ArrowLeft, Globe, Mountain, Wind, Waves, Layers, Thermometer, 
  Droplet, Activity
} from "lucide-react";

export default function EarthSciencePage() {
  const [activeLayer, setActiveLayer] = useState<EarthLayer>("lithosphere");

  return (
    <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden selection:bg-teal-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <GlobeBackground layer={activeLayer} />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. DASHBOARD UI */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-12 pointer-events-auto">
             <div>
                 <Link href="/natural-science" className="flex items-center gap-2 text-xs font-mono text-teal-500 hover:text-teal-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Natural_Sciences // Domain_04
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-full animate-pulse">
                        <Globe size={32} className="text-teal-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
                        EARTH<br/>SCIENCE
                     </h1>
                 </div>
             </div>

             {/* LAYER CONTROLS */}
             <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col gap-2 pointer-events-auto">
                 <button 
                    onClick={() => setActiveLayer("lithosphere")}
                    className={`p-3 rounded-lg transition-all flex items-center gap-3 ${activeLayer === "lithosphere" ? "bg-emerald-600 text-white" : "hover:bg-white/10 text-neutral-400"}`}
                 >
                    <Mountain size={18} /> <span className="text-xs font-bold hidden md:inline">LITHOSPHERE</span>
                 </button>
                 <button 
                    onClick={() => setActiveLayer("atmosphere")}
                    className={`p-3 rounded-lg transition-all flex items-center gap-3 ${activeLayer === "atmosphere" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-neutral-400"}`}
                 >
                    <Wind size={18} /> <span className="text-xs font-bold hidden md:inline">ATMOSPHERE</span>
                 </button>
                 <button 
                    onClick={() => setActiveLayer("hydrosphere")}
                    className={`p-3 rounded-lg transition-all flex items-center gap-3 ${activeLayer === "hydrosphere" ? "bg-blue-600 text-white" : "hover:bg-white/10 text-neutral-400"}`}
                 >
                    <Waves size={18} /> <span className="text-xs font-bold hidden md:inline">HYDROSPHERE</span>
                 </button>
             </div>
        </header>

        {/* 3. MAIN CONTENT (Bottom Aligned) */}
        <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
            
            {/* CARD 1: GEOLOGY (Linked) */}
            <Link 
                href="/natural-science/earth-science/geology"
                onMouseEnter={() => setActiveLayer("lithosphere")}
                className={`
                    p-6 rounded-2xl border backdrop-blur-md transition-all group cursor-pointer
                    ${activeLayer === "lithosphere" ? "bg-emerald-950/60 border-emerald-500/50 scale-[1.02] shadow-lg" : "bg-neutral-900/60 border-white/10 hover:border-white/30 hover:scale-[1.01]"}
                `}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Layers size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500/60">SYS_GEO</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Geology</h2>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                    Study of the solid Earth, the rocks of which it is composed, and the processes by which they change.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                        <span className="text-neutral-500">CRUST DEPTH</span>
                        <span className="text-emerald-200">5 - 70 km</span>
                    </div>
                </div>
            </Link>

            {/* CARD 2: METEOROLOGY (Linked) */}
            <Link
                href="/natural-science/earth-science/meteorology"
                onMouseEnter={() => setActiveLayer("atmosphere")}
                className={`
                    p-6 rounded-2xl border backdrop-blur-md transition-all group cursor-pointer
                    ${activeLayer === "atmosphere" ? "bg-sky-950/60 border-sky-500/50 scale-[1.02] shadow-lg" : "bg-neutral-900/60 border-white/10 hover:border-white/30 hover:scale-[1.01]"}
                `}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
                        <Thermometer size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-sky-500/60">SYS_ATM</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">Meteorology</h2>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                    The science of the atmosphere. Weather forecasting, climate dynamics, and atmospheric chemistry.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                        <span className="text-neutral-500">PRESSURE</span>
                        <span className="text-sky-200">1013.25 hPa</span>
                    </div>
                </div>
            </Link>

            {/* CARD 3: HYDROLOGY (Linked) */}
            <Link
                href="/natural-science/earth-science/hydrology"
                onMouseEnter={() => setActiveLayer("hydrosphere")}
                className={`
                    p-6 rounded-2xl border backdrop-blur-md transition-all group cursor-pointer
                    ${activeLayer === "hydrosphere" ? "bg-blue-950/60 border-blue-500/50 scale-[1.02] shadow-lg" : "bg-neutral-900/60 border-white/10 hover:border-white/30 hover:scale-[1.01]"}
                `}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Droplet size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-blue-500/60">SYS_HYDRO</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Hydrology</h2>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                    Exploration of the ocean and fresh water systems. Currents, waves, marine ecosystems, and fluid dynamics.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                        <span className="text-neutral-500">COVERAGE</span>
                        <span className="text-blue-200">71%</span>
                    </div>
                </div>
            </Link>

        </div>

        {/* 4. SEISMIC TICKER (Footer) */}
        <div className="mt-8 border-t border-white/10 pt-4 flex items-center gap-6 pointer-events-auto">
             <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 animate-pulse">
                 <Activity size={14} /> LIVE SEISMIC
             </div>
             {/* Fake Seismic Graph */}
             <div className="flex-1 h-8 bg-neutral-900/50 rounded border border-white/5 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[1px] bg-red-500/20" />
                 </div>
                 {/* Moving Line (CSS Animation) */}
                 <div className="absolute top-0 bottom-0 right-0 w-2 bg-red-500/50" />
                 <svg className="w-full h-full" preserveAspectRatio="none">
                    <polyline 
                        points="0,15 20,15 25,10 30,20 35,15 100,15 110,5 120,25 130,15 300,15 310,12 320,18 330,15 600,15"
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="1"
                        className="animate-[dash_5s_linear_infinite]"
                    />
                 </svg>
             </div>
             <div className="text-[10px] font-mono text-neutral-500">
                 STATION: HNL-04 // MAG: 2.1
             </div>
        </div>

      </div>
    </main>
  );
}
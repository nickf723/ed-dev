"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import WindBackground from "@/app/natural-science/earth-science/meteorology/WindBackground";
import { ArrowLeft, Wind, Cloud, Sun, Thermometer, Plane, Rocket, Satellite } from "lucide-react";

export default function MeteorologyPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-sky-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <WindBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 border-b border-sky-500/30 pb-6">
             <div>
                 <Link href="/natural-science/earth-science" className="flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Earth_Science // Atmosphere
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-sky-500/10 rounded-full border border-sky-500/30">
                        <Wind size={32} className="text-sky-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 tracking-tighter drop-shadow-lg">
                        METEOROLOGY
                     </h1>
                 </div>
             </div>
             <div className="hidden md:block text-right font-mono text-sky-400/60 text-xs">
                 <div>CURRENT PRESSURE: 1013 hPa</div>
                 <div>WIND VECTOR: NW 15kt</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
            
            {/* LEFT: THE ATMOSPHERE STACK (Vertical Interactive) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
                <h3 className="text-xs font-bold font-mono text-sky-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Thermometer size={14} /> Vertical Profile
                </h3>
                
                {/* EXOSPHERE */}
                <div className="group relative p-6 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 transition-all hover:border-sky-500/50">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Satellite size={24} className="text-sky-200" />
                    </div>
                    <div className="text-xs font-mono text-sky-500 mb-1">500km+ // SPACE BOUNDARY</div>
                    <h2 className="text-xl font-bold text-white">Exosphere</h2>
                    <p className="text-sm text-slate-400 mt-2 h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100">
                        Atoms and molecules escape into space. Satellites orbit here.
                    </p>
                </div>

                {/* THERMOSPHERE */}
                <div className="group relative p-6 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 transition-all hover:border-sky-500/50">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Rocket size={24} className="text-sky-200" />
                    </div>
                    <div className="text-xs font-mono text-sky-500 mb-1">85km - 500km // AURORA ZONE</div>
                    <h2 className="text-xl font-bold text-white">Thermosphere</h2>
                    <p className="text-sm text-slate-400 mt-2 h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100">
                        High energy UV absorption causes temperatures to rise to 2,500°C, though it would feel cold due to thin air.
                    </p>
                </div>

                {/* MESOSPHERE */}
                <div className="group relative p-6 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 transition-all hover:border-sky-500/50">
                    <div className="text-xs font-mono text-sky-500 mb-1">50km - 85km // METEOR SHIELD</div>
                    <h2 className="text-xl font-bold text-white">Mesosphere</h2>
                    <p className="text-sm text-slate-400 mt-2 h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100">
                        The coldest layer (-90°C). Most meteors burn up here upon entry.
                    </p>
                </div>

                {/* STRATOSPHERE */}
                <div className="group relative p-6 bg-slate-900/40 border border-white/5 rounded-xl hover:bg-slate-800/60 transition-all hover:border-sky-500/50">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <Plane size={24} className="text-sky-200" />
                    </div>
                    <div className="text-xs font-mono text-sky-500 mb-1">12km - 50km // OZONE LAYER</div>
                    <h2 className="text-xl font-bold text-white">Stratosphere</h2>
                    <p className="text-sm text-slate-400 mt-2 h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100">
                        Stable, dry air. Jet aircraft fly here to avoid turbulence. The Ozone Layer protects us from UV radiation.
                    </p>
                </div>

                {/* TROPOSPHERE */}
                <div className="group relative p-6 bg-gradient-to-r from-sky-900/40 to-slate-900/40 border border-sky-500/30 rounded-xl hover:bg-sky-900/50 transition-all shadow-lg">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Cloud size={24} className="text-white" />
                    </div>
                    <div className="text-xs font-mono text-sky-300 mb-1">0km - 12km // BIOSPHERE</div>
                    <h2 className="text-2xl font-bold text-white">Troposphere</h2>
                    <p className="text-sm text-sky-100 mt-2">
                        Where we live. Contains 75% of the atmosphere's mass and almost all weather phenomena.
                    </p>
                </div>
            </div>


            {/* RIGHT: CLIMATE DYNAMICS */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* GREENHOUSE EFFECT */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Sun size={24} className="text-amber-400" />
                        <h3 className="text-xl font-bold text-white">Energy Balance</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                        Earth maintains a delicate thermal balance. Solar radiation enters, but some infrared heat is trapped by greenhouse gases.
                    </p>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-center items-center gap-8">
                        <div className="text-center">
                            <div className="text-[10px] text-slate-500 mb-1">INCOMING SOLAR</div>
                            <div className="text-lg text-amber-200">340 W/m²</div>
                        </div>
                        <div className="text-slate-600">→</div>
                        <div className="text-center">
                            <div className="text-[10px] text-slate-500 mb-1">ALBEDO (REFLECTED)</div>
                            <div className="text-lg text-white">~30%</div>
                        </div>
                    </div>
                </div>

                {/* CORIOLIS EFFECT */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-sky-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">The Coriolis Effect</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        Because Earth rotates, moving air is deflected to the right in the Northern Hemisphere and left in the Southern Hemisphere. This spin creates cyclones.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-3 rounded border border-white/5 text-center">
                            <div className="text-[10px] text-slate-500 mb-1">NORTHERN</div>
                            <div className="text-sm text-sky-300">Counter-Clockwise</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded border border-white/5 text-center">
                            <div className="text-[10px] text-slate-500 mb-1">SOUTHERN</div>
                            <div className="text-sm text-sky-300">Clockwise</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}
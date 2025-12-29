"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import WaterBackground from "@/app/natural-science/earth-science/hydrology/WaterBackground";
import { 
  ArrowLeft, Droplet, CloudRain, Sun, Wind, Activity, 
  Waves, Thermometer, GlassWater
} from "lucide-react";
import { useState } from "react";

export default function HydrologyPage() {
  const [cycleStage, setCycleStage] = useState("evaporation");

  const stages = {
      evaporation: {
          icon: Sun,
          title: "Evaporation",
          desc: "Solar energy causes liquid water to turn into vapor.",
          stat: "434,000 km³/yr",
          color: "text-amber-400"
      },
      condensation: {
          icon: Wind,
          title: "Condensation",
          desc: "Water vapor cools and forms clouds.",
          stat: "Cloud Formation",
          color: "text-white"
      },
      precipitation: {
          icon: CloudRain,
          title: "Precipitation",
          desc: "Water falls back to Earth as rain, snow, or hail.",
          stat: "Global Rainfall",
          color: "text-blue-400"
      },
      collection: {
          icon: Waves,
          title: "Collection",
          desc: "Water gathers in rivers, lakes, and oceans.",
          stat: "Runoff",
          color: "text-cyan-400"
      }
  };

  const current = stages[cycleStage as keyof typeof stages];

  return (
    <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden selection:bg-blue-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <WaterBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 border-b border-blue-900/30 pb-6">
             <div>
                 <Link href="/natural-science/earth-science" className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Earth_Science // Hydrosphere
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                        <Droplet size={32} className="text-blue-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400 tracking-tighter drop-shadow-lg">
                        HYDROLOGY
                     </h1>
                 </div>
             </div>
             <div className="hidden md:block text-right font-mono text-blue-400/60 text-xs">
                 <div>H₂O POLARITY: HIGH</div>
                 <div>pH LEVEL: ~8.1 (OCEAN)</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
            
            {/* LEFT: THE WATER CYCLE ENGINE */}
            <div className="lg:col-span-5 flex flex-col">
                <div className="bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-blue-100 flex items-center gap-2">
                            <Activity size={20} className="text-blue-400" /> THE WATER CYCLE
                        </h2>
                    </div>

                    {/* CYCLE VISUALIZER */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {Object.entries(stages).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setCycleStage(key)}
                                className={`
                                    p-4 rounded-xl border transition-all flex flex-col items-center gap-2 text-center
                                    ${cycleStage === key 
                                        ? "bg-blue-500/20 border-blue-400 text-white scale-105 shadow-lg" 
                                        : "bg-black/20 border-white/5 text-blue-200/50 hover:bg-white/5"
                                    }
                                `}
                            >
                                <data.icon size={24} className={data.color} />
                                <span className="text-xs font-bold uppercase">{data.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Stage Info */}
                    <div className="border-t border-blue-800/50 pt-6 animate-fadeIn">
                        <h3 className={`text-2xl font-black mb-2 ${current.color}`}>{current.title}</h3>
                        <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
                            {current.desc}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                            <span>METRIC:</span>
                            <span className="text-white">{current.stat}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* RIGHT: FLUID DYNAMICS & PROPERTIES */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* CARD 1: BERNOULLI */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <Wind size={24} className="text-blue-400" />
                        <h3 className="text-xl font-bold text-white">Fluid Dynamics</h3>
                    </div>
                    <p className="text-neutral-400 text-sm mb-6">
                        The physics of fluids in motion. Bernoulli's principle relates pressure, velocity, and elevation.
                    </p>
                    <div className="bg-black/30 p-4 rounded border border-white/5 flex justify-center">
                        <div className="text-xl font-serif text-blue-200">
                            <M>{"P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}"}</M>
                        </div>
                    </div>
                </div>

                {/* CARD 2: OCEANOGRAPHY */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors flex gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Waves size={24} className="text-blue-400" />
                            <h3 className="text-xl font-bold text-white">Thermohaline Circulation</h3>
                        </div>
                        <p className="text-neutral-400 text-sm mb-4">
                            The "Global Conveyor Belt" driven by temperature (thermo) and salinity (haline) gradients. It regulates Earth's climate.
                        </p>
                        <div className="flex gap-4 text-xs font-mono">
                             <div className="flex items-center gap-2 text-red-300">
                                 <Thermometer size={12} /> WARM SURFACE
                             </div>
                             <div className="flex items-center gap-2 text-blue-300">
                                 <Thermometer size={12} /> COLD DEEP
                             </div>
                        </div>
                    </div>
                </div>

                {/* CARD 3: CHEMICAL PROPERTIES */}
                <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <GlassWater size={16} className="text-blue-400" /> Molecular Properties
                        </h3>
                        <span className="text-[10px] font-mono text-blue-500">H₂O</span>
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                         <div className="bg-black/30 p-3 rounded border border-white/5">
                             <div className="text-[10px] text-neutral-500 mb-1">DIPOLE MOMENT</div>
                             <div className="text-sm text-white">1.85 Debye</div>
                         </div>
                         <div className="bg-black/30 p-3 rounded border border-white/5">
                             <div className="text-[10px] text-neutral-500 mb-1">HEAT CAPACITY</div>
                             <div className="text-sm text-white">4.18 J/g°C</div>
                         </div>
                     </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}
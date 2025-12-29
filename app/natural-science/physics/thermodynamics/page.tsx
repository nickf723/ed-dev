"use client";
import { useState } from "react";
import Link from "next/link";
import HeatBackground from "@/app/natural-science/physics/thermodynamics/HeatBackground";
import { M } from "@/components/Math";
import { 
  Flame, Thermometer, Wind, AlertTriangle, ArrowLeft, 
  RefreshCw, Snowflake, Gauge, Activity
} from "lucide-react";

export default function ThermodynamicsPage() {
  const [temp, setTemp] = useState(0.4); // 0.0 to 1.0

  // Derived states for UI feedback
  const getSystemStatus = () => {
      if (temp < 0.2) return { text: "CRYSTALLINE / FROZEN", color: "text-cyan-400", border: "border-cyan-500" };
      if (temp < 0.7) return { text: "OPERATIONAL / STABLE", color: "text-orange-400", border: "border-orange-500" };
      return { text: "CRITICAL / PLASMA", color: "text-red-500 animate-pulse", border: "border-red-500" };
  };
  const status = getSystemStatus();

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-hidden selection:bg-orange-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE (Controlled by React State) */}
      <HeatBackground temperature={temp} />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] pointer-events-none z-0" />

      {/* 2. NAVIGATION & HUD */}
      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto flex flex-col h-full min-h-screen">
        
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors mb-2">
                    <ArrowLeft size={12} /> PHYSICS_ENGINE // THERMODYNAMICS
                 </Link>
                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                    THERMO<br/>DYNAMICS
                 </h1>
            </div>

            {/* TEMPERATURE CONTROLLER */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-xl w-full md:w-auto min-w-[300px]">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold font-mono tracking-widest text-neutral-400 flex items-center gap-2">
                        <Thermometer size={14} /> SYSTEM TEMPERATURE
                    </span>
                    <span className={`text-xs font-bold font-mono ${status.color}`}>
                        {status.text}
                    </span>
                </div>
                
                <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-orange-400 transition-all"
                />
                
                <div className="flex justify-between mt-2 text-[10px] font-mono text-neutral-500">
                    <span>0K (Absolute Zero)</span>
                    <span>Planck Temp</span>
                </div>
            </div>
        </div>


        {/* 3. MAIN CONTENT GRID (The Laws) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-start">
            
            {/* LAW 0: EQUILIBRIUM */}
            <div className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-neutral-800/40 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                     <span className="text-4xl font-black text-white/5 group-hover:text-white/10">0</span>
                 </div>
                 <div className="mb-4 p-3 bg-blue-500/10 w-fit rounded-lg border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                     <Activity className="text-blue-400" size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Zeroth Law</h3>
                 <p className="text-sm text-neutral-400 mb-4">
                    If two systems are in thermal equilibrium with a third system, they are in equilibrium with each other.
                 </p>
                 <div className="text-xs font-mono text-blue-300 bg-black/30 p-2 rounded">
                    Define: Temperature (T)
                 </div>
            </div>

            {/* LAW 1: CONSERVATION */}
            <div className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-neutral-800/40 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                     <span className="text-4xl font-black text-white/5 group-hover:text-white/10">1</span>
                 </div>
                 <div className="mb-4 p-3 bg-orange-500/10 w-fit rounded-lg border border-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                     <Flame className="text-orange-400" size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">First Law</h3>
                 <p className="text-sm text-neutral-400 mb-4">
                    Energy cannot be created or destroyed, only transferred or changed.
                 </p>
                 <div className="text-center py-2 border-t border-white/5">
                     <span className="text-xl font-serif text-orange-200">
                        <M>{"\\Delta U = Q - W"}</M>
                     </span>
                 </div>
            </div>

            {/* LAW 2: ENTROPY */}
            <div className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-neutral-800/40 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                     <span className="text-4xl font-black text-white/5 group-hover:text-white/10">2</span>
                 </div>
                 <div className="mb-4 p-3 bg-red-500/10 w-fit rounded-lg border border-red-500/20 group-hover:border-red-500/50 transition-colors">
                     <Wind className="text-red-400" size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Second Law</h3>
                 <p className="text-sm text-neutral-400 mb-4">
                    The entropy of an isolated system always increases. Chaos is inevitable.
                 </p>
                 <div className="text-center py-2 border-t border-white/5">
                     <span className="text-xl font-serif text-red-200">
                        <M>{"\\Delta S_{univ} > 0"}</M>
                     </span>
                 </div>
            </div>

            {/* LAW 3: ABSOLUTE ZERO */}
            <div className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-neutral-800/40 transition-colors">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                     <span className="text-4xl font-black text-white/5 group-hover:text-white/10">3</span>
                 </div>
                 <div className="mb-4 p-3 bg-cyan-500/10 w-fit rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                     <Snowflake className="text-cyan-400" size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Third Law</h3>
                 <p className="text-sm text-neutral-400 mb-4">
                    The entropy of a perfect crystal at absolute zero is exactly equal to zero.
                 </p>
                 <div className="text-center py-2 border-t border-white/5">
                     <span className="text-xl font-serif text-cyan-200">
                        <M>{"S \\to 0 \\text{ as } T \\to 0"}</M>
                     </span>
                 </div>
            </div>

        </div>

        {/* BOTTOM SECTION: BOLTZMANN ENTROPY */}
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
                 <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Gauge size={24} className="text-neutral-500" /> Statistical Mechanics
                 </h2>
                 <p className="text-neutral-400 leading-relaxed">
                    Thermodynamics isn't just about engines; it's about probability. 
                    Ludwig Boltzmann showed that entropy (<M>S</M>) is simply a measure of how many microscopic arrangements (<M>\Omega</M>) correspond to a macroscopic state.
                 </p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                 <div className="text-4xl md:text-5xl font-serif text-white tracking-widest text-center">
                    <M>{"S = k_B \\ln \\Omega"}</M>
                 </div>
                 <p className="text-center text-[10px] font-mono text-neutral-500 mt-4 uppercase tracking-[0.2em]">
                    The Equation on Boltzmann's Tombstone
                 </p>
            </div>
        </div>

      </div>
    </main>
  );
}
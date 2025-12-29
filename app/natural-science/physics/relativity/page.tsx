"use client";
import { useState } from "react";
import Link from "next/link";
import { M } from "@/components/Math";
import LensingBackground from "@/app/natural-science/physics/relativity/LensingBackground";
import { ArrowLeft, Clock, Move, Globe, Hourglass, Zap, Maximize } from "lucide-react";

export default function RelativityPage() {
  // RELATIVISTIC FLIGHT COMPUTER STATE
  const [velocity, setVelocity] = useState(0); // 0 to 0.999c
  
  // Calculate Lorentz Factor: y = 1 / sqrt(1 - v^2/c^2)
  // We clamp v to 0.9999 to avoid division by zero
  const v = Math.min(velocity, 0.9999);
  const gamma = 1 / Math.sqrt(1 - (v * v));
  
  // Derived Stats
  const timeDilation = gamma.toFixed(2); // 1 sec ship = X sec earth
  const lengthContraction = (100 / gamma).toFixed(1); // 100m object appears X m long

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-amber-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <LensingBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-12">
            <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs font-mono text-amber-500/60 hover:text-amber-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Physics_Engine // Sector_04
                 </Link>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
                    RELATIVITY
                 </h1>
                 <p className="text-amber-100/60 font-mono max-w-lg text-sm md:text-base">
                    Space and time are not absolute. They are a flexible fabric, warped by matter and energy.
                 </p>
            </div>
            
            {/* E=mc^2 Badge */}
            <div className="hidden md:block bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                <div className="text-4xl font-serif text-amber-400"><M>{"E = mc^2"}</M></div>
                <div className="text-[10px] text-center text-amber-500/50 mt-2 font-mono uppercase">Mass-Energy Equivalence</div>
            </div>
        </header>


        {/* 3. CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-start">
            
            {/* LEFT PANEL: GENERAL RELATIVITY (Gravity) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-400">
                            <Globe size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">General Relativity</h2>
                    </div>
                    
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        Gravity is not a force, but the curvature of spacetime caused by mass. Objects follow straight lines in this curved geometry.
                    </p>

                    <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                             <span className="text-xs font-mono text-neutral-500">FIELD EQUATION</span>
                             <Maximize size={14} className="text-neutral-600" />
                        </div>
                        <div className="text-xl font-serif text-center py-2">
                            <M>{"R_{\\mu \\nu} - \\frac{1}{2}Rg_{\\mu \\nu} = \\frac{8 \\pi G}{c^4} T_{\\mu \\nu}"}</M>
                        </div>
                        <div className="text-[10px] text-center text-neutral-600 italic">
                            "Matter tells space how to curve. Space tells matter how to move."
                        </div>
                    </div>
                </div>
            </div>


            {/* CENTER PANEL: FLIGHT COMPUTER (Interactive) */}
            <div className="lg:col-span-4 h-full flex flex-col justify-end pb-8">
                <div className="p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/30 shadow-[0_0_50px_-10px_rgba(245,158,11,0.2)]">
                    
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-sm font-bold font-mono text-amber-500 flex items-center gap-2">
                            <Zap size={14} /> FLIGHT COMPUTER
                         </h3>
                         <span className="text-[10px] font-mono text-amber-500/50">LORENTZ TRANSFORM</span>
                    </div>

                    {/* SLIDER */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                            <span>VELOCITY (v)</span>
                            <span className="text-white">{(v * 100).toFixed(1)}% c</span>
                        </div>
                        <input 
                            type="range" min="0" max="0.999" step="0.001"
                            value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
                        />
                    </div>

                    {/* METRICS */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Time Dilation */}
                        <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-neutral-500 mb-2">
                                <Clock size={14} />
                                <span className="text-[10px] font-mono uppercase">Time Dilation</span>
                            </div>
                            <div className="text-2xl font-mono text-white">
                                {timeDilation}x
                            </div>
                            <div className="text-[10px] text-neutral-600 mt-1">Slower relative to Earth</div>
                        </div>

                        {/* Length Contraction */}
                        <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-neutral-500 mb-2">
                                <Move size={14} />
                                <span className="text-[10px] font-mono uppercase">Length (100m)</span>
                            </div>
                            <div className="text-2xl font-mono text-white">
                                {lengthContraction}m
                            </div>
                            <div className="text-[10px] text-neutral-600 mt-1">Observed length</div>
                        </div>
                    </div>

                </div>
            </div>


            {/* RIGHT PANEL: SPECIAL RELATIVITY (Speed) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-400">
                            <Hourglass size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">Special Relativity</h2>
                    </div>
                    
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        The laws of physics are the same for all non-accelerating observers. The speed of light is constant, regardless of motion.
                    </p>

                    <ul className="space-y-3">
                         <li className="flex items-center gap-3 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>Speed of Light Limit (c)</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>Time Slows Down</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span>Space Contracts</span>
                         </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="text-xs font-mono text-neutral-500 mb-2 uppercase">The Lorentz Factor</div>
                        <div className="text-lg font-serif text-center">
                            <M>{"\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}"}</M>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}
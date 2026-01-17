"use client";
import React, { useState } from "react";
import Link from "next/link";
import FuturologyBackground from "./FuturologyBackground";
import { SCENARIOS, KARDASHEV_LEVELS } from "./futurology-data";
import { ArrowLeft, Zap, Radio, AlertTriangle, TrendingUp, Clock } from "lucide-react";

export default function FuturologyPage() {
  const [civilizationLevel, setCivilizationLevel] = useState(0.73); // Current Humanity
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#05000a] text-fuchsia-100 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <FuturologyBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/humanities" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Humanities Division
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 tracking-tighter mb-2 italic">
                THE CHRONOSPHERE
            </h1>
            <p className="text-cyan-500/60 font-mono text-xs uppercase tracking-widest">
                Forecasting // Predictive Modeling // Existential Risk
            </p>
        </header>

        {/* KARDASHEV SCALE CALCULATOR */}
        <section className="mb-16 p-8 rounded-2xl bg-black/40 border border-fuchsia-500/30 backdrop-blur-md relative overflow-hidden group">
            {/* Holographic scanning effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 blur-sm animate-scan pointer-events-none opacity-20" />

            <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Radio className="text-fuchsia-500" /> Kardashev Scale
                    </h2>
                    <p className="text-sm text-stone-400 max-w-md">
                        Measuring a civilization's level of technological advancement based on the amount of energy it is able to use.
                    </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <div className="text-[10px] font-mono uppercase text-cyan-500 mb-1">Current Status</div>
                    <div className="text-4xl font-black text-white font-mono">TYPE {civilizationLevel.toFixed(2)}</div>
                </div>
            </div>

            {/* The Slider / Bar */}
            <div className="relative h-4 bg-stone-900 rounded-full overflow-hidden mb-8 border border-white/10">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 transition-all duration-1000 ease-out"
                    style={{ width: `${(civilizationLevel / 3) * 100}%` }}
                />
                {/* Markers */}
                {[0, 1, 2, 3].map(lvl => (
                    <div key={lvl} className="absolute top-0 h-full w-0.5 bg-white/20" style={{ left: `${(lvl/3)*100}%` }} />
                ))}
            </div>

            {/* Interactive Buttons to Advance Time */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {KARDASHEV_LEVELS.map((k) => (
                    <button
                        key={k.level}
                        onClick={() => setCivilizationLevel(k.level + (k.level === 0 ? 0.73 : 0))}
                        className={`
                            flex-1 min-w-[200px] p-4 rounded border transition-all text-left
                            ${civilizationLevel >= k.level && civilizationLevel < k.level + 1 
                                ? "bg-fuchsia-900/40 border-fuchsia-500 text-white" 
                                : "bg-black/40 border-white/5 text-stone-500 hover:border-white/20"}
                        `}
                    >
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Type {k.level}</div>
                        <div className="font-bold text-sm mb-2">{k.label}</div>
                        <div className="text-[10px] opacity-60 font-mono">{k.energy}</div>
                    </button>
                ))}
            </div>
        </section>

        {/* TIMELINE PREDICTIONS */}
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Clock size={18} className="text-cyan-400" /> Probability Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {SCENARIOS.map((item) => {
                const Icon = item.icon;
                const isActive = activeScenario === item.id;
                
                return (
                    <div 
                        key={item.id}
                        onClick={() => setActiveScenario(isActive ? null : item.id)}
                        className={`
                            group relative p-1 rounded-xl bg-gradient-to-br from-white/10 to-transparent hover:from-cyan-500/20 transition-all duration-300 cursor-pointer
                            ${isActive ? 'scale-105 z-10' : 'hover:scale-105'}
                        `}
                    >
                        <div className="relative h-full bg-[#0a0510] rounded-lg p-6 border border-white/5 group-hover:border-cyan-500/40 overflow-hidden">
                            
                            {/* Neon Glow on Active */}
                            {isActive && <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />}

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-lg bg-black border border-white/10 group-hover:text-cyan-400 transition-colors">
                                    <Icon size={24} />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-white">{item.year}</div>
                                    <div className="text-[9px] font-mono text-fuchsia-400 uppercase">Estimated Arrival</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            
                            {/* Probability Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                                    <span>Probability</span>
                                    <span className="text-cyan-400">{item.probability}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500" 
                                        style={{ width: `${item.probability}%` }} 
                                    />
                                </div>
                            </div>

                            <p className="text-sm text-stone-400 leading-relaxed mb-4">
                                {item.desc}
                            </p>

                            {/* Footer Tags */}
                            <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                                <span className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase text-stone-400 border border-white/5">
                                    {item.category}
                                </span>
                                <span className={`px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase border border-white/5 ${item.impact === 'EXTREME' || item.impact === 'UNCALCULABLE' ? 'text-red-400' : 'text-yellow-400'}`}>
                                    Impact: {item.impact}
                                </span>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>

      </div>
    </main>
  );
}
"use client";
import React, { useState } from "react";
import Link from "next/link";
import MicrobiologyBackground from "./MicrobiologyBackground";
import MicrobiologyModal from "./MicrobiologyModal";
import { MICROBE_CONFIG, MicrobeType } from "./microbiology-data";
import { useWikiMicrobe } from "./useWikiMicrobe";
import { ArrowLeft, Dna, Activity, Scan, AlertTriangle } from "lucide-react";

export default function MicrobiologyPage() {
  const [filter, setFilter] = useState<'ALL' | MicrobeType>('ALL');
  const [selectedMicrobe, setSelectedMicrobe] = useState<any>(null);
  const { data, loading } = useWikiMicrobe(filter);

  return (
    <main className="min-h-screen bg-[#000505] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <MicrobiologyBackground />
      {/* Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12 flex justify-between items-end">
            <div>
                <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 hover:text-cyan-400 transition-colors mb-6">
                    <ArrowLeft size={10} /> Biology Dept
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
                    VECTOR LAB
                </h1>
                <p className="text-cyan-500/60 font-mono text-xs uppercase tracking-widest">
                    Microbial Analysis // Containment Zone
                </p>
            </div>
            
            {/* Status Indicator */}
            <div className="hidden md:flex flex-col items-end text-[10px] font-mono text-cyan-500/50">
                <div className="flex items-center gap-2"><Activity size={12} className="animate-pulse" /> BIO-SENSORS ACTIVE</div>
                <div>ISO CLASS 4 CLEANROOM</div>
            </div>
        </header>

        {/* FILTER BAR (Domain Select) */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-cyan-500/10 pb-6">
            <button 
                onClick={() => setFilter('ALL')}
                className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${filter === 'ALL' ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500' : 'bg-black/40 text-stone-500 border border-white/5 hover:border-white/20'}`}
            >
                All Vectors
            </button>
            {Object.entries(MICROBE_CONFIG).map(([key, config]) => (
                <button
                    key={key}
                    onClick={() => setFilter(key as MicrobeType)}
                    className={`
                        px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center gap-2
                        ${filter === key 
                            ? `bg-black/60 ${config.color} ${config.border} shadow-[0_0_10px_rgba(34,211,238,0.1)]` 
                            : "bg-black/40 border-white/5 text-stone-500 hover:text-white"}
                    `}
                >
                    {config.label}
                </button>
            ))}
        </div>

        {/* GRID (The Samples) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {data.map((m) => {
                const config = MICROBE_CONFIG[m.type];
                
                return (
                    <div 
                        key={m.id}
                        onClick={() => setSelectedMicrobe(m)}
                        className={`
                            group relative aspect-square rounded-full border-2 border-dashed border-white/10 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden
                        `}
                    >
                         
                        {/* Sample Image */}
                        {m.thumbnail ? (
                            <img src={m.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 filter grayscale group-hover:grayscale-0" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-xs font-mono text-stone-700">NO SIGNAL</div>
                        )}
                        
                        {/* Scanning Overlay (Spinning) */}
                        <div className="absolute inset-0 border-t-2 border-cyan-500/50 rounded-full opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }} />
                        
                        {/* Label */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                            <div className="text-center">
                                <div className={`text-xs font-bold uppercase tracking-widest ${config.color} mb-1`}>{m.bsl}</div>
                                <div className="text-white font-bold leading-none">{m.title}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {/* Loading Skeletons */}
            {loading && [1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-full border-2 border-dashed border-white/5 animate-pulse bg-white/5" />
            ))}
        </div>

        {/* MODAL */}
        {selectedMicrobe && (
            <MicrobiologyModal microbe={selectedMicrobe} onClose={() => setSelectedMicrobe(null)} />
        )}

      </div>
    </main>
  );
}
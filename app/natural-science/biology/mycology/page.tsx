"use client";
import React, { useState } from "react";
import Link from "next/link";
import MycologyBackground from "./MycologyBackground";
import { MYCOLOGY_CONFIG, Edibility } from "./mycology-data";
import { useWikiMycology, FungiRecord } from "./useWikiMycology";
import { ArrowLeft, Skull, Sprout, AlertTriangle, ScanLine, Microscope } from "lucide-react";

export default function MycologyPage() {
  const { data, loading } = useWikiMycology();
  const [selectedFungi, setSelectedFungi] = useState<FungiRecord | null>(null);

  return (
    <main className="min-h-screen bg-[#05050a] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-purple-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <MycologyBackground />
      {/* UV Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none opacity-80" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16 flex justify-between items-end">
            <div>
                <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 hover:text-white transition-colors mb-6">
                    <ArrowLeft size={10} /> Biology Dept
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-emerald-400 tracking-tighter mb-2 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    THE SPOREIUM
                </h1>
                <p className="text-purple-300/60 font-mono text-xs uppercase tracking-widest">
                    Fungal Research // Subterranean Sector
                </p>
            </div>
            
            {/* Caution Badge */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded border border-red-500/20 bg-red-950/20 text-red-400">
                <AlertTriangle size={16} />
                <div className="text-[10px] font-bold uppercase tracking-widest">
                    Toxic Specimens Contained
                </div>
            </div>
        </header>

        {/* FUNGI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {data.map((fungi) => {
                const config = MYCOLOGY_CONFIG[fungi.edibility];
                const Icon = config.icon;
                
                return (
                    <div 
                        key={fungi.id}
                        className="group relative rounded-2xl bg-neutral-900/40 border border-white/5 overflow-hidden hover:-translate-y-2 transition-transform duration-500"
                    >
                        {/* Hazard Border for Deadly items */}
                        {fungi.edibility === 'DEADLY' && (
                             <div className="absolute inset-0 border-2 border-red-600/50 rounded-2xl pointer-events-none z-20 animate-pulse" />
                        )}

                        {/* Image */}
                        <div className="h-48 w-full bg-black relative overflow-hidden">
                            
                            {fungi.thumbnail ? (
                                <img src={fungi.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-stone-700 font-mono text-xs">NO VISUAL</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] to-transparent" />
                        </div>

                        {/* Data Card */}
                        <div className="p-6 relative">
                            {/* Bioluminescent Glow on Hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t ${fungi.edibility === 'DEADLY' ? 'from-red-600' : 'from-purple-600'} to-transparent pointer-events-none`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-white leading-none">{fungi.title}</h2>
                                    {/* Edibility Badge */}
                                    <div className={`p-2 rounded-lg ${config.bg} ${config.color} border ${config.border}`}>
                                        <Icon size={14} />
                                    </div>
                                </div>
                                
                                <div className="text-xs font-mono text-stone-500 mb-4 flex items-center gap-2">
                                    <Sprout size={12} /> {fungi.substrate}
                                </div>

                                <p className="text-stone-400 text-sm line-clamp-2 leading-relaxed mb-6">
                                    {fungi.extract}
                                </p>

                                <button className="w-full py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[10px] font-bold uppercase tracking-widest text-stone-300 transition-colors flex items-center justify-center gap-2">
                                    <Microscope size={12} /> Analyze Spores
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {/* Loading Skeletons */}
            {loading && [1,2,3,4].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-purple-900/10 border border-purple-500/10 animate-pulse" />
            ))}
        </div>

      </div>
    </main>
  );
}
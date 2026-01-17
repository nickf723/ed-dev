"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ORGANELLES } from "./cytology-data";
import CellVisualizer from "./CellVisualizer";
import { useWikiCytology } from "./useWikiCytology";
import { ArrowLeft, Microscope, Activity, Database, Zap } from "lucide-react";

export default function CytologyPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Connect to Wiki API
  const { data: wikiData, loading } = useWikiCytology(activeId);
  const activeOrganelle = ORGANELLES.find(o => o.id === activeId);

  return (
    <main className="min-h-screen bg-[#020405] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden flex flex-col md:flex-row">
      
      {/* 1. VISUALIZER (Left / Center) */}
      <div className="flex-1 relative h-[60vh] md:h-screen bg-[#020405]">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          
          {/* Header Overlay */}
          <div className="absolute top-0 left-0 p-8 z-10 pointer-events-none">
               <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-400 transition-colors mb-4 pointer-events-auto">
                   <ArrowLeft size={10} /> Biology Dept
               </Link>
               <h1 className="text-4xl font-black text-white tracking-tighter">CYTOLOGY</h1>
               <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase mt-2">
                   <Microscope size={12} className="text-emerald-500" />
                   Magnification: 4000x
               </div>
          </div>

          <CellVisualizer activeId={activeId} onHover={setActiveId} />
      </div>

      {/* 2. ANALYSIS PANEL (Right) */}
      <div className="w-full md:w-96 bg-[#050a0a] border-l border-white/5 flex flex-col h-[40vh] md:h-screen z-10">
          
          {/* Empty State */}
          {!activeOrganelle ? (
             <div className="flex-1 flex flex-col items-center justify-center text-stone-600 p-8 text-center">
                 <Activity size={40} className="mb-4 opacity-20 animate-pulse" />
                 <div className="text-xs font-bold uppercase tracking-widest">Select an Organelle</div>
                 <div className="text-[10px] mt-2 max-w-[200px]">Hover over cellular structures to initiate biochemical analysis.</div>
             </div>
          ) : (
             <div className="flex-1 flex flex-col animate-in slide-in-from-right-4 duration-300">
                 
                 {/* Top: Header */}
                 <div className="p-8 border-b border-white/5" style={{ borderColor: `${activeOrganelle.color}33` }}>
                     <div className="text-[10px] font-mono font-bold uppercase mb-2" style={{ color: activeOrganelle.color }}>
                         Identified Structure
                     </div>
                     <h2 className="text-3xl font-black text-white leading-none mb-4">{activeOrganelle.label}</h2>
                     <div className="flex gap-2">
                         <span className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase text-stone-400 border border-white/5">
                             Count: {activeOrganelle.count}
                         </span>
                         <span className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase text-stone-400 border border-white/5">
                             Func: {activeOrganelle.role}
                         </span>
                     </div>
                 </div>

                 {/* Middle: Data */}
                 <div className="p-8 flex-1 overflow-y-auto">
                     {loading ? (
                         <div className="space-y-4 animate-pulse">
                             <div className="h-40 bg-white/5 rounded-lg" />
                             <div className="h-4 bg-white/5 rounded w-3/4" />
                             <div className="h-4 bg-white/5 rounded w-1/2" />
                         </div>
                     ) : (
                         <>
                             {wikiData?.thumbnail && (
                                 <div className="h-40 w-full mb-6 rounded-lg overflow-hidden border border-white/10 relative">
                                     
                                     <img src={wikiData.thumbnail} className="w-full h-full object-cover opacity-80" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                         <div className="text-[9px] font-mono text-white/60">MICROGRAPH</div>
                                     </div>
                                 </div>
                             )}
                             
                             <div className="prose prose-invert prose-sm">
                                 <p className="text-stone-300 leading-relaxed text-sm">
                                     {wikiData?.extract || activeOrganelle.desc}
                                 </p>
                             </div>

                             <div className="mt-8 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                                 <div>
                                     <div className="text-[9px] uppercase text-stone-500 mb-1">Energy Output</div>
                                     <div className="flex items-center gap-1 text-xs font-bold text-white">
                                         <Zap size={12} className="text-amber-500" /> High
                                     </div>
                                 </div>
                                 <div>
                                     <div className="text-[9px] uppercase text-stone-500 mb-1">Data Storage</div>
                                     <div className="flex items-center gap-1 text-xs font-bold text-white">
                                         <Database size={12} className="text-purple-500" /> Secure
                                     </div>
                                 </div>
                             </div>
                         </>
                     )}
                 </div>

                 {/* Bottom: Action */}
                 <div className="p-4 bg-black/20 border-t border-white/5">
                     <button className="w-full py-3 rounded border border-white/10 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:bg-white/5 hover:text-white transition-colors">
                         Full Cytological Report
                     </button>
                 </div>
             </div>
          )}
      </div>
    </main>
  );
}
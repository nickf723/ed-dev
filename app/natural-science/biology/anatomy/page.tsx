"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ANATOMY_DATA, SystemType } from "./anatomy-data";
import AnatomyVisualizer from "./AnatomyVisualizer";
import { useWikiAnatomy } from "./useWikiAnatomy";
import { ArrowLeft, Scan, Activity, ArrowRight, Database, Globe } from "lucide-react";

export default function AnatomyPage() {
  const [activeSystemId, setActiveSystemId] = useState<SystemType | null>(null);

  // Hook into API
  const { data: wikiData, loading } = useWikiAnatomy(activeSystemId);
  const activeData = ANATOMY_DATA.find(s => s.type === activeSystemId);

  return (
    <main className="min-h-screen bg-[#050a0f] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden flex flex-col md:flex-row">
      
      {/* 1. CONTROL PANEL (Left Side) */}
      <div className="w-full md:w-96 bg-[#020508] border-r border-white/5 flex flex-col z-20 order-2 md:order-1 h-[40vh] md:h-screen">
          
          {/* Header */}
          <div className="p-8 border-b border-white/5 shrink-0">
               <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 hover:text-cyan-400 transition-colors mb-4">
                   <ArrowLeft size={10} /> Biology Dept
               </Link>
               <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                   ANATOMY
               </h1>
               <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase">
                   <Scan size={12} className={activeSystemId ? "text-cyan-500 animate-pulse" : ""} />
                   {activeSystemId ? "Scanning Active" : "Standby Mode"}
               </div>
          </div>

          {/* System List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {ANATOMY_DATA.map((system) => {
                  const Icon = system.icon;
                  const isActive = activeSystemId === system.type;
                  
                  return (
                      <div 
                          key={system.id}
                          onMouseEnter={() => setActiveSystemId(system.type)} // Correctly inferred now
                          // Optional: Keep active if clicked, for now hover is fine
                          className={`
                              group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer
                              ${isActive 
                                ? "bg-white/5 border-white/20" 
                                : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"}
                          `}
                      >
                          {/* Hover Glow */}
                          {isActive && (
                              <div 
                                className="absolute inset-0 rounded-xl opacity-5 transition-colors pointer-events-none"
                                style={{ backgroundColor: system.color }} 
                              />
                          )}

                          <div className="flex items-start gap-4 relative z-10">
                              <div 
                                className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? "text-black scale-110" : "text-stone-500 group-hover:text-stone-300"}`}
                                style={{ backgroundColor: isActive ? system.color : 'rgba(255,255,255,0.05)' }}
                              >
                                  <Icon size={20} />
                              </div>
                              
                              <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                      <h3 className={`font-bold text-sm transition-colors ${isActive ? "text-white" : "text-stone-300"}`}>
                                          {system.label}
                                      </h3>
                                      {isActive && <ArrowRight size={14} className="text-stone-400 animate-in slide-in-from-left-2" />}
                                  </div>
                                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 group-hover:text-stone-400 transition-colors">
                                      {system.desc}
                                  </p>
                              </div>
                          </div>
                      </div>
                  )
              })}
          </div>
      </div>


      {/* 2. VISUALIZER PANEL (Right Side) */}
      <div className="flex-1 relative order-1 md:order-2 h-[60vh] md:h-screen bg-gradient-to-b from-[#050a0f] via-[#081018] to-[#050a0f] overflow-hidden">
          
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-4 w-full animate-scan pointer-events-none" style={{animationDuration: '4s'}} />

          {/* Canvas Container */}
          <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-full h-full max-w-2xl relative">
                   <AnatomyVisualizer 
                      activeSystem={activeSystemId} 
                      color={activeData?.color || '#38bdf8'} 
                   />
               </div>
          </div>

          {/* API DATA OVERLAY (The "Uplink" Panel) */}
          {activeData && (
              <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-96 p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                  {/* Decorative Header */}
                  <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: activeData.color }}>
                          <Activity size={12} /> Live Uplink
                      </div>
                      {loading ? (
                          <div className="text-[10px] font-mono text-stone-500 animate-pulse">FETCHING...</div>
                      ) : (
                          <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                              ONLINE <Globe size={10} />
                          </div>
                      )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex gap-4">
                       {/* Wiki Image (if loaded) */}
                       {wikiData?.image ? (
                           <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 overflow-hidden shrink-0">
                               

[Image of Human digestive system]

                               <img src={wikiData.image} alt="Anatomy" className="w-full h-full object-cover opacity-80" />
                           </div>
                       ) : (
                           <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                               <Database size={20} className="text-stone-700" />
                           </div>
                       )}

                       <div className="flex-1">
                           <div className="text-2xl font-black text-white leading-none mb-1">
                               {activeData.stat}
                           </div>
                           <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-3">
                               Estimated Metric
                           </div>
                           
                           {/* Wiki Extract */}
                           <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                               {wikiData?.extract || "Establishing connection to global medical archives..."}
                           </p>
                       </div>
                  </div>

                  {/* Footer Link */}
                  {wikiData?.url && (
                      <a href={wikiData.url} target="_blank" rel="noopener noreferrer" className="block mt-4 pt-3 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors">
                          Access Full Medical Record
                      </a>
                  )}
              </div>
          )}

      </div>
    </main>
  );
}
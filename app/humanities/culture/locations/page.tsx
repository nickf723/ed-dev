"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import HoloGlobe from "./HoloGlobe";
import { LOCATIONS, Region, Sector } from './locationsData';
import { 
  Globe, Map, Filter, Search, 
  Wifi, ShieldCheck, ArrowRight, Lock
} from "lucide-react";

export default function LocationsHub() {
  const [filterRegion, setFilterRegion] = useState<Region | 'All'>('All');
  const [filterSector, setFilterSector] = useState<Sector | 'All'>('All');
  const [search, setSearch] = useState("");

  // Filtering Logic
  const filtered = LOCATIONS.filter(loc => {
      const matchRegion = filterRegion === 'All' || loc.region === filterRegion;
      const matchSector = filterSector === 'All' || loc.sector.includes(filterSector);
      const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase());
      return matchRegion && matchSector && matchSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <HoloGlobe />
      
      <div className="relative z-10 flex h-screen overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col w-80 bg-slate-900/80 backdrop-blur-md border-r border-slate-700 h-full p-6 z-20">
            <div className="flex items-center gap-3 text-cyan-400 mb-8 uppercase tracking-widest font-bold text-xs">
                <Globe size={16} /> Global Command
            </div>

            {/* SEARCH */}
            <div className="relative mb-8">
                <input 
                    type="text" 
                    placeholder="Search coordinates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                />
                <Search size={14} className="absolute left-3 top-3 text-slate-500" />
            </div>

            {/* FILTERS */}
            <div className="space-y-8 overflow-y-auto">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase mb-4">
                        <Filter size={10} /> Region Protocol
                    </div>
                    <div className="space-y-1">
                        {['All', 'North America', 'Asia', 'Africa', 'Europe'].map(r => (
                            <button
                                key={r}
                                onClick={() => setFilterRegion(r as any)}
                                className={`w-full text-left px-3 py-2 rounded text-xs font-bold uppercase transition-all flex justify-between ${filterRegion === r ? 'bg-cyan-900/30 text-cyan-400 border-l-2 border-cyan-400' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
                            >
                                {r}
                                {filterRegion === r && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase mb-4">
                        <Map size={10} /> Sector Analysis
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Tech', 'History', 'Nature', 'Urban'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterSector(s as any)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${filterSector === s ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER STATS */}
            <div className="mt-auto pt-6 border-t border-slate-700">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase mb-1">
                    <span>Network Status</span>
                    <span className="text-green-500">Connected</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                    <span>Active Nodes</span>
                    <span className="text-cyan-400">{filtered.length}</span>
                </div>
            </div>
        </aside>

        {/* MAIN GRID */}
        <div className="flex-1 h-full overflow-y-auto p-6 md:p-12 relative scroll-smooth">
             <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                 <div>
                     <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                         Location <span className="text-cyan-500">Uplink</span>
                     </h1>
                     <p className="text-slate-400 font-mono text-sm">
                         // SELECT TARGET TO INITIALIZE TELEMETRY
                     </p>
                 </div>
                 <div className="flex gap-4">
                     <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded flex items-center gap-2 text-xs font-bold text-slate-300 uppercase">
                         <Wifi size={14} className="text-green-500" /> Signal Strong
                     </div>
                     <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded flex items-center gap-2 text-xs font-bold text-slate-300 uppercase">
                         <ShieldCheck size={14} className="text-cyan-500" /> Secure
                     </div>
                 </div>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filtered.map(loc => (
                     <Link 
                        key={loc.id} 
                        href={loc.status === 'Online' ? loc.link : '#'}
                        className={`group relative h-64 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500 transition-all duration-300 flex flex-col justify-end ${loc.status !== 'Online' ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
                     >
                         {/* Image BG */}
                         <div className="absolute inset-0">
                             <div 
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${loc.image})` }}
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                         </div>

                         {/* Overlay Content */}
                         <div className="relative z-10 p-6">
                             <div className="flex justify-between items-start mb-2">
                                 <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/30 backdrop-blur-md">
                                     {loc.coords}
                                 </div>
                                 {loc.status === 'Locked' ? (
                                     <Lock size={14} className="text-red-500" />
                                 ) : (
                                     <div className={`w-2 h-2 rounded-full ${loc.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                                 )}
                             </div>
                             
                             <h2 className="text-2xl font-black text-white uppercase mb-1 group-hover:text-cyan-400 transition-colors">{loc.name}</h2>
                             <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-mono leading-relaxed">
                                 {loc.desc}
                             </p>

                             <div className="flex gap-2">
                                 {loc.sector.map(s => (
                                     <span key={s} className="text-[9px] font-bold uppercase bg-white/10 px-2 py-1 rounded text-white border border-white/10">
                                         {s}
                                     </span>
                                 ))}
                             </div>
                             
                             {loc.status === 'Online' && (
                                 <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                     <ArrowRight size={20} className="text-cyan-400" />
                                 </div>
                             )}
                         </div>
                     </Link>
                 ))}
             </div>
             
             {filtered.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-700 rounded-xl text-slate-500">
                     <Search size={32} className="mb-4 opacity-50" />
                     <p className="text-sm font-mono uppercase">No signals detected in this sector.</p>
                 </div>
             )}

        </div>
      </div>
    </main>
  );
}
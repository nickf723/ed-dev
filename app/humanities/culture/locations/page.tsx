"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import HoloGlobe from "./HoloGlobe";
import CommandSidebar from "./CommandSidebar";
import LocationDetailPanel from "./LocationDetailPanel"; // New Import
import { LOCATIONS } from './locationsData';
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

const TacticalMap = dynamic(() => import('./TacticalMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-cyan-500/50">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <div className="font-mono text-xs tracking-widest animate-pulse">INITIALIZING SAT-LINK...</div>
    </div>
  )
});

export default function LocationsHub() {
  const [activeId, setActiveId] = useState<string | null>('global');

  // Find the actual data object for the panel
  const activeLocation = LOCATIONS.find(l => l.id === activeId) || null;

  return (
    <main className="relative h-screen w-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex">
      
      {/* 1. VISUAL ENGINE */}
      <HoloGlobe />
      
      {/* 2. SIDEBAR */}
      <div className="hidden md:block h-full shrink-0 z-30">
          <CommandSidebar 
            activeId={activeId} 
            onSelect={setActiveId} 
          />
      </div>

      {/* 3. MAIN MAP AREA */}
      <div className="flex-1 relative h-full z-10">
          
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 z-[400] flex justify-between items-start pointer-events-none">
              <div className="pointer-events-auto">
                   <Link href="/humanities/culture" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white bg-slate-900/80 backdrop-blur px-3 py-2 rounded border border-slate-700 transition-colors">
                        <ArrowLeft size={12} /> Exit System
                   </Link>
              </div>
              <div className="text-right">
                  <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-cyan-900/50 text-cyan-500 text-[10px] font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      LIVE FEED // OPEN-METEO API
                  </div>
              </div>
          </div>

          {/* THE MAP */}
          <TacticalMap activeId={activeId} onSelect={setActiveId} />
          
          {/* 4. THE DETAIL PANEL (Overlays the Map) */}
          {activeId !== 'global' && (
              <LocationDetailPanel 
                loc={activeLocation} 
                onClose={() => setActiveId('global')} 
              />
          )}

          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.03] invert" />
      </div>

    </main>
  );
}
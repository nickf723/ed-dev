"use client";
import React from 'react';
import { Clock, Map, BookOpen } from 'lucide-react';
import HistoryBackground from './_components/HistoryBackground';
import TimeScaleLab from './_components/TimeScaleLab';
import ChronologyTimeline from './_components/ChronologyTimeline';
import RegionMap from './_components/RegionMap';
import ThemeNetwork from './_components/ThemeNetwork';

export default function HistoryHubPage() {
  return (
    <main className="relative min-h-screen bg-[#050403] overflow-hidden selection:bg-amber-900/30 font-sans">
      <HistoryBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-amber-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-amber-500"></span>
                     The Humanities
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     HISTORY
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     The collective memory of the human species. History isn't just a list of dates and dead kings; it is the chaotic, brilliant, and brutal story of <strong className="text-white font-semibold">how we got here.</strong>
                 </p>
             </div>
         </div>

         {/* CONCEPT ZERO */}
         <div className="mb-32">
             <TimeScaleLab />
         </div>

         {/* THE THREE PILLARS */}
         <div className="space-y-32 mb-24">
             
             {/* PILLAR 1: CHRONOLOGY */}
             <section>
                 <div className="flex items-center gap-4 mb-8 border-b border-neutral-900 pb-4">
                     <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-lg text-amber-500">
                         <Clock size={24} />
                     </div>
                     <div>
                         <h2 className="text-3xl font-black text-white tracking-tight">Chronology</h2>
                         <p className="text-sm text-neutral-500 font-mono tracking-widest uppercase mt-1">The Arrow of Time</p>
                     </div>
                 </div>
                 <ChronologyTimeline />
             </section>

             {/* PILLAR 2: REGION */}
             <section>
                 <div className="flex items-center gap-4 mb-8 border-b border-neutral-900 pb-4">
                     <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-emerald-500">
                         <Map size={24} />
                     </div>
                     <div>
                         <h2 className="text-3xl font-black text-white tracking-tight">Region</h2>
                         <p className="text-sm text-neutral-500 font-mono tracking-widest uppercase mt-1">Spatial Geopolitics</p>
                     </div>
                 </div>
                 <RegionMap />
             </section>

             {/* PILLAR 3: THEME */}
             <section>
                 <div className="flex items-center gap-4 mb-8 border-b border-neutral-900 pb-4">
                     <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-lg text-indigo-500">
                         <BookOpen size={24} />
                     </div>
                     <div>
                         <h2 className="text-3xl font-black text-white tracking-tight">Theme</h2>
                         <p className="text-sm text-neutral-500 font-mono tracking-widest uppercase mt-1">The Ontology of Human Endeavor</p>
                     </div>
                 </div>
                 <ThemeNetwork />
             </section>

         </div>
      </div>
    </main>
  );
}
"use client";
import React, { useState } from "react";
import HistoryBackground from "./_components/HistoryBackground";
import HistoryChronos from "./_components/HistoryChronos"; // Import new file
import HistoryAtlas from "./_components/HistoryAtlas";     // Import new file
import HistoryNexus from "./_components/HistoryNexus";     // Import new file
import { ArrowLeft, Clock, Globe, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState<'TIME' | 'SPACE' | 'THEME'>('TIME');

  return (
    <main className="relative min-h-screen bg-[#050505] text-stone-200 selection:bg-amber-500/30 font-sans overflow-x-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <HistoryBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-0" />

      {/* 2. LAYOUT CONTAINER (The Sidebar Fix) */}
      {/* pl-80 ensures content starts AFTER the sidebar (72 + padding) */}
      <div className="relative z-10 pl-0 md:pl-80 transition-all duration-300">
          
          {/* 3. NAVIGATION DECK */}
          <header className="sticky top-0 z-40 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-[#050505] to-transparent">
             <div className="flex items-center gap-8 w-full md:w-auto">
                 <Link href="/humanities" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
                    <span className="text-xs font-bold uppercase tracking-widest">Exit Sim</span>
                 </Link>
                 
                 {/* MODE SWITCHER */}
                 <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
                     <button onClick={() => setViewMode('TIME')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'TIME' ? 'bg-white text-black shadow-lg' : 'text-stone-500 hover:text-white'}`}>
                        <Clock size={12} /> Chronos
                     </button>
                     <button onClick={() => setViewMode('SPACE')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'SPACE' ? 'bg-white text-black shadow-lg' : 'text-stone-500 hover:text-white'}`}>
                        <Globe size={12} /> Atlas
                     </button>
                     <button onClick={() => setViewMode('THEME')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'THEME' ? 'bg-white text-black shadow-lg' : 'text-stone-500 hover:text-white'}`}>
                        <Lightbulb size={12} /> Nexus
                     </button>
                 </div>
             </div>
          </header>

          {/* 4. VIEW RENDERER */}
          <div className="min-h-screen">
            {viewMode === 'TIME' && <HistoryChronos />}
            {viewMode === 'SPACE' && <HistoryAtlas />}
            {viewMode === 'THEME' && <HistoryNexus />}
          </div>

      </div>
    </main>
  );
}
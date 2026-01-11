"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Calendar, ChevronRight } from "lucide-react";

// --- MOCK DATA: THE AGES ---
const ERAS = [
  { id: "ancient", year: -3000, label: "Ancient Era", color: "text-amber-500" },
  { id: "classical", year: -500, label: "Classical Antiquity", color: "text-rose-500" },
  { id: "medieval", year: 500, label: "The Middle Ages", color: "text-emerald-500" },
  { id: "renaissance", year: 1400, label: "The Renaissance", color: "text-purple-500" },
  { id: "industrial", year: 1760, label: "Industrial Revolution", color: "text-cyan-500" },
  { id: "modern", year: 1900, label: "The Modern Age", color: "text-white" },
  { id: "digital", year: 1980, label: "The Digital Age", color: "text-lime-400" },
];

export default function HistoryPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync scroll to state
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  return (
    <main className="relative h-screen bg-[#050505] text-stone-200 font-serif overflow-hidden selection:bg-amber-500/30">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
         <Link href="/humanities" className="pointer-events-auto flex items-center gap-2 text-stone-500 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="text-xs font-bold font-sans uppercase tracking-widest">Return</span>
         </Link>
         
         <div className="text-right">
             <h1 className="text-4xl font-black text-white tracking-tight">CHRONOS</h1>
             <div className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-stone-500">
                 The Record of Human Events
             </div>
         </div>
      </header>

      {/* 2. THE CHRONOMETER (Navigation Rail) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 pointer-events-none">
          {ERAS.map((era, i) => {
              // Calculate if this era is currently "active" based on scroll
              // (Simple mock logic: distribute them evenly across 0-1 range)
              const eraPos = i / (ERAS.length - 1); 
              const isActive = Math.abs(scrollProgress - eraPos) < 0.1;
              
              return (
                  <div key={era.id} className="group flex items-center justify-end gap-4 h-8 pointer-events-auto cursor-pointer">
                      <span className={`
                          text-[10px] font-sans font-bold uppercase tracking-widest transition-all duration-300
                          ${isActive ? `opacity-100 ${era.color} translate-x-0` : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}
                      `}>
                          {era.label}
                      </span>
                      
                      {/* The Tick Mark */}
                      <div className={`
                          w-1 h-1 rounded-full transition-all duration-300
                          ${isActive ? `bg-white scale-150` : "bg-stone-700 group-hover:bg-stone-400"}
                      `} />
                  </div>
              )
          })}
          
          {/* The Progress Line */}
          <div className="absolute top-2 bottom-2 right-[1.5px] w-px bg-stone-800 -z-10" />
          {/* The Moving Indicator */}
          <div 
            className="absolute right-[1.5px] w-px bg-white transition-all duration-75 ease-out"
            style={{ 
                top: '0.5rem', 
                height: `${scrollProgress * 100}%`,
                maxHeight: 'calc(100% - 1rem)'
            }} 
          />
      </div>

      {/* 3. THE Z-AXIS SCROLL CONTAINER */}
      {/* This simulates depth. Items closer to the top are "farther away" in time? 
          Actually, let's do standard vertical scroll but style it to look like depth. */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto scrollbar-hide perspective-1000"
      >
          <div className="relative min-h-[400vh] flex flex-col items-center pt-[50vh] pb-[50vh]">
              
              {ERAS.map((era, i) => (
                  <section 
                    key={era.id} 
                    className="h-screen w-full max-w-4xl mx-auto flex items-center justify-center relative"
                  >
                      {/* Timeline Line connecting sections */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -z-10" />

                      {/* The Content Card */}
                      <div className="relative p-12 bg-black/40 border border-white/5 backdrop-blur-sm rounded-lg text-center transform transition-all hover:scale-105 hover:bg-black/60 hover:border-white/20 group">
                          
                          {/* Year Marker */}
                          <div className={`
                              absolute -top-6 left-1/2 -translate-x-1/2 
                              px-4 py-1 rounded-full bg-[#050505] border border-white/10
                              text-xl font-bold font-sans tracking-widest ${era.color}
                          `}>
                              {Math.abs(era.year)} {era.year < 0 ? 'BCE' : 'CE'}
                          </div>

                          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-600 mb-6">
                              {era.label}
                          </h2>
                          
                          <p className="text-lg text-stone-400 max-w-lg mx-auto leading-relaxed">
                              [Summary of the {era.label}. Key events, figures, and shifts in human consciousness.]
                          </p>

                          <div className="mt-8 flex justify-center gap-4">
                              <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2">
                                  Explore Era <ChevronRight size={12} />
                              </button>
                          </div>
                      </div>

                  </section>
              ))}

          </div>
      </div>

    </main>
  );
}
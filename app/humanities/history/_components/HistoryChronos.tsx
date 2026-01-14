"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Map as MapIcon, Landmark, Sword, Scroll, Fingerprint, Cpu, Calendar } from "lucide-react";

const ERAS = [
  { 
    id: "ancient", year: -3000, label: "Ancient Era", 
    desc: "The cradle of civilization. Empires of stone, golden pharaohs, and the first written words.", 
    color: "text-amber-500", icon: Landmark,
    events: ["Invention of Writing", "Construction of Pyramids", "Code of Hammurabi", "Bronze Age Collapse"]
  },
  { 
    id: "medieval", year: 500, label: "The Middle Ages", 
    desc: "The age of steel and faith. Castles, cathedrals, and the preservation of knowledge in the dark.", 
    color: "text-emerald-500", icon: Sword,
    events: ["Fall of Rome", "The Crusades", "The Black Death", "Magna Carta"]
  },
  { 
    id: "renaissance", year: 1400, label: "The Renaissance", 
    desc: "The rebirth of beauty. Art, exploration, and the human spirit breaking free from dogma.", 
    color: "text-purple-500", icon: Scroll,
    events: ["Printing Press", "Discovery of Americas", "Protestant Reformation", "Scientific Method"]
  },
  { 
    id: "industrial", year: 1760, label: "Industrial Age", 
    desc: "The machine wakes up. Steam, smog, and the gears of progress grinding the world forward.", 
    color: "text-cyan-500", icon: Fingerprint,
    events: ["Steam Engine", "Telegraph", "Urbanization", "Assembly Line"]
  },
  { 
    id: "digital", year: 1980, label: "Digital Age", 
    desc: "The singularity approaches. Information becomes currency and the physical world dissolves.", 
    color: "text-lime-400", icon: Cpu,
    events: ["The Internet", "Personal Computing", "Artificial Intelligence", "Globalization"]
  },
];

export default function HistoryChronos() {
  const [activeEraIndex, setActiveEraIndex] = useState(0);

  // Sync Scroll for Dots
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const sections = container.querySelectorAll('section');
    sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        // Check if section is mostly in view
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveEraIndex(i);
        }
    });
  };

  const scrollToEra = (index: number) => {
      const container = document.getElementById('chronos-container');
      const section = document.getElementById(`era-${index}`);
      if (container && section) {
          section.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div className="relative h-screen w-full">
      
      {/* RIGHT RAIL (Dots) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4 pointer-events-none">
          {ERAS.map((era, i) => (
              <div key={era.id} className="pointer-events-auto cursor-pointer flex items-center gap-4 group" onClick={() => scrollToEra(i)}>
                 <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeEraIndex === i ? `opacity-100 ${era.color} translate-x-0` : "opacity-0 translate-x-4 text-stone-600"}`}>
                    {era.label}
                 </span>
                 <div className={`w-2 h-2 rounded-full transition-all duration-500 border border-white/10 ${activeEraIndex === i ? "bg-white scale-125 shadow-[0_0_10px_white]" : "bg-black/50 hover:bg-stone-500"}`} />
              </div>
          ))}
          <div className="absolute top-2 bottom-2 right-[3px] w-px bg-white/10 -z-10" />
      </div>

      {/* SNAP CONTAINER */}
      <div 
        id="chronos-container"
        onScroll={handleScroll}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide pt-20" // pt-20 pushes content down from header
      >
         
         {/* INTRO SPACER */}
         <div className="h-[80vh] w-full flex flex-col items-center justify-center snap-start">
             <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                 <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                    Scroll to Begin
                 </div>
                 <ChevronDown className="mx-auto text-stone-600 animate-bounce" />
             </div>
         </div>

         {/* SECTIONS */}
         {ERAS.map((era, i) => {
             const EraIcon = era.icon;
             return (
              <section 
                key={era.id} 
                id={`era-${i}`}
                className="h-screen w-full flex items-center justify-center snap-start relative p-8"
              >
                  {/* Content Card */}
                  <div className={`
                      relative max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center
                      transition-all duration-1000 transform
                      ${activeEraIndex === i ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-12 blur-sm'}
                  `}>
                      
                      {/* Left: Typography */}
                      <div>
                          <div className="flex items-center gap-4 mb-6">
                              <div className={`p-3 rounded-xl border border-white/10 bg-white/5 ${era.color}`}>
                                  <EraIcon size={24} />
                              </div>
                              <div className={`text-5xl font-black ${era.color} opacity-30`}>
                                  {Math.abs(era.year)}
                              </div>
                          </div>
                          <h2 className="text-7xl md:text-9xl font-black text-white mb-6 leading-[0.8] tracking-tighter">
                              {era.label.split(' ').map((word, idx) => (
                                  <span key={idx} className="block">{word}</span>
                              ))}
                          </h2>
                          <p className="text-xl text-stone-400 leading-relaxed border-l-2 border-white/10 pl-6">
                              {era.desc}
                          </p>
                      </div>

                      {/* Right: Data Points (Filling the sparseness) */}
                      <div className="space-y-6">
                          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-4 flex items-center gap-2">
                              <Calendar size={12} /> Key Developments
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                              {era.events.map((event, idx) => (
                                  <div key={idx} className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                                      <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors">{event}</span>
                                      <div className={`w-1.5 h-1.5 rounded-full ${era.color.replace('text-', 'bg-')} opacity-50 group-hover:opacity-100 shadow-[0_0_8px_currentColor]`} />
                                  </div>
                              ))}
                          </div>
                          
                          <div className="mt-8 p-4 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm text-center">
                              <div className="text-[10px] uppercase tracking-widest text-stone-600">Era Completeness</div>
                              <div className="mt-2 h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${era.color.replace('text-', 'bg-')} w-3/4 animate-pulse`} />
                              </div>
                          </div>
                      </div>

                  </div>
              </section>
             )
         })}
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { Map, Flag, Crosshair } from 'lucide-react';

export default function ContestedMapLab() {
  const [year, setYear] = useState<1750 | 1800 | 1850>(1750);

  // SVG coordinates for a simplified North America map
  const renderMap = () => {
    switch(year) {
      case 1750:
        return (
          <>
            {/* New France (Vast central/northern claim) */}
            <path d="M 100 20 L 250 20 L 250 150 L 150 220 L 100 150 Z" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" />
            {/* British Colonies (East Coast/North) */}
            <path d="M 250 20 L 300 30 L 280 180 L 250 150 Z" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" />
            {/* New Spain (South/West) */}
            <path d="M 20 100 L 100 150 L 150 220 L 250 150 L 280 180 L 250 220 L 150 280 L 50 200 Z" fill="rgba(234, 179, 8, 0.4)" stroke="#eab308" />
            {/* Unclaimed/Indigenous (Northwest) */}
            <path d="M 10 20 L 100 20 L 100 150 L 20 100 Z" fill="rgba(168, 162, 158, 0.2)" stroke="#a8a29e" strokeDasharray="4" />
          </>
        );
      case 1800:
        return (
          <>
            {/* British North America (Canada) */}
            <path d="M 80 20 L 300 30 L 280 100 L 80 100 Z" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" />
            {/* United States (Expanded to Mississippi) */}
            <path d="M 200 100 L 280 100 L 250 200 L 200 180 Z" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" />
            {/* Spanish Louisiana & New Spain */}
            <path d="M 20 100 L 80 100 L 200 100 L 200 180 L 250 200 L 150 280 L 50 200 Z" fill="rgba(234, 179, 8, 0.4)" stroke="#eab308" />
            {/* Russian/Disputed Northwest */}
            <path d="M 10 20 L 80 20 L 80 100 L 20 100 Z" fill="rgba(168, 162, 158, 0.2)" stroke="#a8a29e" strokeDasharray="4" />
          </>
        );
      case 1850:
        return (
          <>
            {/* British North America (Canada) */}
            <path d="M 10 20 L 300 30 L 280 100 L 10 90 Z" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" />
            {/* United States (Coast to Coast) */}
            <path d="M 10 90 L 280 100 L 250 200 L 100 220 L 20 180 Z" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" />
            {/* Mexico (Reduced) */}
            <path d="M 20 180 L 100 220 L 250 200 L 150 280 L 50 200 Z" fill="rgba(234, 179, 8, 0.4)" stroke="#eab308" />
          </>
        );
    }
  };

  const getInfo = () => {
    switch(year) {
      case 1750: return { title: "Imperial Peak", desc: "France controls the vast interior river networks, Britain clings to the dense eastern seaboard, and Spain claims the south and west. Unmapped Indigenous empires control the reality on the ground." };
      case 1800: return { title: "Post-Revolution", desc: "Following the Seven Years' War and the American Revolution, France is expelled. The newly formed United States expands to the Mississippi, while Spain holds a massive, fragile empire." };
      case 1850: return { title: "Manifest Destiny", desc: "The United States brutally expands to the Pacific following the Mexican-American war. The modern borders of Canada (British), the USA, and Mexico solidify." };
    }
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-sky-400 flex items-center gap-2 tracking-widest">
                <Map size={14} /> The Contested Continent
            </div>
            
            <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                <button onClick={() => setYear(1750)} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${year === 1750 ? 'bg-sky-600 text-white' : 'text-neutral-500 hover:text-white'}`}>1750</button>
                <button onClick={() => setYear(1800)} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${year === 1800 ? 'bg-sky-600 text-white' : 'text-neutral-500 hover:text-white'}`}>1800</button>
                <button onClick={() => setYear(1850)} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${year === 1850 ? 'bg-sky-600 text-white' : 'text-neutral-500 hover:text-white'}`}>1850</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* SVG MAP */}
            <div className="bg-[#020810] relative p-8 flex justify-center items-center min-h-[350px] overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
                 <svg viewBox="0 0 320 300" className="w-full h-full max-w-[320px] drop-shadow-2xl relative z-10">
                    <path d="M 5 15 C 100 -20, 250 10, 310 20 C 310 100, 280 180, 260 220 C 180 300, 100 250, 40 200 C 0 150, 0 80, 5 15 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    {renderMap()}
                 </svg>
            </div>

            {/* DATA PANEL */}
            <div className="p-8 bg-neutral-900/30 flex flex-col justify-center gap-6">
                <div className="bg-black/40 p-5 rounded-xl border border-neutral-800 min-h-[160px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Crosshair size={16} className="text-sky-400" />
                        <h4 className="text-white font-black tracking-tight text-xl">
                            {getInfo().title}
                        </h4>
                    </div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-2">
                        Geopolitical State: {year}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                        {getInfo().desc}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
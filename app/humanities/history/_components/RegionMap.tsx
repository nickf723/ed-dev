"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const REGIONS = [
  { id: 'americas', title: 'The Americas', cx: 200, cy: 150, r: 60 },
  { id: 'europe', title: 'Europe', cx: 420, cy: 100, r: 35 },
  { id: 'africa', title: 'Africa', cx: 400, cy: 200, r: 50 },
  { id: 'asia', title: 'Asia', cx: 580, cy: 120, r: 70 },
  { id: 'oceania', title: 'Oceania', cx: 680, cy: 250, r: 35 }
];

export default function RegionMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[400px] bg-black/40 border border-neutral-800 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <svg viewBox="0 0 800 400" className="w-full h-full relative z-10">
        {/* Connection lines between continents */}
        <path d="M 200 150 Q 300 100 420 100 T 580 120 M 420 100 L 400 200 M 580 120 L 400 200 M 580 120 Q 650 150 680 250" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="2" strokeDasharray="4 4" />

        {REGIONS.map((region) => {
          const isActive = activeRegion === region.id;
          return (
            <Link href={`/humanities/history/regional/${region.id}`} key={region.id} onMouseEnter={() => setActiveRegion(region.id)} onMouseLeave={() => setActiveRegion(null)}>
              {/* Radar Ping Effect */}
              <circle cx={region.cx} cy={region.cy} r={region.r} fill="none" stroke="#10b981" strokeWidth="1" className={`transition-all duration-700 origin-center ${isActive ? 'animate-ping opacity-50' : 'opacity-0'}`} />
              
              {/* Region Node */}
              <circle cx={region.cx} cy={region.cy} r={isActive ? region.r : region.r * 0.8} fill={isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.05)'} stroke={isActive ? '#34d399' : '#047857'} strokeWidth={isActive ? 2 : 1} className="transition-all duration-300 cursor-pointer backdrop-blur-sm" />
              
              {/* Target Dot */}
              <circle cx={region.cx} cy={region.cy} r="4" fill={isActive ? '#fff' : '#10b981'} className="transition-colors duration-300" />
            </Link>
          );
        })}
      </svg>

      {/* Dynamic Data Panel */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
        {activeRegion ? (
          <div className="bg-emerald-950/80 backdrop-blur border border-emerald-500/50 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2">
             <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Target Locked</div>
             <div className="text-2xl font-black text-white">{REGIONS.find(r => r.id === activeRegion)?.title}</div>
             <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mt-2">
                 Access Geopolitics <ArrowRight size={14} />
             </div>
          </div>
        ) : (
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Awaiting spatial selection...</div>
        )}
      </div>
    </div>
  );
}
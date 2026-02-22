"use client";
import React, { useState } from 'react';
import { Map, Flag, Compass, Anchor } from 'lucide-react';

export default function ExpansionLab() {
  const [year, setYear] = useState(1776);

  // Simplified SVG paths representing regions
  const regions = [
    { id: '13-colonies', name: '13 Colonies & Treaty of Paris', year: 1783, color: '#3b82f6', d: "M 220 50 L 280 40 L 290 120 L 250 180 L 210 170 Z", desc: "The original colonial rebellion against the British Empire, securing land to the Mississippi River." },
    { id: 'louisiana', name: 'Louisiana Purchase', year: 1803, color: '#10b981', d: "M 130 30 L 220 50 L 210 170 L 150 180 L 110 100 Z", desc: "Purchased from Napoleon for $15M. It instantly doubled the size of the nation and secured control of the vital Mississippi River." },
    { id: 'florida', name: 'Florida Cession', year: 1819, color: '#f59e0b', d: "M 250 180 L 290 190 L 280 230 L 240 190 Z", desc: "Acquired from Spain via the Adams-Onís Treaty, securing the southeastern coastline." },
    { id: 'texas', name: 'Texas Annexation', year: 1845, color: '#ef4444', d: "M 110 130 L 170 140 L 150 210 L 90 220 Z", desc: "The Republic of Texas joins the Union, sparking extreme tension over the expansion of slavery and provoking war with Mexico." },
    { id: 'oregon', name: 'Oregon Territory', year: 1846, color: '#8b5cf6', d: "M 40 10 L 130 30 L 110 80 L 30 70 Z", desc: "Divided with Great Britain at the 49th parallel, fulfilling the Pacific northwest expansion." },
    { id: 'mexican-cession', name: 'Mexican Cession', year: 1848, color: '#ec4899', d: "M 30 70 L 110 80 L 110 130 L 90 220 L 20 150 Z", desc: "Conquered following the Mexican-American War. Included modern California, Nevada, and Utah, completing 'Manifest Destiny'." },
  ];

  // Find the most recently acquired region based on the slider
  const activeRegion = [...regions].reverse().find(r => year >= r.year) || regions[0];

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-blue-500 flex items-center gap-2 tracking-widest">
                <Compass size={14} /> Territorial Expansion
            </div>
            <div className="px-4 py-1.5 rounded bg-blue-950/30 border border-blue-500/30 text-xl font-black text-white font-mono">
                {year}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* SVG MAP */}
            <div className="bg-[#010814] relative p-8 flex justify-center items-center min-h-[350px] overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
                 <svg viewBox="0 0 320 250" className="w-full h-full max-w-[320px] drop-shadow-2xl">
                    {/* Outline of North America context */}
                    <path d="M 10 10 Q 150 -20 300 10 Q 350 150 280 240 Q 150 280 20 200 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    
                    {regions.map((region) => {
                        const isVisible = year >= region.year;
                        const isLatest = activeRegion.id === region.id && year >= region.year;
                        
                        return (
                            <path 
                                key={region.id}
                                d={region.d}
                                fill={isVisible ? region.color : 'transparent'}
                                fillOpacity={isVisible ? (isLatest ? 0.8 : 0.3) : 0}
                                stroke={isVisible ? '#fff' : 'rgba(255,255,255,0.1)'}
                                strokeWidth={isLatest ? 2 : 1}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                 </svg>
            </div>

            {/* DATA PANEL */}
            <div className="p-8 bg-neutral-900/30 flex flex-col justify-center gap-6">
                
                <div className="bg-black/40 p-5 rounded-xl border border-neutral-800 min-h-[160px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Flag size={16} color={activeRegion.color} />
                        <h4 className="text-white font-black tracking-tight text-lg" style={{ color: activeRegion.color }}>
                            {year >= activeRegion.year ? activeRegion.name : "British Colonies"}
                        </h4>
                    </div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-2">
                        Acquired: {year >= activeRegion.year ? activeRegion.year : "Pre-1776"}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        {year >= activeRegion.year ? activeRegion.desc : "Subject to the British Crown. Tensions over taxation without representation are boiling over."}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-blue-500 mb-2 tracking-widest">
                        <span>Timeline Scrub</span>
                    </div>
                    <input 
                        type="range" min="1770" max="1853" step="1" 
                        value={year} onChange={e => setYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

            </div>
        </div>
    </div>
  );
}
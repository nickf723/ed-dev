"use client";
import React, { useState } from 'react';
import { Hourglass, ChevronRight, Globe2 } from 'lucide-react';

export default function TimeScaleLab() {
  const [zoomLevel, setZoomLevel] = useState(0); // 0 (Deep History) to 100 (Modern)

  // Eras data mapping
  const eras = [
    { start: 300000, end: 12000, label: "Paleolithic (Hunter-Gatherer)", color: "bg-stone-600" },
    { start: 12000, end: 5000, label: "Neolithic (Agriculture)", color: "bg-emerald-700" },
    { start: 5000, end: 1500, label: "Ancient Empires", color: "bg-amber-600" },
    { start: 1500, end: 500, label: "Middle Ages", color: "bg-purple-700" },
    { start: 500, end: 0, label: "Modernity", color: "bg-blue-600" }
  ];

  // Calculate current view scope based on zoom
  // Zoom 0 = 300,000 years view. Zoom 100 = 5,000 years view.
  const currentSpan = 300000 - (zoomLevel * 2950); 
  
  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-amber-500 flex items-center gap-2 tracking-widest">
                <Hourglass size={14} /> The Compression of Time
            </div>
            <div className="px-3 py-1 rounded bg-amber-900/20 border border-amber-500/30 text-[10px] font-bold uppercase text-amber-400 font-mono">
                Span: {currentSpan.toLocaleString()} Years
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-[#0a0806] relative p-8 flex flex-col justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-neutral-800">
                 
                 <div className="w-full h-12 flex rounded-sm overflow-hidden border border-neutral-800 shadow-inner bg-black relative">
                     {eras.map((era, i) => {
                         // Calculate width percentage relative to currentSpan
                         // If era is outside currentSpan, it won't render or will be tiny
                         const visibleStart = Math.min(currentSpan, era.start);
                         const visibleEnd = Math.max(0, era.end);
                         
                         if (visibleStart <= visibleEnd) return null; // Out of view

                         const widthPct = ((visibleStart - visibleEnd) / currentSpan) * 100;

                         return (
                             <div 
                                key={i} 
                                className={`${era.color} h-full flex items-center justify-center border-r border-black/50 transition-all duration-300 group relative`}
                                style={{ width: `${widthPct}%` }}
                             >
                                 {widthPct > 15 && (
                                     <span className="text-[9px] font-bold text-white/80 uppercase truncate px-2">
                                         {era.label}
                                     </span>
                                 )}
                             </div>
                         );
                     })}
                 </div>

                 <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                     <span>{currentSpan.toLocaleString()} BCE</span>
                     <span>PRESENT</span>
                 </div>
            </div>

            {/* DATA PANEL */}
            <div className="p-8 bg-neutral-900/30 flex flex-col justify-center gap-6">
                
                <div className="bg-black/40 p-5 rounded-xl border border-neutral-800">
                    <h4 className="text-white font-bold tracking-tight mb-2 text-lg">The Recency Illusion</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                        Anatomically modern humans have existed for roughly 300,000 years. If you scroll the timeline all the way left, you will see that <strong>95% of human history</strong> was spent living in nomadic hunter-gatherer bands.
                    </p>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        Recorded history, empires, and technology are a microscopic sliver at the very end of our existence.
                    </p>
                </div>

                <div className="mt-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-amber-500 mb-2 tracking-widest">
                        <span>Zoom Timeline</span>
                        <span>{zoomLevel}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" step="1" 
                        value={zoomLevel} onChange={e => setZoomLevel(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                </div>

            </div>
        </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { Layers, Combine, MinusCircle, XCircle } from 'lucide-react';
import { SET_OPERATIONS } from './_assets/setsData';

export default function SetOperator() {
  const [activeOp, setActiveOp] = useState('union');
  
  const currentOp = SET_OPERATIONS.find(op => op.id === activeOp) || SET_OPERATIONS[0];

  // Logic to determine fill opacity based on region
  const getOpacity = (region: 'A' | 'B' | 'Both') => {
      const inA = region === 'A' || region === 'Both';
      const inB = region === 'B' || region === 'Both';
      const isActive = currentOp.logic(inA, inB);
      return isActive ? 0.8 : 0.1;
  };

  return (
    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-8 shadow-2xl flex flex-col lg:flex-row gap-12">
        
        {/* CONTROLS */}
        <div className="w-full lg:w-80 space-y-6">
            <div className="pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Set Builder</div>
                <h3 className="text-3xl font-black text-white">{currentOp.name}</h3>
                <div className="text-xl font-mono text-cyan-300 mt-2 font-bold">{currentOp.symbol}</div>
            </div>
            
            <p className="text-sm text-slate-400 min-h-[3rem]">
                {currentOp.desc}
            </p>

            <div className="grid grid-cols-2 gap-3">
                {SET_OPERATIONS.map(op => (
                    <button
                        key={op.id}
                        onClick={() => setActiveOp(op.id)}
                        className={`p-3 rounded border text-xs font-bold uppercase transition-all ${activeOp === op.id ? 'bg-cyan-900/50 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                        {op.name}
                    </button>
                ))}
            </div>
        </div>

        {/* VISUALIZER (SVG VENN DIAGRAM) */}
        <div className="flex-1 bg-black/40 rounded-xl border border-slate-700 relative flex items-center justify-center h-[400px]">
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />
             
             <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
                 {/* We construct the Venn Diagram using 3 separate paths 
                    so we can highlight them individually based on logic.
                 */}
                 
                 <defs>
                     <filter id="glow">
                         <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                         <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                     </filter>
                 </defs>

                 {/* Labels */}
                 <text x="110" y="50" fill="#22d3ee" fontSize="24" fontWeight="bold" fontFamily="monospace">A</text>
                 <text x="270" y="50" fill="#e879f9" fontSize="24" fontWeight="bold" fontFamily="monospace">B</text>

                 {/* Circle A (Left) - Using circle for simplicity, opacity handles the intersection visual logic */}
                 <circle 
                    cx="150" cy="150" r="100" 
                    fill="#22d3ee" 
                    fillOpacity={getOpacity('A')} 
                    stroke="#22d3ee" strokeWidth="2"
                    className="transition-all duration-300"
                 />

                 {/* Circle B (Right) - Mix blend mode handles the visual overlap, but we logic-control opacity */}
                 {/* Actually, standard SVG blending is additive if we just layer them. 
                     For precise logic visualization, let's use a mask or just rely on the eye interpreting the overlap.
                     
                     Better yet: We explicitly draw the intersection on TOP with its own logic.
                 */}
                 
                 <circle 
                    cx="250" cy="150" r="100" 
                    fill="#e879f9" 
                    fillOpacity={getOpacity('B')} 
                    stroke="#e879f9" strokeWidth="2"
                    className="transition-all duration-300"
                 />
                 
                 {/* Explicit Intersection Patch (To ensure the 'Both' logic color is distinct if needed) */}
                 <path 
                    d="M 200,63.4 A 100,100 0 0,0 200,236.6 A 100,100 0 0,0 200,63.4" 
                    fill="#ffffff"
                    fillOpacity={getOpacity('Both') > 0.5 ? 0.3 : 0} 
                    className="pointer-events-none transition-all duration-300"
                 />
                 
             </svg>

             {/* Legend */}
             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-[10px] uppercase font-bold text-slate-500">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500/50 rounded-full" /> Set A</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/30 rounded-full" /> Intersection</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-fuchsia-500/50 rounded-full" /> Set B</div>
             </div>
        </div>
    </div>
  );
}
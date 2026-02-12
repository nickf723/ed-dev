"use client";
import React, { useState } from 'react';
import { MoveHorizontal, Minus, ArrowRight } from 'lucide-react';

type Mode = 'line' | 'segment' | 'ray';

export default function LineSubsets() {
  const [mode, setMode] = useState<Mode>('segment');

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
        
        {/* CONTROLS */}
        <div className="w-full md:w-1/3 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Define Bounds
            </div>
            
            <button 
                onClick={() => setMode('line')}
                className={`w-full p-3 rounded border flex items-center justify-between transition-all ${mode === 'line' ? 'bg-cyan-900/30 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
                <span className="text-sm font-bold uppercase">Line</span>
                <MoveHorizontal size={16} />
            </button>
            
            <button 
                onClick={() => setMode('ray')}
                className={`w-full p-3 rounded border flex items-center justify-between transition-all ${mode === 'ray' ? 'bg-cyan-900/30 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
                <span className="text-sm font-bold uppercase">Ray</span>
                <ArrowRight size={16} />
            </button>

            <button 
                onClick={() => setMode('segment')}
                className={`w-full p-3 rounded border flex items-center justify-between transition-all ${mode === 'segment' ? 'bg-cyan-900/30 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
                <span className="text-sm font-bold uppercase">Segment</span>
                <Minus size={16} />
            </button>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 w-full h-48 bg-black/50 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
            {/* Grid BG */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 invert" />

            {/* The Line Container */}
            <div className="relative w-3/4 h-1 bg-cyan-900/50 rounded-full">
                
                {/* The Active Line */}
                <div className={`absolute top-0 bottom-0 bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-500 ${mode === 'line' ? 'left-0 right-0' : mode === 'ray' ? 'left-[10%] right-0' : 'left-[10%] right-[10%]'}`}></div>

                {/* Left Endpoint */}
                <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${mode === 'line' ? 'left-0' : 'left-[10%]'}`}>
                     {mode === 'line' ? (
                         // Arrow Left
                         <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-cyan-400 border-b-[6px] border-b-transparent -ml-2" />
                     ) : (
                         // Dot
                         <div className="w-4 h-4 bg-white rounded-full border-2 border-cyan-500 -ml-2" />
                     )}
                     
                     {/* Label A */}
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-cyan-200 font-bold">A</div>
                </div>

                {/* Right Endpoint */}
                <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${mode === 'line' || mode === 'ray' ? 'right-0' : 'right-[10%]'}`}>
                     {mode === 'segment' ? (
                         // Dot
                         <div className="w-4 h-4 bg-white rounded-full border-2 border-cyan-500 -mr-2" />
                     ) : (
                         // Arrow Right
                         <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-cyan-400 border-b-[6px] border-b-transparent -mr-2" />
                     )}

                     {/* Label B */}
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-cyan-200 font-bold">B</div>
                </div>

            </div>
            
            {/* Notation Display */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-4 py-2 rounded text-xl font-serif text-white flex flex-col items-center">
                 <div className="text-[10px] text-slate-500 font-sans font-bold uppercase mb-1">Notation</div>
                 <div className="relative">
                     <span className="text-2xl tracking-[0.2em]">AB</span>
                     {/* Notation Symbols over text */}
                     <div className="absolute -top-1 left-0 right-0 flex justify-center text-cyan-400 text-xs">
                         {mode === 'line' && '↔'}
                         {mode === 'ray' && '→'}
                         {mode === 'segment' && '—'}
                     </div>
                 </div>
            </div>

        </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { Box, Move, Layers, GripHorizontal } from 'lucide-react';

export default function DimensionBuilder() {
  const [dim, setDim] = useState(0); // 0, 1, 2

  return (
    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full md:w-64 space-y-8">
            <div className="text-center pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Reality Engine</div>
                <div className="text-3xl font-black text-white">
                    {dim}D <span className="text-slate-500 text-lg">Construct</span>
                </div>
            </div>

            <div className="space-y-6">
                <button 
                    onClick={() => setDim(0)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${dim === 0 ? 'bg-cyan-900/20 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                >
                    <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold">0</div>
                    <div className="text-left">
                        <div className="font-bold uppercase text-xs">Point</div>
                        <div className="text-[10px] opacity-70">Location only</div>
                    </div>
                </button>

                <button 
                    onClick={() => setDim(1)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${dim === 1 ? 'bg-cyan-900/20 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                >
                    <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold">1</div>
                    <div className="text-left">
                        <div className="font-bold uppercase text-xs">Line</div>
                        <div className="text-[10px] opacity-70">Length only</div>
                    </div>
                </button>

                <button 
                    onClick={() => setDim(2)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${dim === 2 ? 'bg-cyan-900/20 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                >
                    <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold">2</div>
                    <div className="text-left">
                        <div className="font-bold uppercase text-xs">Plane</div>
                        <div className="text-[10px] opacity-70">Length + Width</div>
                    </div>
                </button>
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 bg-black rounded-xl border border-slate-700 relative overflow-hidden flex items-center justify-center perspective-1000">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-10 pointer-events-none invert" />

            {/* 0D: POINT */}
            <div 
                className={`absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] transition-all duration-700 ${dim === 0 ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} 
            />

            {/* 1D: LINE */}
            <div 
                className={`absolute h-1 bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-700 ease-in-out`}
                style={{ 
                    width: dim >= 1 ? '60%' : '0%',
                    opacity: dim >= 1 ? 1 : 0
                }}
            >
                {/* Endpoints */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
            </div>

            {/* 2D: PLANE */}
            <div 
                className={`absolute bg-cyan-500/10 border border-cyan-400 backdrop-blur-sm transition-all duration-700 ease-in-out origin-top`}
                style={{ 
                    width: '60%',
                    height: dim === 2 ? '40%' : '0%',
                    opacity: dim === 2 ? 1 : 0,
                    transform: 'rotateX(20deg)'
                }}
            >
                {/* Grid Lines on Plane */}
                {dim === 2 && (
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="border border-cyan-500/20" />
                        ))}
                    </div>
                )}
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 font-mono text-cyan-500 text-xs uppercase tracking-widest">
                {dim === 0 && "Undefined Term: Point"}
                {dim === 1 && "Infinite set of Points"}
                {dim === 2 && "Infinite set of Lines"}
            </div>
        </div>
    </div>
  );
}
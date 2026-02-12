"use client";
import React, { useState } from 'react';
import { Cylinder, Box, Triangle, ArrowUp } from 'lucide-react';

export default function VolumeExtruder() {
  const [shape, setShape] = useState<'square' | 'circle' | 'triangle'>('square');
  const [height, setHeight] = useState(50); // 0 to 100

  // Math
  const baseArea = 100; // Simplified constant for demo
  const volume = baseArea * height;

  return (
    <div className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-12">
        
        {/* CONTROLS */}
        <div className="w-full md:w-64 space-y-8">
            <div className="pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Fabricator</div>
                <h3 className="text-3xl font-black text-white">Extrusion</h3>
            </div>

            {/* Shape Select */}
            <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setShape('square')} className={`p-3 rounded border flex justify-center ${shape === 'square' ? 'bg-amber-500 text-black border-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    <Box size={20} />
                </button>
                <button onClick={() => setShape('circle')} className={`p-3 rounded border flex justify-center ${shape === 'circle' ? 'bg-amber-500 text-black border-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    <Cylinder size={20} />
                </button>
                <button onClick={() => setShape('triangle')} className={`p-3 rounded border flex justify-center ${shape === 'triangle' ? 'bg-amber-500 text-black border-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    <Triangle size={20} />
                </button>
            </div>

            {/* Height Slider */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-4">
                    Extrusion Height <span className="text-white">{height} units</span>
                </label>
                <input 
                    type="range" min="10" max="150" value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
            </div>

            {/* Formula Display */}
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
                    <span>Base (B)</span>
                    <span>Height (h)</span>
                </div>
                <div className="text-xl font-mono text-white font-bold flex justify-between">
                    <span>{baseArea}</span>
                    <span className="text-amber-500">× {height}</span>
                </div>
                <div className="border-t border-slate-600 my-2" />
                <div className="flex justify-between text-xs font-mono text-amber-300">
                    <span>Volume</span>
                    <span>{volume.toLocaleString()} units³</span>
                </div>
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 bg-black/40 rounded-xl border border-slate-700 relative flex items-end justify-center overflow-hidden h-[400px] perspective-1000">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

            {/* The Extruding Shape */}
            <div className="relative mb-12 transition-all duration-100" style={{ transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                
                {/* 3D Sides (Using CSS Transforms) */}
                <div 
                    className={`absolute bottom-0 left-0 w-32 bg-amber-500/20 border-l-2 border-r-2 border-amber-500 transition-all duration-75 origin-bottom`}
                    style={{ 
                        height: `${height * 2}px`, 
                        borderRadius: shape === 'circle' ? '20%' : '0',
                        transform: 'rotateX(-90deg) translateY(100%)' // Fold up
                    }}
                />
                
                {/* Top Cap (Moves up) */}
                <div 
                    className={`relative w-32 h-32 border-2 border-amber-400 bg-amber-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-75`}
                    style={{ 
                        transform: `translateZ(${height * 2}px)`,
                        borderRadius: shape === 'circle' ? '50%' : '0',
                        clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center text-amber-200 font-bold text-xs opacity-50">
                        Base Area
                    </div>
                </div>

                {/* Bottom Base (Static) */}
                <div 
                    className={`absolute top-0 left-0 w-32 h-32 border-2 border-amber-900/50 bg-amber-900/10`}
                    style={{ 
                        borderRadius: shape === 'circle' ? '50%' : '0',
                        clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                    }}
                />
            </div>

            <div className="absolute right-8 bottom-12 flex flex-col items-center gap-2 text-amber-500/50">
                <ArrowUp size={24} />
                <span className="text-xs font-bold uppercase vertical-rl">Extrude</span>
            </div>
        </div>
    </div>
  );
}
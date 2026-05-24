"use client";
import React, { useState } from 'react';
import { Crosshair, Move, Calculator } from 'lucide-react';

export default function LineBuilderLab() {
    // Math Coordinate State (Grid is -10 to +10)
    const [p1, setP1] = useState({ x: -4, y: -2 });
    const [p2, setP2] = useState({ x: 4, y: 2 });

    // Math Calculations
    const run = p2.x - p1.x;
    const rise = p2.y - p1.y;
    // Handle vertical line edge case (run = 0)
    const m = run === 0 ? 'Undefined' : (rise / run);
    const b = run === 0 ? 'None' : (p1.y - (rise / run) * p1.x);

    // Format strings cleanly
    const formattedM = typeof m === 'number' ? (Number.isInteger(m) ? m : m.toFixed(2)) : m;
    const formattedB = typeof b === 'number' ? (Number.isInteger(b) ? b : b.toFixed(2)) : b;

    // SVG Mapping
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 15; // 15px per math unit

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE); // Invert Y

    const svgP1 = { x: getSvgX(p1.x), y: getSvgY(p1.y) };
    const svgP2 = { x: getSvgX(p2.x), y: getSvgY(p2.y) };

    // Calculate line endpoints to stretch across the grid
    let lineStart, lineEnd;
    if (run === 0) {
        lineStart = { x: svgP1.x, y: 0 };
        lineEnd = { x: svgP1.x, y: SIZE };
    } else {
        const mathM = m as number;
        const mathB = b as number;
        const startMathX = -10;
        const endMathX = 10;
        lineStart = { x: getSvgX(startMathX), y: getSvgY(mathM * startMathX + mathB) };
        lineEnd = { x: getSvgX(endMathX), y: getSvgY(mathM * endMathX + mathB) };
    }

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-teal-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.15)] flex flex-col md:flex-row relative">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 p-6 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-teal-400">
                    <Calculator size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Two-Point Constructor</h3>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                    {/* Point 1 Controls */}
                    <div className="bg-sky-950/30 p-4 rounded-xl border border-sky-500/30">
                        <h4 className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
                            <span>Point 1 (x₁, y₁)</span>
                            <span className="font-mono text-white bg-sky-500/20 px-2 py-0.5 rounded">({p1.x}, {p1.y})</span>
                        </h4>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">X-Axis</label>
                                <input type="range" min="-10" max="10" value={p1.x} onChange={(e) => setP1({...p1, x: Number(e.target.value)})} className="w-full accent-sky-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Y-Axis</label>
                                <input type="range" min="-10" max="10" value={p1.y} onChange={(e) => setP1({...p1, y: Number(e.target.value)})} className="w-full accent-sky-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Point 2 Controls */}
                    <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/30">
                        <h4 className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
                            <span>Point 2 (x₂, y₂)</span>
                            <span className="font-mono text-white bg-indigo-500/20 px-2 py-0.5 rounded">({p2.x}, {p2.y})</span>
                        </h4>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">X-Axis</label>
                                <input type="range" min="-10" max="10" value={p2.x} onChange={(e) => setP2({...p2, x: Number(e.target.value)})} className="w-full accent-indigo-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Y-Axis</label>
                                <input type="range" min="-10" max="10" value={p2.y} onChange={(e) => setP2({...p2, y: Number(e.target.value)})} className="w-full accent-indigo-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Math Readout */}
                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex flex-col justify-center font-mono">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-400">Rise (Δy)</span>
                            <span className="text-white font-bold">{rise}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
                            <span className="text-xs text-slate-400">Run (Δx)</span>
                            <span className="text-white font-bold">{run}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-teal-400 font-bold">Equation:</span>
                            <span className="text-teal-300 font-black text-lg">
                                y = {formattedM}x {Number(b) >= 0 ? '+' : '-'} {Math.abs(Number(formattedB))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[300px] aspect-square bg-[#080b14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#14b8a6" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#14b8a6" strokeWidth="1" />
                                </g>
                            );
                        })}
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#5eead4" strokeWidth="1.5" opacity="0.5" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#5eead4" strokeWidth="1.5" opacity="0.5" />
                        
                        {/* The Infinite Line */}
                        <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="#14b8a6" strokeWidth="2" className="transition-all duration-150" opacity="0.6"/>

                        {/* Rise/Run Triangle */}
                        {run !== 0 && rise !== 0 && (
                            <g className="transition-all duration-150">
                                {/* Run (Horizontal) */}
                                <line x1={svgP1.x} y1={svgP1.y} x2={svgP2.x} y2={svgP1.y} stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" />
                                {/* Rise (Vertical) */}
                                <line x1={svgP2.x} y1={svgP1.y} x2={svgP2.x} y2={svgP2.y} stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" />
                            </g>
                        )}

                        {/* The Points */}
                        <circle cx={svgP1.x} cy={svgP1.y} r="5" fill="#38bdf8" className="transition-all duration-150" />
                        <circle cx={svgP2.x} cy={svgP2.y} r="5" fill="#818cf8" className="transition-all duration-150" />
                        
                        {/* Y-Intercept Indicator */}
                        {typeof b === 'number' && (
                            <circle cx={CENTER} cy={getSvgY(b)} r="4" fill="transparent" stroke="#f43f5e" strokeWidth="2" className="transition-all duration-150" />
                        )}
                    </svg>

                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <Move size={12}/> 15px / Unit
                    </div>
                </div>
            </div>
        </div>
    );
}
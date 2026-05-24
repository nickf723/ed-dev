"use client";
import React, { useState } from 'react';
import { Scaling, Maximize, Move } from 'lucide-react';

export default function ParabolaLab() {
    // Vertex Form: y = a(x-h)^2 + k
    const [a, setA] = useState(1);
    const [h, setH] = useState(0);
    const [k, setK] = useState(-5);

    // SVG Mapping
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 15; // 15px per unit

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    // Generate Path Data for the Parabola
    const generatePath = () => {
        let path = "";
        let first = true;
        // Draw from x = -10 to x = 10
        for (let mathX = -10; mathX <= 10; mathX += 0.5) {
            const mathY = a * Math.pow((mathX - h), 2) + k;
            
            // Only draw if reasonably on screen to prevent SVG crazy bounds
            if (mathY < 15 && mathY > -15) {
                const svgX = getSvgX(mathX);
                const svgY = getSvgY(mathY);
                if (first) {
                    path += `M ${svgX} ${svgY} `;
                    first = false;
                } else {
                    path += `L ${svgX} ${svgY} `;
                }
            }
        }
        return path;
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col md:flex-row relative">
            
            {/* LEFT: Controls */}
            <div className="w-full md:w-1/2 p-6 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-blue-400">
                    <Scaling size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Parabola Constructor</h3>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* The Live Equation */}
                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center">
                        <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mb-2">Vertex Form</div>
                        <div className="text-2xl font-black font-mono text-white">
                            y = <span className="text-sky-400">{a}</span>(x {h >= 0 ? '-' : '+'} <span className="text-indigo-400">{Math.abs(h)}</span>)² {k >= 0 ? '+' : '-'} <span className="text-purple-400">{Math.abs(k)}</span>
                        </div>
                        <div className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            Vertex: ({h}, {k})
                        </div>
                    </div>

                    <div className="space-y-4 bg-slate-900/40 p-4 rounded-xl border border-white/5">
                        
                        {/* Control: A (Width/Direction) */}
                        <div className="space-y-1">
                            <label className="text-[10px] text-sky-400 uppercase font-bold flex justify-between">
                                <span>'a' (Width & Direction)</span>
                                <span>{a}</span>
                            </label>
                            <input type="range" min="-3" max="3" step="0.5" value={a} onChange={(e) => {
                                // Prevent a=0 because that makes it a line, not a parabola!
                                const val = Number(e.target.value);
                                setA(val === 0 ? 0.5 : val);
                            }} className="w-full accent-sky-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>

                        {/* Control: H (Horizontal Shift) */}
                        <div className="space-y-1 pt-2">
                            <label className="text-[10px] text-indigo-400 uppercase font-bold flex justify-between">
                                <span>'h' (Horizontal Shift)</span>
                                <span>{h}</span>
                            </label>
                            <input type="range" min="-8" max="8" step="1" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full accent-indigo-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>

                        {/* Control: K (Vertical Shift) */}
                        <div className="space-y-1 pt-2">
                            <label className="text-[10px] text-purple-400 uppercase font-bold flex justify-between">
                                <span>'k' (Vertical Shift)</span>
                                <span>{k}</span>
                            </label>
                            <input type="range" min="-8" max="8" step="1" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[300px] aspect-square bg-[#020617] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.15">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#3b82f6" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#3b82f6" strokeWidth="1" />
                                </g>
                            );
                        })}
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
                        
                        {/* Axis of Symmetry */}
                        <line x1={getSvgX(h)} y1={0} x2={getSvgX(h)} y2={SIZE} stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" className="transition-all duration-75" />

                        {/* The Parabola */}
                        <path d={generatePath()} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" className="transition-all duration-75" />
                        
                        {/* The Vertex Point */}
                        <circle cx={getSvgX(h)} cy={getSvgY(k)} r="5" fill="#f472b6" className="transition-all duration-75 shadow-[0_0_10px_pink]" />
                    </svg>

                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <Move size={12}/> 15px / Unit
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";
import React, { useState } from 'react';
import { Navigation, MoveUpRight } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function VectorAdditionLab() {
    // Vector v (Orange)
    const [vx, setVx] = useState(3);
    const [vy, setVy] = useState(2);

    // Vector w (Red)
    const [wx, setWx] = useState(1);
    const [wy, setWy] = useState(4);

    // Resultant vector
    const rx = vx + wx;
    const ry = vy + wy;

    // SVG Mapping
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 15; // 15px per math unit

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE); // Inverted Y

    // Helper to draw an arrowhead
    const drawArrowhead = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
        const angle = Math.atan2(yEnd - yStart, xEnd - xStart);
        const headlen = 10;
        return `
            M ${xEnd} ${yEnd} 
            L ${xEnd - headlen * Math.cos(angle - Math.PI / 6)} ${yEnd - headlen * Math.sin(angle - Math.PI / 6)} 
            L ${xEnd - headlen * Math.cos(angle + Math.PI / 6)} ${yEnd - headlen * Math.sin(angle + Math.PI / 6)} Z
        `;
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-orange-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col md:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 p-6 md:p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-orange-400">
                    <MoveUpRight size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Parallelogram Rule</h3>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Vector v */}
                    <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/30 shadow-inner">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-3">
                            <span>Vector v</span>
                            <span className="font-mono text-white bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/20">[{vx}, {vy}]</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input type="range" min="-8" max="8" step="1" value={vx} onChange={(e) => setVx(Number(e.target.value))} className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <input type="range" min="-8" max="8" step="1" value={vy} onChange={(e) => setVy(Number(e.target.value))} className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Vector w */}
                    <div className="bg-red-950/20 p-4 rounded-xl border border-red-500/30 shadow-inner">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">
                            <span>Vector w</span>
                            <span className="font-mono text-white bg-red-500/20 px-2 py-0.5 rounded border border-red-500/20">[{wx}, {wy}]</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input type="range" min="-8" max="8" step="1" value={wx} onChange={(e) => setWx(Number(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <input type="range" min="-8" max="8" step="1" value={wy} onChange={(e) => setWy(Number(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mathematical Readout */}
                <div className="mt-8 bg-black/60 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center shadow-inner">
                    <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-3">Resultant Vector (v + w)</div>
                    <div className="text-xl font-black font-mono text-white flex items-center gap-4">
                        <span className="text-orange-400">[{vx}, {vy}]</span>
                        <span className="text-slate-500">+</span>
                        <span className="text-red-400">[{wx}, {wy}]</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">[{rx}, {ry}]</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#050200] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#f97316" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#f97316" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#fb923c" strokeWidth="1.5" opacity="0.4" />

                        {/* Origin */}
                        <circle cx={CENTER} cy={CENTER} r="3" fill="#fff" />

                        <g className="transition-all duration-300">
                            {/* Projections (The Parallelogram) */}
                            {/* w shifted to tip of v */}
                            <line x1={getSvgX(vx)} y1={getSvgY(vy)} x2={getSvgX(rx)} y2={getSvgY(ry)} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                            {/* v shifted to tip of w */}
                            <line x1={getSvgX(wx)} y1={getSvgY(wy)} x2={getSvgX(rx)} y2={getSvgY(ry)} stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />

                            {/* Vector v (Orange) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(vx)} ${getSvgY(vy)}`} stroke="#f97316" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(vx), getSvgY(vy))} fill="#f97316" />

                            {/* Vector w (Red) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(wx)} ${getSvgY(wy)}`} stroke="#ef4444" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(wx), getSvgY(wy))} fill="#ef4444" />

                            {/* Resultant Vector (Amber) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(rx)} ${getSvgY(ry)}`} stroke="#fbbf24" strokeWidth="4" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(rx), getSvgY(ry))} fill="#fbbf24" />
                            <circle cx={getSvgX(rx)} cy={getSvgY(ry)} r="4" fill="#fbbf24" className="shadow-[0_0_15px_#fbbf24]" />
                        </g>
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-orange-400 font-bold"><div className="w-3 h-1 bg-orange-500 rounded-full" /> <M>{"\\vec{v}"}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 font-bold"><div className="w-3 h-1 bg-red-500 rounded-full" /> <M>{"\\vec{w}"}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 font-bold"><div className="w-3 h-1 bg-amber-500 rounded-full" /> <M>{"\\vec{v} + \\vec{w}"}</M></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
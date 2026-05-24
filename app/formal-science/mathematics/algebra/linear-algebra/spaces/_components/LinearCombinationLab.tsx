"use client";
import React, { useState } from 'react';
import { Network, Plus, Layers } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function LinearCombinationLab() {
    // Basis Vectors (Linearly Independent)
    const v1 = { x: 2, y: 1 };
    const v2 = { x: -1, y: 2 };

    // Scalars (The Multipliers)
    const [c1, setC1] = useState(1);
    const [c2, setC2] = useState(1);

    // The Resulting Linear Combination
    const w = {
        x: c1 * v1.x + c2 * v2.x,
        y: c1 * v1.y + c2 * v2.y
    };

    // SVG Mapping
    const SIZE = 350;
    const CENTER = SIZE / 2;
    const SCALE = 20;

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    // Arrowhead helper
    const drawArrowhead = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
        const angle = Math.atan2(yEnd - yStart, xEnd - xStart);
        const headlen = 8;
        return `
            M ${xEnd} ${yEnd} 
            L ${xEnd - headlen * Math.cos(angle - Math.PI / 6)} ${yEnd - headlen * Math.sin(angle - Math.PI / 6)} 
            L ${xEnd - headlen * Math.cos(angle + Math.PI / 6)} ${yEnd - headlen * Math.sin(angle + Math.PI / 6)} Z
        `;
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-violet-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-violet-400">
                    <Layers size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Linear Combinator</h3>
                </div>

                {/* Mathematical Identity Display */}
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 shadow-inner mb-6 flex flex-col items-center gap-2">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">The Equation</div>
                    <div className="text-xl text-white">
                        <M display={true}>{`c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 = \\mathbf{w}`}</M>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Scalar c1 */}
                    <div className="bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-500/20 shadow-inner">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-4">
                            <span>Scalar (c₁)</span>
                            <span className="bg-fuchsia-500/20 px-3 py-1 rounded font-mono text-base border border-fuchsia-500/30 text-white">{c1}</span>
                        </div>
                        <input type="range" min="-4" max="4" step="1" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full accent-fuchsia-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-[10px] text-zinc-500 mt-2 font-mono flex items-center gap-2">
                            Stretches <M>{`\\vec{v}_1`}</M> : [{`${v1.x}, ${v1.y}`}]
                        </div>
                    </div>

                    {/* Scalar c2 */}
                    <div className="bg-violet-950/20 p-5 rounded-xl border border-violet-500/20 shadow-inner">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">
                            <span>Scalar (c₂)</span>
                            <span className="bg-violet-500/20 px-3 py-1 rounded font-mono text-base border border-violet-500/30 text-white">{c2}</span>
                        </div>
                        <input type="range" min="-4" max="4" step="1" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full accent-violet-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-[10px] text-zinc-500 mt-2 font-mono flex items-center gap-2">
                            Stretches <M>{`\\vec{v}_2`}</M> : [{v2.x}, {v2.y}]
                        </div>
                    </div>
                </div>

                {/* Result Vector */}
                <div className="mt-6 flex flex-col items-center bg-black/60 p-4 rounded-xl border border-white/5 shadow-inner">
                    <div className="text-[10px] text-white font-bold uppercase tracking-widest mb-2">Target Reached <M>{`\\vec{w}`}</M></div>
                    <div className="text-2xl font-black font-mono text-white">
                        [{w.x}, {w.y}]
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#05020c] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Cartesian Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#a78bfa" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#a78bfa" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#c4b5fd" strokeWidth="1.5" opacity="0.3" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#c4b5fd" strokeWidth="1.5" opacity="0.3" />

                        <g className="transition-all duration-300">
                            {/* Scaled Vectors (The paths taken) */}
                            {/* c1*v1 */}
                            <line x1={CENTER} y1={CENTER} x2={getSvgX(c1 * v1.x)} y2={getSvgY(c1 * v1.y)} stroke="#d946ef" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                            {/* c2*v2 starting from tip of c1*v1 (Parallelogram rule) */}
                            <line x1={getSvgX(c1 * v1.x)} y1={getSvgY(c1 * v1.y)} x2={getSvgX(w.x)} y2={getSvgY(w.y)} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

                            {/* Base Basis Vectors (Fuchsia and Violet) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(v1.x)} ${getSvgY(v1.y)}`} stroke="#d946ef" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(v1.x), getSvgY(v1.y))} fill="#d946ef" />

                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(v2.x)} ${getSvgY(v2.y)}`} stroke="#8b5cf6" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(v2.x), getSvgY(v2.y))} fill="#8b5cf6" />

                            {/* Resultant Vector w (White) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(w.x)} ${getSvgY(w.y)}`} stroke="#ffffff" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(w.x), getSvgY(w.y))} fill="#ffffff" />
                            <circle cx={getSvgX(w.x)} cy={getSvgY(w.y)} r="4" fill="#ffffff" className="shadow-[0_0_15px_#fff]" />
                        </g>
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-fuchsia-400 font-bold uppercase"><div className="w-2 h-2 bg-fuchsia-500 rounded-full" /> Basis <M>{`\\vec{v}_1`}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400 font-bold uppercase"><div className="w-2 h-2 bg-violet-500 rounded-full" /> Basis <M>{`\\vec{v}_2`}</M></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
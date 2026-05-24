"use client";
import React, { useState } from 'react';
import { Axis3d, SplitSquareVertical } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function ProjectionLab() {
    // Vector v (The one being projected - White)
    const [vx, setVx] = useState(3);
    const [vy, setVy] = useState(4);

    // Vector u (The base line - Cyan)
    const [ux, setUx] = useState(5);
    const [uy, setUy] = useState(1);

    // Math Calculations
    const dot = vx * ux + vy * uy;
    const uMagSq = ux * ux + uy * uy;
    const scalar = dot / uMagSq;

    // Projected Vector (p)
    const px = scalar * ux;
    const py = scalar * uy;

    // Perpendicular Error Vector (z = v - p)
    const zx = vx - px;
    const zy = vy - py;

    const isOrthogonal = Math.abs(dot) < 0.01;

    // SVG Mapping
    const SIZE = 350;
    const CENTER = SIZE / 2;
    const SCALE = 20;

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

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
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-cyan-400">
                    <SplitSquareVertical size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Projection Engine</h3>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Vector v (Target) */}
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/10 shadow-inner">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white mb-3">
                            <span>Target Vector (v)</span>
                            <span className="font-mono bg-white/10 px-2 py-0.5 rounded">[{vx}, {vy}]</span>
                        </div>
                        <div className="flex gap-4">
                            <input type="range" min="-6" max="6" step="1" value={vx} onChange={(e) => setVx(Number(e.target.value))} className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            <input type="range" min="-6" max="6" step="1" value={vy} onChange={(e) => setVy(Number(e.target.value))} className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>

                    {/* Vector u (Base) */}
                    <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/20 shadow-inner">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
                            <span>Base Vector (u)</span>
                            <span className="font-mono text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded">[{ux}, {uy}]</span>
                        </div>
                        <div className="flex gap-4">
                            <input type="range" min="-6" max="6" step="1" value={ux} onChange={(e) => { const v = Number(e.target.value); if(v!==0 || uy!==0) setUx(v); }} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            <input type="range" min="-6" max="6" step="1" value={uy} onChange={(e) => { const v = Number(e.target.value); if(ux!==0 || v!==0) setUy(v); }} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Mathematical Readout */}
                <div className={`mt-6 p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${isOrthogonal ? 'bg-teal-950/40 border-teal-500 shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-black/60 border-white/5'}`}>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Scalar Multiplier</div>
                    {isOrthogonal ? (
                        <div className="text-teal-400 font-bold uppercase tracking-widest animate-pulse">Vectors are Orthogonal!</div>
                    ) : (
                        <div className="text-xl font-mono text-white flex items-center gap-2">
                            <M>{`\\frac{\\vec{v} \\cdot \\vec{u}}{\\vec{u} \\cdot \\vec{u}} = \\frac{${dot}}{${uMagSq}} \\approx ${scalar.toFixed(2)}`}</M>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#030a14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#06b6d4" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#06b6d4" strokeWidth="1" />
                                </g>
                            );
                        })}

                        {/* Infinite Line of u */}
                        <line x1={CENTER - ux*100} y1={CENTER + uy*100} x2={CENTER + ux*100} y2={CENTER - uy*100} stroke="#0891b2" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />

                        <g className="transition-all duration-150">
                            {/* Perpendicular Drop (z) */}
                            {!isOrthogonal && (
                                <>
                                    <line x1={getSvgX(vx)} y1={getSvgY(vy)} x2={getSvgX(px)} y2={getSvgY(py)} stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" />
                                    <path d={drawArrowhead(getSvgX(vx), getSvgY(vy), getSvgX(px), getSvgY(py))} fill="#f472b6" />
                                </>
                            )}

                            {/* Base Vector u (Cyan) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(ux)} ${getSvgY(uy)}`} stroke="#0891b2" strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(ux), getSvgY(uy))} fill="#0891b2" />

                            {/* Projected Vector p (Teal) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(px)} ${getSvgY(py)}`} stroke="#2dd4bf" strokeWidth="4" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(px), getSvgY(py))} fill="#2dd4bf" />

                            {/* Target Vector v (White) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(vx)} ${getSvgY(vy)}`} stroke="#ffffff" strokeWidth="2" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(vx), getSvgY(vy))} fill="#ffffff" />
                        </g>
                        
                        <circle cx={CENTER} cy={CENTER} r="3" fill="#fff" />
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-3 rounded-lg border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white font-bold uppercase"><div className="w-2 h-2 bg-white rounded-full" /> Target <M>{'\\vec{v}'}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600 font-bold uppercase"><div className="w-2 h-2 bg-cyan-600 rounded-full" /> Base <M>{'\\vec{u}'}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-teal-400 font-bold uppercase"><div className="w-2 h-2 bg-teal-400 rounded-full" /> Projection</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
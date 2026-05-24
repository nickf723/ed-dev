"use client";
import React, { useState } from 'react';
import { BoxSelect, Scale3d, AlertOctagon } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function DeterminantLab() {
    const [a, setA] = useState(2);
    const [b, setB] = useState(0);
    const [c, setC] = useState(1);
    const [d, setD] = useState(2);

    const det = (a * d) - (b * c);
    const isFlipped = det < 0;
    const isSingular = det === 0;

    // SVG Mapping
    const SIZE = 350;
    const CENTER = SIZE / 2;
    const SCALE = 25;

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    const ix = a;
    const iy = c;
    const jx = b;
    const jy = d;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-amber-400">
                    <BoxSelect size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Area Scaler</h3>
                </div>

                {/* Matrix Input */}
                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 flex flex-col items-center shadow-inner mb-6">
                    <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-4">Matrix A</div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-16 border-l-2 border-t-2 border-b-2 border-amber-500/50 rounded-l" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-16 bg-amber-950/50 border border-amber-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-amber-400" />
                            <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-16 bg-amber-950/50 border border-amber-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-amber-400" />
                            <input type="number" value={c} onChange={e => setC(Number(e.target.value))} className="w-16 bg-amber-950/50 border border-amber-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-amber-400" />
                            <input type="number" value={d} onChange={e => setD(Number(e.target.value))} className="w-16 bg-amber-950/50 border border-amber-500/30 text-white text-center font-mono font-bold rounded p-2 outline-none focus:border-amber-400" />
                        </div>
                        <div className="w-2 h-16 border-r-2 border-t-2 border-b-2 border-amber-500/50 rounded-r" />
                    </div>
                </div>

                {/* Calculation Readout */}
                <div className={`p-5 rounded-xl border flex flex-col items-center text-center transition-colors ${isSingular ? 'bg-red-950/30 border-red-500/50' : 'bg-black/40 border-white/5'}`}>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Calculation: ad - bc</div>
                    <div className="text-xl font-mono text-white mb-2">
                        (<span className="text-amber-400">{a}</span>)(<span className="text-amber-400">{d}</span>) - (<span className="text-red-400">{b}</span>)(<span className="text-red-400">{c}</span>) = <span className="font-black">{det}</span>
                    </div>
                    {isFlipped && !isSingular && <div className="text-xs text-rose-400 font-bold uppercase tracking-widest mt-2 animate-pulse">Orientation Reversed</div>}
                    {isSingular && <div className="text-xs text-red-400 font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-2 animate-pulse"><AlertOctagon size={14}/> Singularity Reached</div>}
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#0c0602] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#f59e0b" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#f59e0b" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#fcd34d" strokeWidth="1.5" opacity="0.4" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#fcd34d" strokeWidth="1.5" opacity="0.4" />

                        {/* Ghost Unit Square */}
                        <rect x={CENTER} y={CENTER - SCALE} width={SCALE} height={SCALE} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

                        <g className="transition-all duration-300">
                            {/* Transformed Parallelogram */}
                            <path 
                                d={`M ${CENTER} ${CENTER} L ${getSvgX(ix)} ${getSvgY(iy)} L ${getSvgX(ix + jx)} ${getSvgY(iy + jy)} L ${getSvgX(jx)} ${getSvgY(jy)} Z`} 
                                fill={isFlipped ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)"}
                                stroke={isFlipped ? "#ef4444" : "#f59e0b"} 
                                strokeWidth="2" 
                            />

                            {/* Basis Vectors */}
                            {/* i-hat */}
                            <line x1={CENTER} y1={CENTER} x2={getSvgX(ix)} y2={getSvgY(iy)} stroke="#38bdf8" strokeWidth="3" />
                            <circle cx={getSvgX(ix)} cy={getSvgY(iy)} r="3" fill="#38bdf8" />
                            
                            {/* j-hat */}
                            <line x1={CENTER} y1={CENTER} x2={getSvgX(jx)} y2={getSvgY(jy)} stroke="#a3e635" strokeWidth="3" />
                            <circle cx={getSvgX(jx)} cy={getSvgY(jy)} r="3" fill="#a3e635" />
                        </g>
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white font-bold"><div className="w-3 h-1 bg-amber-500 rounded-full" /> Area = |{det}|</div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold"><div className="w-2 h-2 bg-cyan-500 rounded-full" /> Transformed î</div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-lime-400 font-bold"><div className="w-2 h-2 bg-lime-500 rounded-full" /> Transformed ĵ</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
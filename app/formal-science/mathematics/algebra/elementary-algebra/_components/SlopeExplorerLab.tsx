"use client";
import React, { useState } from 'react';
import { TrendingUp, Activity, Crosshair } from 'lucide-react';

export default function SlopeExplorerLab() {
    const [m, setM] = useState(1); // Slope
    const [b, setB] = useState(0); // Y-Intercept

    // SVG Coordinate Mapping (Center is 0,0. 300x300 grid)
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 15; // pixels per unit

    // Calculate line points extending beyond the visible box
    // y = mx + b
    const getSvgY = (mathX: number) => {
        const mathY = (m * mathX) + b;
        return CENTER - (mathY * SCALE); // Invert Y for SVG
    };

    const getSvgX = (mathX: number) => {
        return CENTER + (mathX * SCALE);
    };

    const x1 = -15; const y1 = getSvgY(x1);
    const x2 = 15;  const y2 = getSvgY(x2);

    return (
        <div className="w-full bg-slate-950/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col md:flex-row relative">
            
            {/* Radiant Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-fuchsia-500/20 blur-[100px] rounded-full" />
            </div>

            {/* LEFT: Controls */}
            <div className="w-full md:w-1/2 p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-cyan-400">
                    <TrendingUp size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Slope Interceptor</h3>
                </div>

                <div className="text-4xl font-black font-mono text-white mb-8 flex items-center gap-3">
                    <span className="text-slate-500">y =</span>
                    <span className="text-cyan-400">{m}</span><span className="text-white">x</span>
                    <span className="text-slate-500">{b >= 0 ? '+' : '-'}</span>
                    <span className="text-fuchsia-400">{Math.abs(b)}</span>
                </div>

                <div className="space-y-8">
                    {/* Slope Slider */}
                    <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cyan-400">
                            <span>Slope (m) - The Angle</span>
                            <span className="bg-cyan-500/20 px-2 py-1 rounded text-white font-mono">{m}</span>
                        </div>
                        <input type="range" min="-5" max="5" step="0.5" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    {/* Y-Intercept Slider */}
                    <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                            <span>Y-Intercept (b) - The Shift</span>
                            <span className="bg-fuchsia-500/20 px-2 py-1 rounded text-white font-mono">{b}</span>
                        </div>
                        <input type="range" min="-10" max="10" step="1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-fuchsia-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[300px] aspect-square bg-[#080b14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.2">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#06b6d4" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#06b6d4" strokeWidth="1" />
                                </g>
                            );
                        })}
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#94a3b8" strokeWidth="2" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#94a3b8" strokeWidth="2" />
                        
                        {/* The Line */}
                        <line x1={getSvgX(x1)} y1={y1} x2={getSvgX(x2)} y2={y2} stroke="#22d3ee" strokeWidth="3" className="transition-all duration-75" />
                        
                        {/* The Intercept Dot */}
                        <circle cx={CENTER} cy={getSvgY(0)} r="5" fill="#d946ef" className="transition-all duration-75" />
                    </svg>

                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <Crosshair size={12}/> Origin (0,0)
                    </div>
                </div>
            </div>
        </div>
    );
}
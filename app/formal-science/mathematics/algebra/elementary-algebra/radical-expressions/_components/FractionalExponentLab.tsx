"use client";
import React, { useState } from 'react';
import { GitBranch, Activity } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function FractionalExponentLab() {
    const [p, setP] = useState(1); // Power (Numerator)
    const [r, setR] = useState(2); // Root (Denominator)

    // SVG Mapping (Focusing on Q1)
    const SIZE = 300;
    const ORIGIN_X = 20;
    const ORIGIN_Y = 280;
    const SCALE_X = 25; // 25px per x unit
    const SCALE_Y = 25; // 25px per y unit

    const getSvgX = (mathX: number) => ORIGIN_X + mathX * SCALE_X;
    const getSvgY = (mathY: number) => ORIGIN_Y - mathY * SCALE_Y;

    // Generate path for y = x^(p/r)
    const generatePath = () => {
        let path = "";
        let first = true;
        for (let x = 0; x <= 12; x += 0.1) {
            const y = Math.pow(x, p / r);
            if (y > 12) continue; // Keep within SVG bounds
            const sx = getSvgX(x);
            const sy = getSvgY(y);
            if (first) { path += `M ${sx} ${sy} `; first = false; }
            else { path += `L ${sx} ${sy} `; }
        }
        return path;
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-fuchsia-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full lg:w-1/2 p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8 text-fuchsia-400">
                    <GitBranch size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Fractional Exponent Engine</h3>
                </div>

                {/* Mathematical Identity Display */}
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner mb-8 flex items-center justify-center text-4xl text-white">
                    <M display={true}>{`x^{\\frac{${p}}{${r}}} = \\sqrt[${r}]{x^{${p}}}`}</M>
                </div>

                <div className="space-y-6">
                    {/* Power Slider */}
                    <div className="bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-500/20">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white mb-4">
                            <span>Power (p)</span>
                            <span className="bg-white/10 px-3 py-1 rounded font-mono text-base border border-white/10">{p}</span>
                        </div>
                        <input type="range" min="1" max="5" step="1" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-white h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-[10px] text-fuchsia-300/70 mt-2 font-mono uppercase tracking-widest">Multiplies the base. Pulls curve up.</div>
                    </div>

                    {/* Root Slider */}
                    <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-500/20">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-4">
                            <span>Root Index (r)</span>
                            <span className="bg-fuchsia-500/20 px-3 py-1 rounded font-mono text-base border border-fuchsia-500/20">{r}</span>
                        </div>
                        <input type="range" min="1" max="5" step="1" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-fuchsia-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-[10px] text-fuchsia-400/70 mt-2 font-mono uppercase tracking-widest">Divides the exponent. Pulls curve down.</div>
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full lg:w-1/2 p-8 flex flex-col items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#0a0514] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 15 }).map((_, i) => {
                            const posX = ORIGIN_X + i * SCALE_X;
                            const posY = ORIGIN_Y - i * SCALE_Y;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={posX} y1="0" x2={posX} y2={SIZE} stroke="#d946ef" strokeWidth="1" />
                                    <line x1="0" y1={posY} x2={SIZE} y2={posY} stroke="#d946ef" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={ORIGIN_Y} x2={SIZE} y2={ORIGIN_Y} stroke="#e879f9" strokeWidth="2" opacity="0.5" />
                        <line x1={ORIGIN_X} y1="0" x2={ORIGIN_X} y2={SIZE} stroke="#e879f9" strokeWidth="2" opacity="0.5" />
                        
                        {/* Line of y = x reference */}
                        <line x1={getSvgX(0)} y1={getSvgY(0)} x2={getSvgX(12)} y2={getSvgY(12)} stroke="#71717a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                        
                        {/* The Function Curve */}
                        <path d={generatePath()} fill="none" stroke="#d946ef" strokeWidth="3" className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-fuchsia-400 font-mono shadow-lg">
                            <Activity size={14} className="text-fuchsia-500"/>
                            y = x^({p}/{r})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
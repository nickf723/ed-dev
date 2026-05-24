"use client";
import React, { useState } from 'react';
import { RefreshCcw, Activity } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function LogBaseLab() {
    const [base, setBase] = useState(2);
    const [mathX, setMathX] = useState(2); // X value for the exponential function

    // Calculations
    const expY = Math.pow(base, mathX);
    
    // The mirrored point for the Log function
    const logX = expY;
    const logY = mathX;

    // SVG Mapping (Center at bottom-left-ish to focus on Q1)
    const SIZE = 300;
    const ORIGIN_X = 50;
    const ORIGIN_Y = 250;
    const SCALE = 20; // 20px per math unit

    const getSvgX = (mx: number) => ORIGIN_X + mx * SCALE;
    const getSvgY = (my: number) => ORIGIN_Y - my * SCALE;

    // Generate path for y = b^x
    const generateExpPath = () => {
        let path = "";
        let first = true;
        for (let x = -2; x <= 10; x += 0.2) {
            const y = Math.pow(base, x);
            if (y > 15) continue; // Keep within SVG bounds
            const sx = getSvgX(x);
            const sy = getSvgY(y);
            if (first) { path += `M ${sx} ${sy} `; first = false; }
            else { path += `L ${sx} ${sy} `; }
        }
        return path;
    };

    // Generate path for y = log_b(x)
    const generateLogPath = () => {
        let path = "";
        let first = true;
        for (let x = 0.1; x <= 12; x += 0.2) {
            const y = Math.log(x) / Math.log(base);
            if (y < -2) continue; // Keep within bounds
            const sx = getSvgX(x);
            const sy = getSvgY(y);
            if (first) { path += `M ${sx} ${sy} `; first = false; }
            else { path += `L ${sx} ${sy} `; }
        }
        return path;
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col md:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8 text-amber-400">
                    <RefreshCcw size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">The Inverse Mirror</h3>
                </div>

                <div className="space-y-8">
                    {/* Base Slider */}
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-amber-500 mb-4">
                            <span>Set the Base (b)</span>
                            <span className="text-white bg-amber-500/20 px-3 py-1 rounded font-mono text-base">{base}</span>
                        </div>
                        <input type="range" min="1.1" max="5" step="0.1" value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-amber-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    {/* Point Slider */}
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-rose-400 mb-4">
                            <span>Drag the Input (x)</span>
                            <span className="text-white bg-rose-500/20 px-3 py-1 rounded font-mono text-base">{mathX.toFixed(1)}</span>
                        </div>
                        <input type="range" min="-1" max="3.5" step="0.1" value={mathX} onChange={(e) => setMathX(Number(e.target.value))} className="w-full accent-rose-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                {/* Mathematical Readout */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/30 text-center">
                        <div className="text-[10px] text-rose-400 uppercase font-bold tracking-widest mb-2">Exponential</div>
                        <div className="text-lg text-white font-mono"><M>{`${base}^{${mathX.toFixed(1)}} = ${expY.toFixed(1)}`}</M></div>
                        <div className="text-xs text-slate-400 mt-2 font-mono bg-black/40 py-1 rounded">Pt: ({mathX.toFixed(1)}, {expY.toFixed(1)})</div>
                    </div>
                    <div className="bg-sky-950/30 p-4 rounded-xl border border-sky-500/30 text-center">
                        <div className="text-[10px] text-sky-400 uppercase font-bold tracking-widest mb-2">Logarithmic</div>
                        <div className="text-lg text-white font-mono"><M>{`\\log_{${base}}(${expY.toFixed(1)}) = ${mathX.toFixed(1)}`}</M></div>
                        <div className="text-xs text-slate-400 mt-2 font-mono bg-black/40 py-1 rounded">Pt: ({expY.toFixed(1)}, {mathX.toFixed(1)})</div>
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#0a0502] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = ORIGIN_X + (i - 5) * SCALE; // Shift grid to match origin
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#f59e0b" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#f59e0b" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Axes */}
                        <line x1="0" y1={ORIGIN_Y} x2={SIZE} y2={ORIGIN_Y} stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                        <line x1={ORIGIN_X} y1="0" x2={ORIGIN_X} y2={SIZE} stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
                        
                        {/* Line of Symmetry (y = x) */}
                        <line x1={getSvgX(-2)} y1={getSvgY(-2)} x2={getSvgX(12)} y2={getSvgY(12)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                        <text x={getSvgX(10)} y={getSvgY(10.5)} fill="#94a3b8" fontSize="10" fontFamily="monospace">y = x</text>

                        {/* Exponential Curve */}
                        <path d={generateExpPath()} fill="none" stroke="#fb7185" strokeWidth="3" className="transition-all duration-150" />
                        
                        {/* Logarithmic Curve */}
                        <path d={generateLogPath()} fill="none" stroke="#38bdf8" strokeWidth="3" className="transition-all duration-150" />

                        {/* Mirror Connection Line */}
                        <line x1={getSvgX(mathX)} y1={getSvgY(expY)} x2={getSvgX(logX)} y2={getSvgY(logY)} stroke="#fcd34d" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" className="transition-all duration-75" />

                        {/* The Points */}
                        <circle cx={getSvgX(mathX)} cy={getSvgY(expY)} r="5" fill="#f43f5e" className="transition-all duration-75 shadow-lg" />
                        <circle cx={getSvgX(logX)} cy={getSvgY(logY)} r="5" fill="#0ea5e9" className="transition-all duration-75 shadow-lg" />
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 bg-black/80 px-2 py-1 rounded border border-white/10 text-[10px] font-mono text-rose-400">
                            <div className="w-2 h-2 rounded-full bg-rose-500" /> y = bˣ
                        </div>
                        <div className="flex items-center gap-2 bg-black/80 px-2 py-1 rounded border border-white/10 text-[10px] font-mono text-sky-400">
                            <div className="w-2 h-2 rounded-full bg-sky-500" /> y = log(x)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
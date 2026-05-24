"use client";
import React, { useState } from 'react';
import { Axis3d, Move } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function ComplexPlaneLab() {
    const [real, setReal] = useState(4);
    const [imag, setImag] = useState(3);

    // Math Calculations
    const modulus = Math.sqrt(real * real + imag * imag);
    let angleRad = Math.atan2(imag, real);
    if (angleRad < 0) angleRad += 2 * Math.PI;
    const angleDeg = (angleRad * 180) / Math.PI;

    // SVG Mapping
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 12; // 12px per math unit

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    const svgX = getSvgX(real);
    const svgY = getSvgY(imag);

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-magenta-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.15)] flex flex-col md:flex-row relative z-10">
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 p-6 md:p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-magenta-400">
                    <Axis3d size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Argand Visualizer</h3>
                </div>

                {/* The Complex Number */}
                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center mb-8 shadow-inner">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Complex Coordinate (z)</div>
                    <div className="text-3xl font-black font-mono text-white flex items-center gap-3">
                        <span className="text-cyan-400">{real}</span> 
                        <span className="text-zinc-500">{imag >= 0 ? '+' : '-'}</span> 
                        <span className="text-magenta-400">{Math.abs(imag)}i</span>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Real Slider */}
                    <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/20">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
                            <span>Real Part (a)</span>
                            <span className="font-mono text-white bg-cyan-500/20 px-2 py-0.5 rounded">{real}</span>
                        </div>
                        <input type="range" min="-10" max="10" step="1" value={real} onChange={(e) => setReal(Number(e.target.value))} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    {/* Imaginary Slider */}
                    <div className="bg-magenta-950/20 p-4 rounded-xl border border-magenta-500/20">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-magenta-400 mb-3">
                            <span>Imaginary Part (b)</span>
                            <span className="font-mono text-white bg-magenta-500/20 px-2 py-0.5 rounded">{imag}</span>
                        </div>
                        <input type="range" min="-10" max="10" step="1" value={imag} onChange={(e) => setImag(Number(e.target.value))} className="w-full accent-magenta-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                {/* Vector Readouts */}
                <div className="mt-6 flex justify-between gap-4">
                    <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Modulus |z|</div>
                        <div className="font-mono text-white text-lg"><M>{`\\approx ${modulus.toFixed(1)}`}</M></div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Angle θ</div>
                        <div className="font-mono text-white text-lg"><M>{`\\approx ${angleDeg.toFixed(0)}^\\circ`}</M></div>
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.15">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#a1a1aa" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#a1a1aa" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Real Axis (Cyan) */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
                        {/* Imaginary Axis (Magenta) */}
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#d946ef" strokeWidth="2" opacity="0.5" />

                        {/* Modulus Radius Circle (Faint) */}
                        {modulus > 0 && (
                            <circle cx={CENTER} cy={CENTER} r={modulus * SCALE} fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" className="transition-all duration-150" />
                        )}

                        {/* Vector Components */}
                        <g className="transition-all duration-150">
                            {/* Real component line */}
                            <line x1={CENTER} y1={CENTER} x2={svgX} y2={CENTER} stroke="#22d3ee" strokeWidth="3" />
                            {/* Imaginary component line */}
                            <line x1={svgX} y1={CENTER} x2={svgX} y2={svgY} stroke="#e879f9" strokeWidth="3" strokeDasharray="4 4" />
                            
                            {/* The Phasor (Vector to point) */}
                            <line x1={CENTER} y1={CENTER} x2={svgX} y2={svgY} stroke="#ffffff" strokeWidth="2" />
                            
                            {/* The Point */}
                            <circle cx={svgX} cy={svgY} r="6" fill="#fff" className="shadow-[0_0_15px_#fff]" />
                        </g>
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold uppercase">
                            <div className="w-2 h-2 rounded-full bg-cyan-500" /> Real Axis (x)
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-magenta-400 font-bold uppercase">
                            <div className="w-2 h-2 rounded-full bg-magenta-500" /> Imaginary Axis (y)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
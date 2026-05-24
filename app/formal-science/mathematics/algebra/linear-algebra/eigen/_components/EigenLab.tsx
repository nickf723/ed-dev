"use client";
import React, { useState } from 'react';
import { Target, Scaling } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function EigenLab() {
    // We use a symmetric matrix so it has nice real orthogonal eigenvectors
    // A = [ 2  1 ]
    //     [ 1  2 ]
    const A = { m11: 2, m12: 1, m21: 1, m22: 2 };

    // Input angle
    const [theta, setTheta] = useState(0); // 0 to 360 degrees

    const rad = (theta * Math.PI) / 180;
    
    // Input Vector (v) - Unit circle
    const vx = Math.cos(rad);
    const vy = Math.sin(rad);

    // Output Vector (w = Av)
    const wx = A.m11 * vx + A.m12 * vy;
    const wy = A.m21 * vx + A.m22 * vy;

    // Check alignment (Cross product of 2D vectors: vx*wy - vy*wx should be close to 0)
    const alignment = Math.abs(vx * wy - vy * wx);
    const isEigen = alignment < 0.1; // Threshold for snapping/glowing

    // Calculate dynamic scaling factor (lambda) if it's an eigenvector
    const lambda = isEigen ? (wx * vx + wy * vy) / (vx * vx + vy * vy) : null;

    // SVG Mapping
    const SIZE = 350;
    const CENTER = SIZE / 2;
    const SCALE = 40; // Pixels per unit

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
        <div className={`w-full bg-slate-950/80 backdrop-blur-2xl border rounded-3xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row relative z-10 ${isEigen ? 'border-fuchsia-500 shadow-[0_0_50px_rgba(217,70,239,0.3)]' : 'border-fuchsia-500/30 shadow-[0_0_40px_rgba(217,70,239,0.1)]'}`}>
            
            {/* LEFT: Controls & Readout */}
            <div className="w-full md:w-1/2 p-6 md:p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 text-fuchsia-400">
                    <Target size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Alignment Scanner</h3>
                </div>

                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center mb-6 shadow-inner">
                    <div className="text-[10px] text-fuchsia-500 uppercase tracking-widest font-bold mb-2">Matrix A</div>
                    <div className="text-xl font-mono text-white">
                        <M display={true}>{`\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}`}</M>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-500/20 shadow-inner">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-4">
                            <span>Input Angle (θ)</span>
                            <span className="bg-fuchsia-500/20 px-3 py-1 rounded font-mono text-base border border-fuchsia-500/30 text-white">{theta}°</span>
                        </div>
                        <input type="range" min="0" max="360" step="1" value={theta} onChange={(e) => setTheta(Number(e.target.value))} className="w-full accent-fuchsia-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-[10px] text-zinc-500 mt-2 font-mono">Drag to find the invariant axes.</div>
                    </div>
                </div>

                {/* Status Readout */}
                <div className={`mt-6 p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${isEigen ? 'bg-fuchsia-950/40 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-black/60 border-white/5'}`}>
                    {isEigen ? (
                        <>
                            <div className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-1 flex items-center gap-2 animate-pulse"><Scaling size={14} /> Eigenvector Locked</div>
                            <div className="text-lg font-mono text-white"><M>{`\\lambda \\approx ${lambda?.toFixed(1)}`}</M></div>
                        </>
                    ) : (
                        <>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</div>
                            <div className="text-sm font-mono text-zinc-400">Vectors Unaligned</div>
                        </>
                    )}
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[350px] aspect-square bg-[#0a0210] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.1">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#d946ef" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#d946ef" strokeWidth="1" />
                                </g>
                            );
                        })}
                        
                        {/* Unit Circle Reference */}
                        <circle cx={CENTER} cy={CENTER} r={SCALE} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />

                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#e879f9" strokeWidth="1.5" opacity="0.3" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#e879f9" strokeWidth="1.5" opacity="0.3" />

                        {/* Eigen-Axis Glow (When locked) */}
                        <g className="transition-opacity duration-300" opacity={isEigen ? 1 : 0}>
                            <line x1={CENTER - vx*400} y1={CENTER + vy*400} x2={CENTER + vx*400} y2={CENTER - vy*400} stroke="#d946ef" strokeWidth="4" opacity="0.3" />
                        </g>

                        <g className="transition-all duration-75">
                            {/* Output Vector w (Purple) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(wx)} ${getSvgY(wy)}`} stroke="#a855f7" strokeWidth="3" opacity="0.8" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(wx), getSvgY(wy))} fill="#a855f7" opacity="0.8" />
                            
                            {/* Input Vector v (White/Fuchsia) */}
                            <path d={`M ${CENTER} ${CENTER} L ${getSvgX(vx)} ${getSvgY(vy)}`} stroke={isEigen ? "#f0abfc" : "#ffffff"} strokeWidth="3" />
                            <path d={drawArrowhead(CENTER, CENTER, getSvgX(vx), getSvgY(vy))} fill={isEigen ? "#f0abfc" : "#ffffff"} />
                        </g>
                        <circle cx={CENTER} cy={CENTER} r="3" fill="#fff" />
                    </svg>

                    <div className="absolute top-4 left-4 flex flex-col gap-2 bg-black/80 p-2 rounded-lg border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white font-bold uppercase"><div className="w-2 h-2 bg-white rounded-full" /> Input <M>{`\\vec{v}`}</M></div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 font-bold uppercase"><div className="w-2 h-2 bg-purple-500 rounded-full" /> Output <M>{`A\\vec{v}`}</M></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";
import React, { useState } from 'react';
import { Crosshair, AlertCircle, CheckCircle2, GitMerge } from 'lucide-react';

export default function SystemExplorerLab() {
    // Line Alpha (Cyan)
    const [m1, setM1] = useState(1);
    const [b1, setB1] = useState(2);

    // Line Beta (Orange)
    const [m2, setM2] = useState(-1);
    const [b2, setB2] = useState(4);

    // Math Calculations
    let intersectX: number | string = 0;
    let intersectY: number | string = 0;
    let status = "intersect"; // 'intersect', 'parallel', 'infinite'

    if (m1 === m2) {
        if (b1 === b2) {
            status = "infinite";
            intersectX = "∞";
            intersectY = "∞";
        } else {
            status = "parallel";
            intersectX = "∅";
            intersectY = "∅";
        }
    } else {
        // m1*x + b1 = m2*x + b2  =>  x(m1 - m2) = b2 - b1
        intersectX = (b2 - b1) / (m1 - m2);
        intersectY = m1 * intersectX + b1;
    }

    const formatNum = (num: number | string) => {
        if (typeof num === 'string') return num;
        return Number.isInteger(num) ? num : num.toFixed(2);
    };

    // SVG Mapping
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 15;

    const getSvgX = (mathX: number) => CENTER + (mathX * SCALE);
    const getSvgY = (mathY: number) => CENTER - (mathY * SCALE);

    const getLinePoints = (m: number, b: number) => {
        const startMathX = -15;
        const endMathX = 15;
        return {
            x1: getSvgX(startMathX), y1: getSvgY(m * startMathX + b),
            x2: getSvgX(endMathX), y2: getSvgY(m * endMathX + b)
        };
    };

    const l1Pts = getLinePoints(m1, b1);
    const l2Pts = getLinePoints(m2, b2);

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col md:flex-row relative">
            
            {/* LEFT: Controls */}
            <div className="w-full md:w-1/2 p-6 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-6 text-cyan-400">
                    <GitMerge size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">System Visualizer</h3>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    {/* Line Alpha Controls */}
                    <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-500/30">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Line Alpha</h4>
                            <span className="font-mono text-white text-sm">y = {m1}x {b1 >= 0 ? '+' : '-'} {Math.abs(b1)}</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Slope (m)</label>
                                <input type="range" min="-5" max="5" step="0.5" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Y-Int (b)</label>
                                <input type="range" min="-10" max="10" step="1" value={b1} onChange={(e) => setB1(Number(e.target.value))} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Line Beta Controls */}
                    <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/30">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Line Beta</h4>
                            <span className="font-mono text-white text-sm">y = {m2}x {b2 >= 0 ? '+' : '-'} {Math.abs(b2)}</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Slope (m)</label>
                                <input type="range" min="-5" max="5" step="0.5" value={m2} onChange={(e) => setM2(Number(e.target.value))} className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-slate-400 uppercase">Y-Int (b)</label>
                                <input type="range" min="-10" max="10" step="1" value={b2} onChange={(e) => setB2(Number(e.target.value))} className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Solution Readout */}
                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center mt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Intersection Coordinate</div>
                        
                        {status === 'intersect' && (
                            <div className="text-2xl font-black font-mono text-white flex items-center gap-3">
                                <Crosshair size={20} className="text-emerald-400" />
                                ({formatNum(intersectX)}, {formatNum(intersectY)})
                            </div>
                        )}
                        {status === 'parallel' && (
                            <div className="text-xl font-black font-mono text-red-400 flex items-center gap-3 animate-pulse">
                                <AlertCircle size={20} />
                                NO SOLUTION
                            </div>
                        )}
                        {status === 'infinite' && (
                            <div className="text-xl font-black font-mono text-green-400 flex items-center gap-3 animate-pulse">
                                <CheckCircle2 size={20} />
                                INFINITE SOLUTIONS
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT: SVG Graph */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative z-10 bg-black/20">
                <div className="relative w-full max-w-[300px] aspect-square bg-[#080b14] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
                        {/* Grid */}
                        {Array.from({ length: 21 }).map((_, i) => {
                            const pos = CENTER + (i - 10) * SCALE;
                            return (
                                <g key={i} opacity="0.15">
                                    <line x1={pos} y1="0" x2={pos} y2={SIZE} stroke="#06b6d4" strokeWidth="1" />
                                    <line x1="0" y1={pos} x2={SIZE} y2={pos} stroke="#06b6d4" strokeWidth="1" />
                                </g>
                            );
                        })}
                        {/* Axes */}
                        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#a5f3fc" strokeWidth="1.5" opacity="0.4" />
                        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#a5f3fc" strokeWidth="1.5" opacity="0.4" />
                        
                        {/* Line Alpha */}
                        <line x1={l1Pts.x1} y1={l1Pts.y1} x2={l1Pts.x2} y2={l1Pts.y2} stroke="#06b6d4" strokeWidth="3" className="transition-all duration-150" opacity={status === 'infinite' ? 0.5 : 1}/>
                        
                        {/* Line Beta */}
                        <line x1={l2Pts.x1} y1={l2Pts.y1} x2={l2Pts.x2} y2={l2Pts.y2} stroke="#f97316" strokeWidth="3" className="transition-all duration-150" strokeDasharray={status === 'infinite' ? "6 6" : "none"}/>

                        {/* Intersection Point (FIXED CSS ANIMATION BUG) */}
                        {status === 'intersect' && typeof intersectX === 'number' && typeof intersectY === 'number' && (
                            <g className="transition-all duration-150">
                                <circle cx={getSvgX(intersectX)} cy={getSvgY(intersectY)} r="6" fill="#10b981" />
                                {/* Use native SVG animation instead of Tailwind animate-ping to avoid transform-origin issues */}
                                <circle cx={getSvgX(intersectX)} cy={getSvgY(intersectY)} fill="transparent" stroke="#10b981" strokeWidth="2">
                                    <animate attributeName="r" values="6; 20" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="1; 0" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            </g>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}
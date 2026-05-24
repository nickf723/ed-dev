"use client";
import React, { useState } from 'react';
import { LayoutGrid, ArrowRight, X } from 'lucide-react';

export default function FractionAreaLab() {
    const [n1, setN1] = useState(2);
    const [d1, setD1] = useState(3);
    const [n2, setN2] = useState(1);
    const [d2, setD2] = useState(4);

    // Prevent numerator from exceeding denominator
    if (n1 > d1) setN1(d1);
    if (n2 > d2) setN2(d2);

    const finalN = n1 * n2;
    const finalD = d1 * d2;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-orange-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans">
            
            <div className="bg-orange-950/30 border-b border-orange-500/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                        <LayoutGrid size={18} className="text-orange-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">Fraction Multiplication Visualizer</h3>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row p-6 md:p-8 gap-8 items-center lg:items-stretch">
                
                {/* LEFT: Controls & Math */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    
                    {/* Controls Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Fraction 1 (Horizontal - Amber) */}
                        <div className="bg-amber-900/20 p-4 rounded-2xl border border-amber-500/20">
                            <h4 className="text-amber-400 font-bold uppercase tracking-widest text-[10px] mb-4 text-center">Fraction 1 (Rows)</h4>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-400">Numerator ({n1})</label>
                                    <input type="range" min="1" max={d1} value={n1} onChange={(e) => setN1(Number(e.target.value))} className="w-full accent-amber-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-400">Denominator ({d1})</label>
                                    <input type="range" min="1" max="8" value={d1} onChange={(e) => setD1(Number(e.target.value))} className="w-full accent-amber-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Fraction 2 (Vertical - Rose) */}
                        <div className="bg-rose-900/20 p-4 rounded-2xl border border-rose-500/20">
                            <h4 className="text-rose-400 font-bold uppercase tracking-widest text-[10px] mb-4 text-center">Fraction 2 (Columns)</h4>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-400">Numerator ({n2})</label>
                                    <input type="range" min="1" max={d2} value={n2} onChange={(e) => setN2(Number(e.target.value))} className="w-full accent-rose-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-400">Denominator ({d2})</label>
                                    <input type="range" min="1" max="8" value={d2} onChange={(e) => setD2(Number(e.target.value))} className="w-full accent-rose-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Equation Readout */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center flex-1">
                        <div className="flex items-center gap-6 font-mono font-black text-3xl">
                            
                            <div className="flex flex-col items-center">
                                <span className="text-amber-400">{n1}</span>
                                <div className="w-10 h-1 bg-white/20 rounded-full my-1"/>
                                <span className="text-amber-200">{d1}</span>
                            </div>
                            
                            <X className="text-slate-500" size={24} />
                            
                            <div className="flex flex-col items-center">
                                <span className="text-rose-400">{n2}</span>
                                <div className="w-10 h-1 bg-white/20 rounded-full my-1"/>
                                <span className="text-rose-200">{d2}</span>
                            </div>

                            <span className="text-slate-500">=</span>

                            <div className="flex flex-col items-center">
                                <span className="text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">{finalN}</span>
                                <div className="w-12 h-1 bg-orange-500/50 rounded-full my-1"/>
                                <span className="text-white">{finalD}</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* RIGHT: The Visual Area Model */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-slate-900/50 rounded-3xl p-6 min-h-[350px]">
                    
                    <div className="relative w-full max-w-[300px] aspect-square bg-slate-950 border-2 border-slate-700 shadow-xl grid overflow-hidden" 
                         style={{ gridTemplateColumns: `repeat(${d2}, 1fr)`, gridTemplateRows: `repeat(${d1}, 1fr)` }}>
                        
                        {Array.from({ length: finalD }).map((_, i) => {
                            // Calculate Row and Col based on standard grid indices
                            const row = Math.floor(i / d2);
                            const col = i % d2;

                            const isAmber = row < n1;
                            const isRose = col < n2;
                            const isBoth = isAmber && isRose;

                            let bg = "transparent";
                            if (isBoth) bg = "bg-orange-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]";
                            else if (isAmber) bg = "bg-amber-500/30";
                            else if (isRose) bg = "bg-rose-500/30";

                            return (
                                <div key={i} className={`border border-white/10 transition-colors duration-300 ${bg}`} />
                            );
                        })}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            The grid has <strong className="text-white">{finalD}</strong> total boxes (Denominator).<br/>
                            <strong className="text-orange-400">{finalN}</strong> boxes are overlapped (Numerator).
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
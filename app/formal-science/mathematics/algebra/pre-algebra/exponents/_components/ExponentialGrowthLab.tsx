"use client";
import React, { useState } from 'react';
import { Superscript, TrendingUp, AlertTriangle, Plus, X as MultiplyIcon } from 'lucide-react';

export default function ExponentialGrowthLab() {
    const [base, setBase] = useState(2);
    const [n, setN] = useState(3);

    // Calculations
    const linearResult = base * n;
    const expResult = Math.pow(base, n);

    // Strings for the math breakdown
    const linearString = Array(n).fill(base).join(' + ');
    const expString = Array(n).fill(base).join(' × ');

    // Calculate maximum value to scale the bars visually (Cap at b=5, n=5 -> 3125)
    const maxVisual = Math.pow(5, 5); 
    const linearHeightPercent = Math.max(5, (linearResult / maxVisual) * 100);
    const expHeightPercent = Math.max(5, (expResult / maxVisual) * 100);

    const isHuge = expResult > 1000;
    const drawDots = expResult <= 256; // Prevent browser lag on massive numbers

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans flex flex-col">
            
            {/* Header */}
            <div className="bg-purple-950/30 border-b border-purple-500/20 p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <TrendingUp size={18} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">The Power Visualizer</h3>
                </div>
            </div>

            <div className="flex flex-col p-6 md:p-8 gap-8 flex-1">
                
                {/* TOP: Controls */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-2 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Base Number</span>
                            <span className="text-white bg-slate-500/20 px-2 rounded">{base}</span>
                        </div>
                        <input type="range" min="1" max="5" step="1" value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-slate-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    <div className="flex-1 space-y-2 bg-purple-900/20 p-4 rounded-2xl border border-purple-500/20">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                            <span>The Modifier (n)</span>
                            <span className="text-white bg-fuchsia-500/20 px-2 rounded">{n}</span>
                        </div>
                        <input type="range" min="1" max="5" step="1" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-fuchsia-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                {/* MIDDLE: Mathematical Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Linear Side (Multiplication = Addition) */}
                    <div className="bg-sky-950/20 border border-sky-500/20 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 w-full h-1 bg-sky-500/50" />
                        <h4 className="text-[10px] text-sky-400 uppercase font-black tracking-widest mb-4">Multiplication</h4>
                        
                        <div className="text-3xl font-black text-white font-mono mb-2">
                            {base} <span className="text-sky-400 text-2xl mx-1">×</span> {n}
                        </div>
                        
                        <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 font-mono text-sky-300 text-sm mb-4">
                            {linearString}
                        </div>

                        <div className="text-4xl font-black text-white mb-6">
                            = {linearResult}
                        </div>

                        {/* Dot Visualizer */}
                        <div className="flex flex-wrap justify-center gap-2 mt-auto">
                            {Array.from({length: n}).map((_, i) => (
                                <div key={i} className="flex gap-1 p-1.5 bg-sky-500/10 rounded-md border border-sky-500/20">
                                    {Array.from({length: base}).map((_, j) => (
                                        <div key={j} className="w-2 h-2 rounded-full bg-sky-400" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exponential Side (Exponents = Multiplication) */}
                    <div className="bg-fuchsia-950/20 border border-fuchsia-500/20 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 w-full h-1 bg-fuchsia-500/50" />
                        <h4 className="text-[10px] text-fuchsia-400 uppercase font-black tracking-widest mb-4">Exponentiation</h4>
                        
                        <div className="text-3xl font-black text-white font-mono mb-2 flex items-start justify-center">
                            {base} <span className="text-xl text-fuchsia-400 mt-0.5 ml-0.5">{n}</span>
                        </div>
                        
                        <div className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 font-mono text-fuchsia-300 text-sm mb-4">
                            {expString}
                        </div>

                        <div className="text-4xl font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                            = {expResult}
                        </div>

                        {/* Dot Visualizer */}
                        <div className="flex flex-wrap justify-center gap-1 mt-auto max-w-[250px]">
                            {drawDots ? (
                                Array.from({length: expResult}).map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
                                ))
                            ) : (
                                <div className="text-xs text-fuchsia-400/70 font-mono bg-fuchsia-500/10 px-3 py-2 rounded-lg flex items-center gap-2">
                                    <AlertTriangle size={14} /> Too many particles to draw!
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* BOTTOM: Bar Chart Scale */}
                <div className="w-full bg-slate-900/50 rounded-2xl p-6 border border-white/5 flex flex-col justify-end min-h-[250px]">
                    <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-6 text-center">Scale Comparison</h4>
                    
                    <div className="flex-1 flex items-end justify-center gap-12 md:gap-32 pb-4 border-b-2 border-slate-700/50 relative">
                        
                        {/* Linear Bar */}
                        <div className="flex flex-col items-center gap-2 w-24">
                            {/* Permanently visible label */}
                            <div className="text-center mb-1">
                                <div className="font-black text-xl text-white">{linearResult}</div>
                            </div>
                            <div 
                                className="w-full bg-sky-500/80 rounded-t-md transition-all duration-500 ease-out shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                style={{ height: `${linearHeightPercent}%` }}
                            />
                            <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                                <Plus size={12} /> Linear
                            </div>
                        </div>

                        {/* Exponential Bar */}
                        <div className="flex flex-col items-center gap-2 w-24">
                            {/* Permanently visible label */}
                            <div className="text-center mb-1">
                                <div className="font-black text-xl text-white">{expResult}</div>
                            </div>
                            <div 
                                className="w-full bg-gradient-to-t from-purple-600 to-fuchsia-400 rounded-t-md transition-all duration-500 ease-out shadow-[0_0_20px_rgba(217,70,239,0.4)] relative overflow-hidden"
                                style={{ height: `${expHeightPercent}%` }}
                            >
                                {isHuge && <div className="absolute top-0 w-full h-4 bg-white/50 animate-pulse" />}
                            </div>
                            <div className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                                <Superscript size={12} /> Exponent
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
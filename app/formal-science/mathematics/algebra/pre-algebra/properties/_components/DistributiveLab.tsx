"use client";
import React, { useState } from 'react';
import { Network, ArrowRight, Expand } from 'lucide-react';

export default function DistributiveLab() {
    const [A, setA] = useState(4);
    const [B, setB] = useState(5);
    const [C, setC] = useState(3);

    const area1 = A * B;
    const area2 = A * C;
    const totalArea = A * (B + C);

    // For visual scaling max height/width
    const maxDimension = 15;
    const scaleFactor = 12; // pixels per unit

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header */}
            <div className="bg-emerald-950/30 border-b border-emerald-500/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <Expand size={18} className="text-emerald-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">Distributive Area Model</h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-center">
                
                {/* LEFT: Controls & Math */}
                <div className="w-full md:w-1/2 flex flex-col gap-8">
                    
                    {/* The Sliders */}
                    <div className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-emerald-400">
                                <span>A (Multiplier / Height)</span>
                                <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-white">{A}</span>
                            </div>
                            <input type="range" min="1" max="10" step="1" value={A} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-blue-400">
                                <span>B (First Inner Term)</span>
                                <span className="bg-blue-500/20 px-2 py-0.5 rounded text-white">{B}</span>
                            </div>
                            <input type="range" min="1" max="10" step="1" value={B} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-yellow-400">
                                <span>C (Second Inner Term)</span>
                                <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-white">{C}</span>
                            </div>
                            <input type="range" min="1" max="10" step="1" value={C} onChange={(e) => setC(Number(e.target.value))} className="w-full accent-yellow-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>

                    {/* The Equation Output */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-emerald-500/20 flex flex-col items-center">
                        <div className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-widest mb-4">Algebraic Proof</div>
                        
                        <div className="flex flex-col gap-4 text-2xl md:text-3xl font-black font-mono text-center">
                            {/* Step 1: Factored Form */}
                            <div>
                                <span className="text-emerald-400">{A}</span>
                                <span className="text-slate-500">(</span>
                                <span className="text-blue-400">{B}</span> <span className="text-slate-500">+</span> <span className="text-yellow-400">{C}</span>
                                <span className="text-slate-500">)</span>
                            </div>
                            
                            <ArrowRight className="text-slate-600 mx-auto" size={20} />
                            
                            {/* Step 2: Expanded Form */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="bg-white/5 px-3 py-1 rounded-lg">
                                    <span className="text-emerald-400">{A}</span>
                                    <span className="text-slate-500 text-lg mx-1">×</span>
                                    <span className="text-blue-400">{B}</span>
                                </span>
                                <span className="text-slate-500">+</span>
                                <span className="bg-white/5 px-3 py-1 rounded-lg">
                                    <span className="text-emerald-400">{A}</span>
                                    <span className="text-slate-500 text-lg mx-1">×</span>
                                    <span className="text-yellow-400">{C}</span>
                                </span>
                            </div>

                            <ArrowRight className="text-slate-600 mx-auto" size={20} />

                            {/* Step 3: Final Answer */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-blue-300">{area1}</span>
                                <span className="text-slate-500">+</span>
                                <span className="text-yellow-300">{area2}</span>
                                <span className="text-slate-500">=</span>
                                <span className="text-white text-4xl">{totalArea}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT: The Visual Area Model */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-900/30 p-8 rounded-3xl min-h-[300px]">
                    <div className="relative flex items-end">
                        
                        {/* Height Label (A) */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-xl font-mono">
                            {A}
                        </div>

                        <div className="flex">
                            {/* Block 1 (A * B) */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-blue-400 font-black text-lg font-mono transition-all">{B}</div>
                                <div 
                                    className="bg-blue-500/20 border-2 border-blue-500 rounded-l-lg flex items-center justify-center shadow-inner transition-all duration-300 ease-out"
                                    style={{ width: `${B * scaleFactor}px`, height: `${A * scaleFactor}px`, minWidth: '40px', minHeight: '40px' }}
                                >
                                    <span className="text-blue-200 font-bold font-mono opacity-80">{area1}</span>
                                </div>
                            </div>

                            {/* Block 2 (A * C) */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-yellow-400 font-black text-lg font-mono transition-all">{C}</div>
                                <div 
                                    className="bg-yellow-500/20 border-2 border-l-0 border-yellow-500 rounded-r-lg flex items-center justify-center shadow-inner transition-all duration-300 ease-out"
                                    style={{ width: `${C * scaleFactor}px`, height: `${A * scaleFactor}px`, minWidth: '40px', minHeight: '40px' }}
                                >
                                    <span className="text-yellow-200 font-bold font-mono opacity-80">{area2}</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Width Bracket */}
                        <div className="absolute -bottom-8 left-0 right-0 flex justify-center text-slate-400 font-bold font-mono text-sm border-t-2 border-slate-700/50 pt-1 mt-1">
                            Width = {B + C}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
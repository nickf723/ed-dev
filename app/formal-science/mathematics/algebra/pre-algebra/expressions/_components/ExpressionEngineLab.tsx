"use client";
import React, { useState } from 'react';
import { Variable, ArrowRight, Combine, Zap } from 'lucide-react';

export default function ExpressionEngineLab() {
    // We are evaluating: 3x + 4 + 2x - 1
    // Simplified: 5x + 3
    const [xVal, setXVal] = useState(2);

    // Messy Expression Breakdown
    const term1 = 3 * xVal; // 3x
    const term2 = 4;        // + 4
    const term3 = 2 * xVal; // + 2x
    const term4 = -1;       // - 1
    const messyTotal = term1 + term2 + term3 + term4;

    // Simplified Expression Breakdown
    const simpTerm1 = 5 * xVal; // 5x
    const simpTerm2 = 3;        // + 3
    const simpTotal = simpTerm1 + simpTerm2;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans flex flex-col">
            
            {/* Header */}
            <div className="bg-cyan-950/30 border-b border-cyan-500/20 p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <Combine size={18} className="text-cyan-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">Simplification Engine</h3>
                </div>
            </div>

            <div className="flex flex-col p-6 md:p-8 gap-8">
                
                {/* Control Slider */}
                <div className="w-full max-w-md mx-auto bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
                        <span>Set the Value of 'x'</span>
                        <span className="text-white bg-cyan-500/20 px-3 py-1 rounded font-mono text-lg">{xVal}</span>
                    </div>
                    <input 
                        type="range" min="-5" max="10" step="1" 
                        value={xVal} onChange={(e) => setXVal(Number(e.target.value))} 
                        className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                    />
                </div>

                {/* Side-by-Side Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* The Messy Expression */}
                    <div className="bg-black/40 border border-slate-700 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute top-0 w-full h-1 bg-slate-500/50" />
                        <h4 className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">Unsimplified Expression</h4>
                        
                        {/* Algebraic Form */}
                        <div className="text-2xl font-black font-mono text-white mb-6 bg-white/5 px-6 py-3 rounded-xl border border-white/10 flex flex-wrap justify-center gap-2">
                            <span className="text-cyan-400">3x</span>
                            <span className="text-slate-400">+</span>
                            <span className="text-amber-400">4</span>
                            <span className="text-slate-400">+</span>
                            <span className="text-cyan-400">2x</span>
                            <span className="text-slate-400">-</span>
                            <span className="text-amber-400">1</span>
                        </div>
                        
                        <ArrowRight className="text-slate-600 rotate-90 mb-4" size={20} />

                        {/* Evaluated Form */}
                        <div className="text-lg font-mono text-slate-300 mb-6 flex flex-wrap justify-center gap-2 items-center">
                            <span className="text-cyan-200">3({xVal})</span>
                            <span className="text-slate-500">+</span>
                            <span className="text-amber-200">4</span>
                            <span className="text-slate-500">+</span>
                            <span className="text-cyan-200">2({xVal})</span>
                            <span className="text-slate-500">-</span>
                            <span className="text-amber-200">1</span>
                        </div>

                        {/* Calculated Steps */}
                        <div className="text-lg font-mono text-slate-400 mb-6 flex flex-wrap justify-center gap-2">
                            <span className="text-cyan-400 font-bold">{term1}</span>
                            <span>+</span>
                            <span className="text-amber-400 font-bold">{term2}</span>
                            <span>+</span>
                            <span className="text-cyan-400 font-bold">{term3}</span>
                            <span>{term4}</span>
                        </div>

                        {/* Final Result */}
                        <div className="mt-auto text-4xl font-black text-white bg-slate-900/80 w-full py-4 rounded-xl border border-slate-700">
                            = {messyTotal}
                        </div>
                    </div>

                    {/* The Simplified Expression */}
                    <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                        <div className="absolute top-0 w-full h-1 bg-cyan-500/80 shadow-[0_0_10px_cyan]" />
                        <h4 className="text-[10px] text-cyan-400 uppercase font-black tracking-widest mb-6 flex items-center gap-2">
                            <Zap size={12}/> Simplified Expression
                        </h4>
                        
                        {/* Algebraic Form */}
                        <div className="text-2xl font-black font-mono text-white mb-6 bg-cyan-500/10 px-6 py-3 rounded-xl border border-cyan-500/30 flex flex-wrap justify-center gap-2 shadow-inner">
                            <span className="text-cyan-400">5x</span>
                            <span className="text-slate-400">+</span>
                            <span className="text-amber-400">3</span>
                        </div>
                        
                        <ArrowRight className="text-cyan-600/50 rotate-90 mb-4" size={20} />

                        {/* Evaluated Form */}
                        <div className="text-lg font-mono text-slate-300 mb-6 flex flex-wrap justify-center gap-2 items-center">
                            <span className="text-cyan-200">5({xVal})</span>
                            <span className="text-slate-500">+</span>
                            <span className="text-amber-200">3</span>
                        </div>

                        {/* Calculated Steps */}
                        <div className="text-lg font-mono text-slate-400 mb-6 flex flex-wrap justify-center gap-2">
                            <span className="text-cyan-400 font-bold">{simpTerm1}</span>
                            <span>+</span>
                            <span className="text-amber-400 font-bold">{simpTerm2}</span>
                        </div>

                        {/* Final Result */}
                        <div className="mt-auto text-4xl font-black text-white bg-cyan-900/40 w-full py-4 rounded-xl border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
                            = {simpTotal}
                        </div>
                    </div>

                </div>
                
                <div className="text-center text-xs text-slate-400 bg-white/5 p-4 rounded-xl mt-2">
                    Notice how both sides ALWAYS equal the exact same number, no matter what <strong className="text-cyan-400 font-mono">x</strong> is. Simplifying an expression just means doing the math early so there are fewer pieces to plug numbers into later!
                </div>

            </div>
        </div>
    );
}
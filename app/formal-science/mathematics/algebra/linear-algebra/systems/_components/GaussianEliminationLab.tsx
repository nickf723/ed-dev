"use client";
import React, { useState } from 'react';
import { ArrowRight, RotateCw, Divide, X, CheckCircle2, RotateCcw } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function GaussianEliminationLab() {
    const [step, setStep] = useState(0);

    // Hardcoded steps for the system:
    // 2x + 3y = 5
    // 1x - 1y = 0
    // Solution: x = 1, y = 1
    const steps = [
        {
            title: "The Starting Matrix",
            desc: "We extract the coefficients into an augmented matrix.",
            op: null,
            matrix: "\\left[ \\begin{array}{cc|c} 2 & 3 & 5 \\\\ 1 & -1 & 0 \\end{array} \\right]"
        },
        {
            title: "Move 1: Swap",
            desc: "We want a '1' in the top-left corner. Swapping Row 1 and Row 2 gets us there instantly.",
            op: "R_1 \\leftrightarrow R_2",
            icon: RotateCw,
            color: "text-blue-400",
            matrix: "\\left[ \\begin{array}{cc|c} 1 & -1 & 0 \\\\ 2 & 3 & 5 \\end{array} \\right]"
        },
        {
            title: "Move 2: Eliminate",
            desc: "We need a '0' below that leading 1. We subtract 2 times Row 1 from Row 2.",
            op: "R_2 \\leftarrow R_2 - 2R_1",
            icon: X,
            color: "text-indigo-400",
            matrix: "\\left[ \\begin{array}{cc|c} 1 & -1 & 0 \\\\ 0 & 5 & 5 \\end{array} \\right]"
        },
        {
            title: "Move 3: Scale",
            desc: "We want a '1' in the second column pivot. Divide Row 2 by 5.",
            op: "R_2 \\leftarrow \\frac{1}{5}R_2",
            icon: Divide,
            color: "text-cyan-400",
            matrix: "\\left[ \\begin{array}{cc|c} 1 & -1 & 0 \\\\ 0 & 1 & 1 \\end{array} \\right]"
        },
        {
            title: "Move 4: Eliminate (RREF)",
            desc: "Finally, eliminate the value above the second pivot by adding Row 2 to Row 1.",
            op: "R_1 \\leftarrow R_1 + R_2",
            icon: X,
            color: "text-indigo-400",
            matrix: "\\left[ \\begin{array}{cc|c} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\end{array} \\right]"
        }
    ];

    const current = steps[step];
    const Icon = current.icon;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col relative z-10">
            
            {/* Header */}
            <div className="bg-blue-950/30 border-b border-blue-500/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <ArrowRight size={18} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">Gaussian Elimination Engine</h3>
                </div>
                <div className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                    Step {step + 1} / {steps.length}
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
                
                {/* Left: The Math */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                    <div className="text-3xl md:text-4xl text-white font-black drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] bg-black/60 p-8 rounded-2xl border border-white/5 shadow-inner min-w-[250px] flex justify-center">
                        <M display={true}>{current.matrix}</M>
                    </div>
                    
                    {/* Operation Tag */}
                    <div className="h-10 mt-6 flex items-center justify-center">
                        {current.op && (
                            <div className="bg-blue-950/50 border border-blue-500/40 px-4 py-2 rounded-full font-mono text-sm text-blue-300 flex items-center gap-3 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                {Icon && <Icon size={16} className={current.color} />}
                                <M>{current.op}</M>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: The Explanation & Controls */}
                <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
                    <h4 className="text-2xl font-bold text-white">{current.title}</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6 h-20">
                        {current.desc}
                    </p>

                    <div className="flex gap-4 w-full mt-auto">
                        <button 
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowRight size={20} className="rotate-180" />
                        </button>
                        
                        {step < steps.length - 1 ? (
                            <button 
                                onClick={() => setStep(step + 1)}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-sm rounded-xl py-3 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2"
                            >
                                Next Move <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button 
                                onClick={() => setStep(0)}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm rounded-xl py-3 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} /> Reset
                            </button>
                        )}
                    </div>
                    
                    {/* Completion State */}
                    <div className={`mt-4 w-full text-center text-xs font-bold font-mono tracking-widest transition-opacity duration-500 ${step === steps.length - 1 ? 'opacity-100 text-emerald-400' : 'opacity-0'}`}>
                        <CheckCircle2 size={16} className="inline mr-2 -mt-0.5" />
                        SYSTEM SOLVED: x = 1, y = 1
                    </div>
                </div>
            </div>
        </div>
    );
}
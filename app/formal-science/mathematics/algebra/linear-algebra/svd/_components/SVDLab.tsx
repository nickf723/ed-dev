"use client";
import React, { useState } from 'react';
import { Layers, RotateCcw, Scaling, RotateCw, Play, ArrowRight } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function SVDLab() {
    const [step, setStep] = useState(0);

    // Hardcoded SVD for visual demonstration
    // V^T rotation: -30 degrees
    // Sigma scaling: sx = 3, sy = 1
    // U rotation: 45 degrees
    
    let transformStr = "rotate(0) scale(1, 1) rotate(0)";
    let desc = "The starting state: A perfect unit circle.";
    let activeMatrix = "None";

    if (step === 1) {
        // Step 1: V^T rotates the input space
        transformStr = "rotate(0) scale(1, 1) rotate(-30)";
        desc = "Vᵀ rotates the unit circle to align with the matrix's input axes.";
        activeMatrix = "V^T";
    } else if (step === 2) {
        // Step 2: Sigma scales along standard axes
        transformStr = "rotate(0) scale(3, 1) rotate(-30)";
        desc = "Σ stretches the space along the X and Y axes, creating an ellipse. This is where the area/volume physically scales.";
        activeMatrix = "\\Sigma";
    } else if (step === 3) {
        // Step 3: U rotates to final output space
        transformStr = "rotate(45) scale(3, 1) rotate(-30)";
        desc = "U rotates the newly stretched ellipse into its final output orientation. The transformation is complete.";
        activeMatrix = "U";
    }

    // SVG Layout
    const SIZE = 350;
    const CENTER = SIZE / 2;

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-pink-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(244,114,182,0.15)] flex flex-col relative z-10">
            
            {/* Header */}
            <div className="bg-pink-950/30 border-b border-pink-500/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 border border-pink-500/30 rounded-lg">
                        <Layers size={18} className="text-pink-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">SVD Pipeline Visualizer</h3>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                
                {/* SVG Graph */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-[300px] aspect-square bg-[#0f0206] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                        <svg viewBox="-5 -5 10 10" className="w-full h-full overflow-visible">
                            {/* Static Grid */}
                            <g stroke="rgba(244,114,182,0.2)" strokeWidth="0.05">
                                {Array.from({length: 11}).map((_, i) => (
                                    <line key={`v${i}`} x1={i-5} y1="-5" x2={i-5} y2="5" />
                                ))}
                                {Array.from({length: 11}).map((_, i) => (
                                    <line key={`h${i}`} x1="-5" y1={i-5} x2="5" y2={i-5} />
                                ))}
                            </g>
                            
                            {/* Axes */}
                            <line x1="-5" y1="0" x2="5" y2="0" stroke="rgba(244,114,182,0.5)" strokeWidth="0.1" />
                            <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(244,114,182,0.5)" strokeWidth="0.1" />

                            {/* The Transforming Object */}
                            <g 
                                style={{ transform: transformStr, transformOrigin: "0 0" }} 
                                className="transition-all duration-1000 ease-in-out"
                            >
                                {/* The Circle/Ellipse */}
                                <circle cx="0" cy="0" r="1" fill="rgba(251, 113, 133, 0.2)" stroke="#fb7185" strokeWidth="0.05" />
                                
                                {/* Internal Orthogonal Vectors (To show rotation vs scaling) */}
                                <line x1="0" y1="0" x2="1" y2="0" stroke="#38bdf8" strokeWidth="0.1" /> {/* Cyan Axis */}
                                <line x1="0" y1="0" x2="0" y2="1" stroke="#a3e635" strokeWidth="0.1" /> {/* Lime Axis */}
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Controls & Explanation */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 w-full shadow-inner flex flex-col items-center justify-center min-h-[100px]">
                        <div className="text-3xl font-black font-mono text-white mb-2">
                            {step === 0 ? <M>A = U \Sigma V^T</M> : <M>{activeMatrix}</M>}
                        </div>
                        <div className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">
                            {step === 0 ? "Full Transformation Matrix" : "Active Component"}
                        </div>
                    </div>

                    <p className="text-sm text-zinc-300 min-h-[60px] leading-relaxed">
                        {desc}
                    </p>

                    {/* Progress Bar / Pipeline */}
                    <div className="flex items-center gap-2 w-full max-w-sm mt-4">
                        <button onClick={() => setStep(0)} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${step === 0 ? 'bg-zinc-700 text-white shadow-inner' : 'bg-black/40 text-zinc-500 border border-white/5 hover:border-pink-500/50'}`}>Start</button>
                        <ArrowRight size={14} className="text-zinc-600" />
                        <button onClick={() => setStep(1)} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${step === 1 ? 'bg-cyan-900/80 text-cyan-300 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-zinc-500 border border-white/5 hover:border-cyan-500/50'}`}>Vᵀ</button>
                        <ArrowRight size={14} className="text-zinc-600" />
                        <button onClick={() => setStep(2)} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${step === 2 ? 'bg-pink-900/80 text-pink-300 border border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-black/40 text-zinc-500 border border-white/5 hover:border-pink-500/50'}`}>Σ</button>
                        <ArrowRight size={14} className="text-zinc-600" />
                        <button onClick={() => setStep(3)} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${step === 3 ? 'bg-lime-900/80 text-lime-300 border border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.3)]' : 'bg-black/40 text-zinc-500 border border-white/5 hover:border-lime-500/50'}`}>U</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
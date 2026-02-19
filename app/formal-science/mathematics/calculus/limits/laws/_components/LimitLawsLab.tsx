"use client";
import React, { useState } from 'react';
import { Divide, X, ArrowDown } from 'lucide-react';

export default function LimitLawsLab() {
  const [step, setStep] = useState(0); 
  // 0: Problem State ((x^2 - 9) / (x - 3))
  // 1: Factored State ((x-3)(x+3) / (x-3))
  // 2: Cancelled State (x + 3)

  // Math Rendering
  const width = 600;
  const height = 300;
  const toSvgX = (x: number) => (x / 6) * width; // 0..6
  const toSvgY = (y: number) => height - (y / 8) * height; // 0..8

  const xVal = 3; // The target limit
  
  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-blue-500 flex items-center gap-2">
                <Divide size={14} /> Algebraic X-Ray
            </div>
            <div className="flex gap-2">
                 <button onClick={() => setStep(0)} className={`w-8 h-2 rounded-full transition-colors ${step >= 0 ? 'bg-blue-500' : 'bg-neutral-800'}`} />
                 <button onClick={() => setStep(1)} className={`w-8 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-blue-500' : 'bg-neutral-800'}`} />
                 <button onClick={() => setStep(2)} className={`w-8 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-blue-500' : 'bg-neutral-800'}`} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-black/20 relative h-[300px]">
                 <svg viewBox="0 0 600 300" className="w-full h-full">
                    {/* Grid Lines */}
                    <line x1={toSvgX(3)} y1="0" x2={toSvgX(3)} y2="300" stroke="#333" strokeDasharray="4" />
                    <text x={toSvgX(3)+5} y="290" fill="#555" fontSize="12">x=3</text>

                    {/* The Line y = x + 3 */}
                    <path d={`M ${toSvgX(0)} ${toSvgY(3)} L ${toSvgX(6)} ${toSvgY(9)}`} stroke="#3b82f6" strokeWidth="4" />
                    
                    {/* The Hole at (3, 6) */}
                    <circle 
                        cx={toSvgX(3)} cy={toSvgY(6)} r="6" 
                        fill={step === 2 ? "#3b82f6" : "#000"} 
                        stroke="#3b82f6" strokeWidth="2" 
                        className="transition-all duration-500"
                    />

                    {/* Annotations */}
                    <g transform={`translate(${toSvgX(1)}, ${toSvgY(6)})`}>
                        <text fill="white" fontSize="24" fontFamily="monospace">
                            {step === 0 && "f(x) = (x²-9)/(x-3)"}
                            {step === 1 && "f(x) = (x-3)(x+3)/(x-3)"}
                            {step === 2 && "y = x + 3"}
                        </text>
                    </g>
                 </svg>
            </div>

            {/* CONTROLS */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                {/* STAGE 0 */}
                <div className={`transition-opacity duration-500 ${step === 0 ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <h3 className="text-white font-bold mb-1">1. The Problem</h3>
                    <p className="text-sm text-neutral-400 mb-2">Direct substitution fails.</p>
                    <code className="bg-black px-2 py-1 rounded text-red-400">f(3) = 0/0</code>
                    {step === 0 && (
                        <button onClick={() => setStep(1)} className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white uppercase tracking-widest">
                            Apply Factoring <ArrowDown size={14}/>
                        </button>
                    )}
                </div>

                {/* STAGE 1 */}
                <div className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <h3 className="text-white font-bold mb-1">2. The X-Ray</h3>
                    <p className="text-sm text-neutral-400 mb-2">Identify the problem term.</p>
                    <code className="bg-black px-2 py-1 rounded text-blue-300">
                        <span className="text-red-400">(x-3)</span>(x+3) / <span className="text-red-400">(x-3)</span>
                    </code>
                    {step === 1 && (
                        <button onClick={() => setStep(2)} className="mt-4 flex items-center gap-2 text-xs font-bold text-green-400 hover:text-white uppercase tracking-widest">
                            Cancel Terms <X size={14}/>
                        </button>
                    )}
                </div>

                {/* STAGE 2 */}
                <div className={`transition-opacity duration-500 ${step === 2 ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <h3 className="text-white font-bold mb-1">3. The Solution</h3>
                    <p className="text-sm text-neutral-400 mb-2">The hole is filled mathematically.</p>
                    <code className="bg-black px-2 py-1 rounded text-green-400">3 + 3 = 6</code>
                </div>

            </div>
        </div>
    </div>
  );
}
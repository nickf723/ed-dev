"use client";
import React, { useState } from 'react';
import { FunctionSquare, ArrowRight, Activity, Cpu } from 'lucide-react';

const FUNCTIONS = [
    { id: 'linear', label: 'Linear', formula: 'f(x) = 2x + 3', calc: (x: number) => 2 * x + 3 },
    { id: 'quadratic', label: 'Quadratic', formula: 'f(x) = x² - 4', calc: (x: number) => (x * x) - 4 },
    { id: 'absolute', label: 'Absolute', formula: 'f(x) = |x - 5|', calc: (x: number) => Math.abs(x - 5) }
];

export default function FunctionMachine() {
    const [xValue, setXValue] = useState(5);
    const [activeFunc, setActiveFunc] = useState(FUNCTIONS[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [yValue, setYValue] = useState(activeFunc.calc(5));

    const handleProcess = () => {
        setIsProcessing(true);
        // Simulate "calculation time" for dramatic effect
        setTimeout(() => {
            setYValue(activeFunc.calc(xValue));
            setIsProcessing(false);
        }, 600);
    };

    return (
        <div className="w-full bg-black/40 backdrop-blur-xl border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl font-mono">
            
            {/* Header */}
            <div className="bg-indigo-950/30 border-b border-indigo-500/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <Cpu size={16} /> The Function Machine
                </div>
            </div>

            <div className="p-6 md:p-12 flex flex-col items-center">
                
                {/* Function Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {FUNCTIONS.map(f => (
                        <button 
                            key={f.id}
                            onClick={() => { setActiveFunc(f); setYValue(f.calc(xValue)); }}
                            className={`px-4 py-2 rounded-lg text-sm transition-all border ${activeFunc.id === f.id ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-black/50 text-zinc-400 border-white/5 hover:text-white'}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* The Machine Visualizer */}
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
                    
                    {/* INPUT (X) */}
                    <div className="flex flex-col items-center gap-2 z-10">
                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">Input (x)</span>
                        <div className="w-24 h-24 bg-black/60 border-2 border-indigo-500/50 rounded-2xl flex items-center justify-center shadow-inner relative group">
                            <input 
                                type="number" 
                                value={xValue} 
                                onChange={(e) => setXValue(Number(e.target.value))}
                                className="w-full bg-transparent text-center text-4xl font-black text-white outline-none"
                            />
                            {/* Up/Down carets for visual polish */}
                            <div className="absolute right-2 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setXValue(x => x + 1)} className="text-indigo-400 hover:text-white">▲</button>
                                <button onClick={() => setXValue(x => x - 1)} className="text-indigo-400 hover:text-white">▼</button>
                            </div>
                        </div>
                    </div>

                    {/* PIPELINE & PROCESSOR */}
                    <div className="flex items-center gap-2">
                        <ArrowRight className={`text-indigo-500/50 ${isProcessing ? 'animate-pulse text-indigo-400' : ''}`} size={32} />
                        
                        <button 
                            onClick={handleProcess}
                            className={`relative w-48 h-32 bg-indigo-950/50 border border-indigo-500/50 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-indigo-900/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] ${isProcessing ? 'scale-95 border-indigo-400 bg-indigo-600/20' : ''}`}
                        >
                            <FunctionSquare className={`text-indigo-400 mb-2 ${isProcessing ? 'animate-spin' : ''}`} size={24} />
                            <span className="text-white font-bold text-xl">{activeFunc.formula}</span>
                            <span className="text-[9px] text-indigo-300/50 uppercase tracking-widest mt-2 absolute bottom-3">Click to Process</span>
                        </button>
                        
                        <ArrowRight className={`text-fuchsia-500/50 ${isProcessing ? 'animate-pulse text-fuchsia-400' : ''}`} size={32} />
                    </div>

                    {/* OUTPUT (Y) */}
                    <div className="flex flex-col items-center gap-2 z-10">
                        <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-[10px]">Output f(x)</span>
                        <div className={`w-24 h-24 bg-black/60 border-2 border-fuchsia-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.1)] transition-all duration-500 ${isProcessing ? 'opacity-50 scale-90 blur-sm' : 'opacity-100 scale-100 blur-none'}`}>
                            <span className="text-4xl font-black text-white">{yValue}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
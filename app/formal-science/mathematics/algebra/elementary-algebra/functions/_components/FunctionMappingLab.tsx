"use client";
import React, { useState } from 'react';
import { Settings2, ArrowRight } from 'lucide-react';
import { M } from "@/app/_components/Math";

export default function FunctionMappingLab() {
    const [funcType, setFuncType] = useState<'linear' | 'quadratic' | 'absolute'>('quadratic');
    const [activeX, setActiveX] = useState<number>(2);

    // The fixed domain we are mapping
    const domain = [-3, -2, -1, 0, 1, 2, 3];

    // Function definitions
    const functions = {
        linear: { label: "2x + 1", calc: (x: number) => 2 * x + 1 },
        quadratic: { label: "x^2 - 2", calc: (x: number) => x * x - 2 },
        absolute: { label: "|x|", calc: (x: number) => Math.abs(x) }
    };

    const currentFunc = functions[funcType];
    const activeY = currentFunc.calc(activeX);

    // Get unique range values for the right-side layout
    const rawRange = domain.map(x => currentFunc.calc(x));
    const range = Array.from(new Set(rawRange)).sort((a, b) => a - b);

    // SVG Layout Configuration
    const width = 400;
    const height = 350;
    const leftX = 100;
    const rightX = 300;

    // Helper to get Y coordinate for a value in a list
    const getY = (index: number, total: number) => {
        const spacing = height / (total + 1);
        return spacing * (index + 1);
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-pink-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)] flex flex-col lg:flex-row relative z-10">
            
            {/* LEFT: Controls */}
            <div className="w-full lg:w-2/5 p-8 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center bg-black/20">
                <div className="flex items-center gap-3 mb-8 text-pink-400">
                    <Settings2 size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">The Mapping Engine</h3>
                </div>

                <div className="space-y-6">
                    {/* Function Selector */}
                    <div className="bg-pink-950/20 p-5 rounded-xl border border-pink-500/20 shadow-inner">
                        <label className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-3">
                            Select Machine <M>f(x)</M>
                        </label>
                        <div className="flex flex-col gap-2">
                            {(Object.keys(functions) as Array<keyof typeof functions>).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setFuncType(key)}
                                    className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all ${
                                        funcType === key 
                                        ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                                        : 'bg-black/40 border-white/5 text-slate-400 hover:border-pink-500/50 hover:text-pink-200'
                                    }`}
                                >
                                    <M>{`f(x) = ${functions[key].label}`}</M>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Input Slider */}
                    <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">
                            <span>Test Input (x)</span>
                            <span className="bg-white/10 px-2 py-1 rounded font-mono text-sm border border-white/10">{activeX}</span>
                        </div>
                        <input 
                            type="range" min="-3" max="3" step="1" 
                            value={activeX} onChange={(e) => setActiveX(Number(e.target.value))} 
                            className="w-full accent-pink-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                        />
                    </div>
                </div>

                {/* Readout */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xl text-white bg-pink-900/40 border border-pink-500/30 p-4 rounded-xl shadow-inner">
                    <span className="font-mono text-pink-300">f({activeX})</span>
                    <ArrowRight className="text-slate-500" size={18} />
                    <span className="font-mono font-black">{activeY}</span>
                </div>
            </div>

            {/* RIGHT: SVG Mapping Visualizer */}
            <div className="w-full lg:w-3/5 p-8 flex flex-col items-center justify-center relative z-10">
                <div className="w-full max-w-[400px] relative">
                    
                    {/* Headers */}
                    <div className="flex justify-between w-full px-8 mb-4">
                        <div className="text-center">
                            <div className="text-sm font-bold text-white tracking-widest uppercase">Domain</div>
                            <div className="text-[10px] text-pink-400 font-mono">Inputs (x)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-white tracking-widest uppercase">Range</div>
                            <div className="text-[10px] text-pink-400 font-mono">Outputs f(x)</div>
                        </div>
                    </div>

                    <div className="relative w-full aspect-square bg-[#0c0a0f] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                            
                            {/* The Ovals */}
                            <ellipse cx={leftX} cy={height/2} rx="40" ry={height/2 - 20} fill="rgba(236,72,153,0.05)" stroke="rgba(236,72,153,0.3)" strokeWidth="2" />
                            <ellipse cx={rightX} cy={height/2} rx="40" ry={height/2 - 20} fill="rgba(236,72,153,0.05)" stroke="rgba(236,72,153,0.3)" strokeWidth="2" />

                            {/* Routing Lines */}
                            {domain.map((xVal, i) => {
                                const startY = getY(i, domain.length);
                                const outVal = currentFunc.calc(xVal);
                                const outIndex = range.indexOf(outVal);
                                const endY = getY(outIndex, range.length);
                                
                                const isActive = xVal === activeX;

                                return (
                                    <path 
                                        key={`line-${i}`}
                                        d={`M ${leftX + 20} ${startY} C ${leftX + 100} ${startY}, ${rightX - 100} ${endY}, ${rightX - 20} ${endY}`}
                                        fill="none"
                                        stroke={isActive ? "#ec4899" : "#3f3f46"}
                                        strokeWidth={isActive ? "3" : "1.5"}
                                        className="transition-all duration-300"
                                        opacity={isActive ? 1 : 0.4}
                                    />
                                );
                            })}

                            {/* Domain Points (Inputs) */}
                            {domain.map((xVal, i) => {
                                const y = getY(i, domain.length);
                                const isActive = xVal === activeX;
                                return (
                                    <g key={`domain-${i}`} className="transition-all duration-300">
                                        <circle cx={leftX} cy={y} r="14" fill={isActive ? "#ec4899" : "#18181b"} stroke={isActive ? "#fbcfe8" : "#3f3f46"} strokeWidth="2" />
                                        <text x={leftX} y={y} dy="4" textAnchor="middle" fill={isActive ? "#fff" : "#a1a1aa"} fontSize="12" fontFamily="monospace" fontWeight="bold">
                                            {xVal}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Range Points (Outputs) */}
                            {range.map((yVal, i) => {
                                const y = getY(i, range.length);
                                const isActive = activeY === yVal;
                                return (
                                    <g key={`range-${i}`} className="transition-all duration-300">
                                        <circle cx={rightX} cy={y} r="14" fill={isActive ? "#be185d" : "#18181b"} stroke={isActive ? "#fbcfe8" : "#3f3f46"} strokeWidth="2" />
                                        <text x={rightX} y={y} dy="4" textAnchor="middle" fill={isActive ? "#fff" : "#a1a1aa"} fontSize="12" fontFamily="monospace" fontWeight="bold">
                                            {yVal}
                                        </text>
                                    </g>
                                );
                            })}

                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
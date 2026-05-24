"use client";
import React, { useState } from 'react';
import { MoveHorizontal, CheckCircle2, XCircle } from 'lucide-react';

export default function InequalityExplorerLab() {
    const [boundary, setBoundary] = useState(2);
    const [op, setOp] = useState<'>' | '<' | '>=' | '<='>('>=');
    const [testVal, setTestVal] = useState(5);

    // Evaluate Truth
    let isValid = false;
    if (op === '>') isValid = testVal > boundary;
    if (op === '<') isValid = testVal < boundary;
    if (op === '>=') isValid = testVal >= boundary;
    if (op === '<=') isValid = testVal <= boundary;

    const isClosed = op === '>=' || op === '<=';
    const shadesRight = op === '>' || op === '>=';

    // SVG coordinate mapping
    const mapX = (val: number) => 50 + ((val + 10) / 20) * 300; // -10 to 10 mapped to 50px-350px

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-sky-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col md:flex-row relative">
            
            {/* LEFT: Controls */}
            <div className="w-full md:w-1/3 p-6 relative z-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-6">
                <div className="flex items-center gap-3 text-sky-400">
                    <MoveHorizontal size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Region Mapper</h3>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-4">
                    <h4 className="text-[10px] text-sky-400 font-bold uppercase tracking-widest text-center">The Statement</h4>
                    
                    <div className="flex items-center justify-center gap-3 text-3xl font-black font-mono text-white">
                        <span>x</span>
                        <select 
                            value={op} 
                            onChange={(e) => setOp(e.target.value as any)}
                            className="bg-sky-900/50 border border-sky-500/50 text-sky-300 rounded-lg outline-none cursor-pointer text-center px-1"
                        >
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value=">=">≥</option>
                            <option value="<=">≤</option>
                        </select>
                        <span className="text-sky-400">{boundary}</span>
                    </div>

                    <div className="pt-4">
                        <label className="text-[10px] text-slate-400 uppercase font-bold flex justify-between">
                            <span>Boundary Point</span>
                            <span className="text-white">{boundary}</span>
                        </label>
                        <input type="range" min="-9" max="9" step="1" value={boundary} onChange={(e) => setBoundary(Number(e.target.value))} className="w-full accent-sky-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer mt-2" />
                    </div>
                </div>

                <div className="bg-sky-950/20 p-4 rounded-xl border border-sky-500/20 mt-auto">
                    <label className="text-[10px] text-sky-400 uppercase font-bold flex justify-between">
                        <span>Drag Test Value (x)</span>
                        <span className="text-white bg-sky-500/20 px-2 rounded font-mono">{testVal}</span>
                    </label>
                    <input type="range" min="-10" max="10" step="1" value={testVal} onChange={(e) => setTestVal(Number(e.target.value))} className="w-full accent-emerald-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer mt-2" />
                </div>
            </div>

            {/* RIGHT: Visualizer */}
            <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center relative z-10 bg-black/20">
                
                {/* Result Indicator */}
                <div className={`mb-6 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2 border shadow-lg transition-all ${isValid ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-red-950/50 text-red-400 border-red-500/50'}`}>
                    {isValid ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {isValid ? 'True Statement' : 'False Statement'}
                </div>

                <div className="w-full relative max-w-[400px]">
                    <svg viewBox="0 0 400 120" className="w-full h-auto overflow-visible">
                        
                        {/* Shaded Region */}
                        {shadesRight ? (
                            <rect x={mapX(boundary)} y="40" width={400 - mapX(boundary)} height="40" fill="url(#blueGradient)" opacity="0.3" />
                        ) : (
                            <rect x="0" y="40" width={mapX(boundary)} height="40" fill="url(#blueGradient)" opacity="0.3" />
                        )}

                        {/* Base Number Line */}
                        <line x1="20" y1="60" x2="380" y2="60" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                        
                        {/* Ticks */}
                        {Array.from({length: 21}).map((_, i) => {
                            const val = i - 10;
                            const x = mapX(val);
                            return (
                                <g key={i}>
                                    <line x1={x} y1="55" x2={x} y2="65" stroke="#475569" strokeWidth="2" />
                                    {val % 5 === 0 && <text x={x} y="80" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">{val}</text>}
                                </g>
                            );
                        })}

                        {/* Inequality Arrow/Line */}
                        {shadesRight ? (
                            <line x1={mapX(boundary)} y1="60" x2="380" y2="60" stroke="#0ea5e9" strokeWidth="4" />
                        ) : (
                            <line x1="20" y1="60" x2={mapX(boundary)} y2="60" stroke="#0ea5e9" strokeWidth="4" />
                        )}

                        {/* Boundary Circle */}
                        <circle 
                            cx={mapX(boundary)} cy="60" r="6" 
                            fill={isClosed ? '#0ea5e9' : '#081326'} 
                            stroke="#0ea5e9" strokeWidth="3" 
                            className="transition-all duration-300"
                        />

                        {/* Test Value Point */}
                        <g className="transition-all duration-150" style={{ transform: `translateX(${mapX(testVal) - 200}px)`, transformOrigin: '200px 60px' }}>
                            <circle cx="200" cy="60" r="8" fill={isValid ? '#10b981' : '#ef4444'} className="shadow-lg" />
                            <text x="200" y="35" fill={isValid ? '#10b981' : '#ef4444'} fontSize="12" fontWeight="bold" textAnchor="middle">Test: {testVal}</text>
                            <line x1="200" y1="40" x2="200" y2="52" stroke={isValid ? '#10b981' : '#ef4444'} strokeWidth="2" />
                        </g>

                        {/* Gradient Def */}
                        <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={shadesRight ? '#0ea5e9' : 'transparent'} />
                                <stop offset="100%" stopColor={shadesRight ? 'transparent' : '#0ea5e9'} />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
}
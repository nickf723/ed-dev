"use client";
import React, { useState } from 'react';
import { Grid3X3, Plus, X, AlertTriangle, ShieldCheck } from 'lucide-react';

type Operation = 'add' | 'multiply';

export default function FiniteFieldLab() {
    const [modulus, setModulus] = useState<number>(5);
    const [operation, setOperation] = useState<Operation>('multiply');
    const [hoveredCell, setHoveredCell] = useState<{a: number, b: number, res: number} | null>(null);

    // Generate array from 0 to modulus-1 (or 1 to modulus-1 for mult)
    const elements = Array.from({ length: modulus }, (_, i) => i);
    
    // For multiplication fields, we usually ignore the 0 row/col when looking for closure/inverses of non-zero elements
    const displayElements = operation === 'multiply' ? elements.slice(1) : elements;

    const isPrime = [2, 3, 5, 7, 11].includes(modulus);

    // Calculate value based on operation
    const calc = (a: number, b: number) => {
        if (operation === 'add') return (a + b) % modulus;
        return (a * b) % modulus;
    };

    // Color mapping logic to show symmetry and identities
    const getCellColor = (val: number, isRowColHeader = false) => {
        if (isRowColHeader) return 'bg-purple-950/40 text-purple-300 font-black border-purple-500/30';
        
        // Identity element highlighting
        if (operation === 'add' && val === 0) return 'bg-zinc-800 text-zinc-500 border-zinc-700 font-bold';
        if (operation === 'multiply' && val === 1) return 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-black shadow-[0_0_10px_rgba(251,191,36,0.3)]';
        
        // Zero Divisors (Bad news in multiplication)
        if (operation === 'multiply' && val === 0) return 'bg-rose-500/20 border-rose-500/50 text-rose-400 font-black shadow-[0_0_10px_rgba(244,63,94,0.3)] animate-pulse';

        // Gradient for everything else
        const hue = (val * 137.5) % 360; // Golden angle dispersion
        return `bg-white/5 border-white/10 text-white`;
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none">
            <div className="bg-purple-950/30 border-b border-purple-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <Grid3X3 size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Cayley Table Engine</h3>
                        <p className="text-[10px] text-purple-300/60 font-mono uppercase tracking-widest">Finite Field Modulo N</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row border-b border-white/5">
                
                {/* LEFT: Controls */}
                <div className="w-full md:w-1/3 p-6 bg-black/40 border-r border-white/5 flex flex-col gap-6">
                    <div>
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Operation</label>
                        <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
                            <button onClick={() => setOperation('add')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex justify-center gap-2 ${operation === 'add' ? 'bg-purple-500/20 text-purple-400' : 'text-zinc-500'}`}>
                                <Plus size={14} /> Addition
                            </button>
                            <button onClick={() => setOperation('multiply')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex justify-center gap-2 ${operation === 'multiply' ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-500'}`}>
                                <X size={14} /> Multiply
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Modulus (N)</label>
                        <div className="flex flex-wrap gap-2">
                            {[3, 4, 5, 6, 7].map(n => (
                                <button 
                                    key={n} onClick={() => setModulus(n)}
                                    className={`w-10 h-10 rounded-lg font-mono font-bold border transition-all
                                        ${modulus === n ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}
                                    `}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isPrime ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-rose-950/30 border-rose-500/30'}`}>
                        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isPrime ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isPrime ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
                            {isPrime ? 'Valid Field GF(p)' : 'Ring (Not a Field)'}
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed">
                            {isPrime 
                                ? `Because ${modulus} is prime, every non-zero element has a multiplicative inverse (a '1' in its row). Division is safe.`
                                : `Because ${modulus} is composite, "Zero Divisors" appear. Multiplying two non-zero numbers can result in 0. Division is impossible.`
                            }
                        </p>
                    </div>
                </div>

                {/* RIGHT: Visual Matrix */}
                <div className="w-full md:w-2/3 p-6 md:p-8 flex items-center justify-center bg-[#0d0714] min-h-[350px]">
                    <div className="flex flex-col">
                        
                        {/* Column Headers */}
                        <div className="flex mb-1">
                            <div className="w-10 h-10 mr-1 flex items-center justify-center text-zinc-600 font-bold opacity-50">
                                {operation === 'add' ? '+' : '×'}
                            </div>
                            {displayElements.map(b => (
                                <div key={`col-${b}`} className={`w-10 h-10 m-0.5 border rounded flex items-center justify-center ${getCellColor(b, true)}`}>
                                    {b}
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        {displayElements.map(a => (
                            <div key={`row-${a}`} className="flex">
                                {/* Row Header */}
                                <div className={`w-10 h-10 m-0.5 mr-1 border rounded flex items-center justify-center ${getCellColor(a, true)}`}>
                                    {a}
                                </div>
                                {/* Data Cells */}
                                {displayElements.map(b => {
                                    const res = calc(a, b);
                                    const isHovered = hoveredCell?.a === a && hoveredCell?.b === b;
                                    return (
                                        <div 
                                            key={`cell-${a}-${b}`}
                                            onMouseEnter={() => setHoveredCell({a, b, res})}
                                            onMouseLeave={() => setHoveredCell(null)}
                                            className={`w-10 h-10 m-0.5 border rounded flex items-center justify-center text-sm transition-all duration-75 cursor-default
                                                ${getCellColor(res, false)}
                                                ${isHovered ? 'scale-110 z-10 border-white ring-2 ring-white/50' : 'opacity-90 hover:opacity-100'}
                                            `}
                                        >
                                            {res}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Formula Display */}
            <div className="bg-black/80 p-4 h-16 flex items-center justify-center text-sm font-mono text-zinc-400">
                {hoveredCell ? (
                    <div className="flex items-center gap-3">
                        <span className="text-white">{hoveredCell.a}</span>
                        <span className="text-purple-400">{operation === 'add' ? '+' : '×'}</span>
                        <span className="text-white">{hoveredCell.b}</span>
                        <span className="text-zinc-600">≡</span>
                        <span className="text-amber-400 font-bold text-lg">{hoveredCell.res}</span>
                        <span className="text-zinc-600 ml-2">(mod {modulus})</span>
                    </div>
                ) : (
                    <span className="opacity-50">Hover over the matrix to view calculations.</span>
                )}
            </div>
        </div>
    );
}
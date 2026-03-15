"use client";
import React, { useState, useEffect } from 'react';
import { Brackets, Calculator, XOctagon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// The Extended Euclidean Algorithm
// Returns { gcd: number, x: number, y: number } such that a*x + b*y = gcd
function extendedGCD(a: number, b: number): { gcd: number, x: number, y: number } {
    if (a === 0) return { gcd: b, x: 0, y: 1 };
    const { gcd, x: x1, y: y1 } = extendedGCD(b % a, a);
    return {
        gcd,
        x: y1 - Math.floor(b / a) * x1,
        y: x1
    };
}

export default function DiophantineLab() {
    const [a, setA] = useState<number>(3);
    const [b, setB] = useState<number>(6);
    const [c, setC] = useState<number>(12);

    const [result, setResult] = useState<{
        hasSolution: boolean;
        gcd: number;
        baseX: number | null;
        baseY: number | null;
    }>({ hasSolution: false, gcd: 1, baseX: null, baseY: null });

    useEffect(() => {
        // We only evaluate positive integers for 'a' and 'b' to keep the UI intuitive
        const safeA = Math.max(1, Math.abs(a));
        const safeB = Math.max(1, Math.abs(b));
        
        const { gcd, x, y } = extendedGCD(safeA, safeB);
        
        // A Linear Diophantine Equation ax + by = c has a solution 
        // IF AND ONLY IF 'c' is a multiple of the GCD of 'a' and 'b'.
        const hasSolution = c % gcd === 0;

        if (hasSolution) {
            const multiplier = c / gcd;
            setResult({
                hasSolution: true,
                gcd,
                baseX: x * multiplier,
                baseY: y * multiplier
            });
        } else {
            setResult({ hasSolution: false, gcd, baseX: null, baseY: null });
        }
    }, [a, b, c]);

    return (
        <div className="w-full bg-black/40 backdrop-blur-xl border border-rose-500/20 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-rose-950/30 border-b border-rose-500/20 p-5 flex items-center gap-3">
                <div className="p-2 bg-rose-500/20 border border-rose-500/30 rounded-lg">
                    <Brackets size={18} className="text-rose-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold tracking-wide">Linear Diophantine Solver</h3>
                    <p className="text-[10px] text-rose-300/60 font-mono uppercase tracking-widest">$ax + by = c$</p>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                
                {/* Visual Equation Readout */}
                <div className="text-center pb-6 border-b border-white/5">
                    <div className="text-3xl md:text-5xl font-serif text-white tracking-widest flex items-center justify-center gap-2">
                        <span className="text-rose-400">{a}</span><span className="text-zinc-500 text-2xl italic">x</span>
                        <span className="text-zinc-500 text-2xl">+</span>
                        <span className="text-sky-400">{b}</span><span className="text-zinc-500 text-2xl italic">y</span>
                        <span className="text-zinc-500 text-2xl">=</span>
                        <span className="text-amber-400">{c}</span>
                    </div>
                </div>

                {/* Input Sliders */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                            <span>Coefficient $a$</span>
                            <span className="text-rose-400">{a}</span>
                        </div>
                        <input 
                            type="range" min="1" max="50" value={a} onChange={(e) => setA(parseInt(e.target.value))}
                            className="w-full accent-rose-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                            <span>Coefficient $b$</span>
                            <span className="text-sky-400">{b}</span>
                        </div>
                        <input 
                            type="range" min="1" max="50" value={b} onChange={(e) => setB(parseInt(e.target.value))}
                            className="w-full accent-sky-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                            <span>Target $c$</span>
                            <span className="text-amber-400">{c}</span>
                        </div>
                        <input 
                            type="range" min="-100" max="100" value={c} onChange={(e) => setC(parseInt(e.target.value))}
                            className="w-full accent-amber-500"
                        />
                    </div>
                </div>

                {/* Diagnostic Output */}
                <div className="bg-zinc-950/80 border border-white/5 rounded-xl p-6 min-h-[160px] relative overflow-hidden">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Calculator size={12} /> System Diagnostic
                    </div>

                    <div className="text-sm text-zinc-300 font-mono mb-4">
                        $\gcd({a}, {b}) = {result.gcd}$
                    </div>

                    {result.hasSolution ? (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                            <div className="flex items-start gap-2 text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block mb-1">Solution Exists</strong>
                                    Because {c} is divisible by {result.gcd}, integer coordinates exist for this equation.
                                </div>
                            </div>
                            <div className="text-lg font-serif text-white pt-2">
                                $x = {result.baseX}$ <span className="text-zinc-600 mx-2">|</span> $y = {result.baseY}$
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                            <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
                                <XOctagon size={16} className="shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block mb-1">No Integer Solution</strong>
                                    Because {c} is NOT a multiple of {result.gcd}, this line slips entirely through the integer grid without hitting a single perfect coordinate.
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
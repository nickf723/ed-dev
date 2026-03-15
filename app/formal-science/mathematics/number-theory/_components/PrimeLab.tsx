"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Beaker, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PrimeLab() {
    const [inputValue, setInputValue] = useState<string>('2026');

    // Mathematical Engine: Calculate Prime Factors
    const calculateFactors = (num: number) => {
        if (num <= 1) return [];
        const factors = [];
        let divisor = 2;
        let n = num;
        
        while (n >= 2 && divisor * divisor <= n) {
            if (n % divisor === 0) {
                factors.push(divisor);
                n = n / divisor;
            } else {
                divisor++;
            }
        }
        if (n > 1) factors.push(n);
        return factors;
    };

    const num = parseInt(inputValue);
    const isValid = !isNaN(num) && num > 1 && num <= 999999;
    const factors = useMemo(() => isValid ? calculateFactors(num) : [], [num, isValid]);
    const isPrime = factors.length === 1 && factors[0] === num;

    // Group factors by exponents for mathematical display
    const factorCounts = factors.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="bg-black/40 border-b border-white/10 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/20 border border-violet-500/30 rounded-lg">
                        <Beaker size={18} className="text-violet-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Atomic Factorization</h3>
                        <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Fundamental Theorem Lab</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                {/* Input Terminal */}
                <div>
                    <label className="block text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">
                        Target Integer (Max: 999,999)
                    </label>
                    <div className="relative">
                        <input 
                            type="number" 
                            min="2" max="999999"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-3xl font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            placeholder="Enter a number..."
                        />
                        {isPrime && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                                <ShieldCheck size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Absolute Prime</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Display */}
                <div className="bg-black/30 border border-white/5 rounded-xl p-6 min-h-[150px] relative overflow-hidden">
                    {!isValid ? (
                        <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-sm">
                            Awaiting valid integer input ($x {'>'} 1$)...
                        </div>
                    ) : (
                        <div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                                Prime Decomposition
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3">
                                <AnimatePresence mode="popLayout">
                                    {Object.entries(factorCounts).map(([base, exp], index, arr) => (
                                        <React.Fragment key={base}>
                                            <motion.div 
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className={`flex items-center justify-center min-w-[3rem] h-12 rounded-lg border font-mono text-xl shadow-lg
                                                    ${isPrime ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-violet-500/20 border-violet-500/50 text-violet-300'}
                                                `}
                                            >
                                                {base}
                                                {exp > 1 && <sup className="text-xs ml-0.5">{exp}</sup>}
                                            </motion.div>
                                            
                                            {index < arr.length - 1 && (
                                                <div className="text-zinc-500 font-black text-xl px-1">×</div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </AnimatePresence>
                            </div>
                            
                            {/* Standard Notation String */}
                            <div className="mt-8 text-sm text-zinc-400 font-serif italic border-t border-white/5 pt-4 flex items-center gap-2">
                                <Fingerprint size={14} className={isPrime ? "text-emerald-500" : "text-violet-500"} />
                                <span>Unique mathematical fingerprint derived successfully.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
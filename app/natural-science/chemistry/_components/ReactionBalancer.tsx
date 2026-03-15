"use client";
import React, { useState } from 'react';
import { Beaker, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ReactionBalancer() {
    // Coefficients for: aCH4 + bO2 -> cCO2 + dH2O
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);
    const [c, setC] = useState(1);
    const [d, setD] = useState(1);

    // Calculate atoms on the Reactant (Left) side
    const reactants = {
        C: a * 1,
        H: a * 4,
        O: b * 2
    };

    // Calculate atoms on the Product (Right) side
    const products = {
        C: c * 1,
        H: d * 2,
        O: (c * 2) + (d * 1)
    };

    // Check if the equation is perfectly balanced
    const isBalanced = 
        reactants.C === products.C && 
        reactants.H === products.H && 
        reactants.O === products.O;

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
        setter(prev => Math.min(Math.max(1, prev + val), 9));
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-zinc-900 border-b border-zinc-800 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <Beaker size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Conservation of Mass</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Combustion of Methane</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border ${isBalanced ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                    {isBalanced ? 'Balanced' : 'Unbalanced'}
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                
                {/* The Equation UI */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-2xl md:text-4xl font-black text-white">
                    {/* CH4 */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => increment(setA, 1)} className="text-zinc-500 hover:text-emerald-400 text-sm">▲</button>
                            <span className={a > 1 ? 'text-emerald-400' : 'text-zinc-600'}>{a}</span>
                            <button onClick={() => increment(setA, -1)} className="text-zinc-500 hover:text-red-400 text-sm">▼</button>
                        </div>
                        <span>CH<sub className="text-lg text-zinc-400">4</sub></span>
                    </div>

                    <span className="text-zinc-600">+</span>

                    {/* O2 */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => increment(setB, 1)} className="text-zinc-500 hover:text-emerald-400 text-sm">▲</button>
                            <span className={b > 1 ? 'text-emerald-400' : 'text-zinc-600'}>{b}</span>
                            <button onClick={() => increment(setB, -1)} className="text-zinc-500 hover:text-red-400 text-sm">▼</button>
                        </div>
                        <span>O<sub className="text-lg text-zinc-400">2</sub></span>
                    </div>

                    <span className="text-zinc-600 mx-4">→</span>

                    {/* CO2 */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => increment(setC, 1)} className="text-zinc-500 hover:text-emerald-400 text-sm">▲</button>
                            <span className={c > 1 ? 'text-emerald-400' : 'text-zinc-600'}>{c}</span>
                            <button onClick={() => increment(setC, -1)} className="text-zinc-500 hover:text-red-400 text-sm">▼</button>
                        </div>
                        <span>CO<sub className="text-lg text-zinc-400">2</sub></span>
                    </div>

                    <span className="text-zinc-600">+</span>

                    {/* H2O */}
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => increment(setD, 1)} className="text-zinc-500 hover:text-emerald-400 text-sm">▲</button>
                            <span className={d > 1 ? 'text-emerald-400' : 'text-zinc-600'}>{d}</span>
                            <button onClick={() => increment(setD, -1)} className="text-zinc-500 hover:text-red-400 text-sm">▼</button>
                        </div>
                        <span>H<sub className="text-lg text-zinc-400">2</sub>O</span>
                    </div>
                </div>

                {/* The Atom Counter Diagnostic */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Reactants */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-800 pb-2">Reactants</h4>
                        <div className="space-y-2 font-mono text-sm">
                            <div className={`flex justify-between ${reactants.C === products.C ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Carbon (C):</span> <span>{reactants.C}</span></div>
                            <div className={`flex justify-between ${reactants.H === products.H ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Hydrogen (H):</span> <span>{reactants.H}</span></div>
                            <div className={`flex justify-between ${reactants.O === products.O ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Oxygen (O):</span> <span>{reactants.O}</span></div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-800 pb-2">Products</h4>
                        <div className="space-y-2 font-mono text-sm">
                            <div className={`flex justify-between ${reactants.C === products.C ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Carbon (C):</span> <span>{products.C}</span></div>
                            <div className={`flex justify-between ${reactants.H === products.H ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Hydrogen (H):</span> <span>{products.H}</span></div>
                            <div className={`flex justify-between ${reactants.O === products.O ? 'text-emerald-400' : 'text-zinc-300'}`}><span>Oxygen (O):</span> <span>{products.O}</span></div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Status Message */}
                <div className="pt-4 border-t border-zinc-800">
                    {isBalanced ? (
                        <div className="flex items-start gap-2 text-emerald-400 text-sm bg-emerald-500/10 p-4 rounded border border-emerald-500/20">
                            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                            <p><strong>Perfect Balance.</strong> Matter cannot be created or destroyed. You have exactly 1 Carbon, 4 Hydrogens, and 4 Oxygens on both sides of the equation.</p>
                        </div>
                    ) : (
                        <div className="flex items-start gap-2 text-zinc-400 text-sm bg-zinc-900 p-4 rounded border border-zinc-800">
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <p>Adjust the coefficients (the numbers in front of the molecules) until the atoms on both sides are exactly equal.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
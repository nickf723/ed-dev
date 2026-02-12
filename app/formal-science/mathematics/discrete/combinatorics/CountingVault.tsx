"use client";
import React, { useState } from 'react';
import { Lock, Unlock, Hash, RotateCw } from 'lucide-react';

export default function CountingVault() {
  const [n, setN] = useState(5); // Total items
  const [k, setK] = useState(3); // Chosen items
  const [mode, setMode] = useState<'perm' | 'comb'>('perm');

  // Math Helper (Simple Factorial)
  const factorial = (num: number): number => {
      if (num <= 1) return 1;
      let res = 1;
      for(let i=2; i<=num; i++) res *= i;
      return res;
  };

  // Calculations
  const P = factorial(n) / factorial(n - k);
  const C = factorial(n) / (factorial(k) * factorial(n - k));
  const result = mode === 'perm' ? P : C;

  // Format Large Numbers
  const displayResult = result > 1_000_000 ? result.toExponential(2) : result.toLocaleString();

  return (
    <div className="w-full bg-stone-900 border border-amber-600/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-12">
        
        {/* CONTROLS */}
        <div className="w-full md:w-80 space-y-8">
            <div className="pb-4 border-b border-amber-900/50">
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Security Mainframe</div>
                <h3 className="text-3xl font-black text-white">The Vault</h3>
            </div>

            {/* Mode Switch */}
            <div className="flex bg-stone-950 p-1 rounded-lg border border-stone-800">
                <button 
                    onClick={() => setMode('perm')}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded transition-all ${mode === 'perm' ? 'bg-amber-600 text-black shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                >
                    Permutation (Order)
                </button>
                <button 
                    onClick={() => setMode('comb')}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded transition-all ${mode === 'comb' ? 'bg-amber-600 text-black shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
                >
                    Combination (Group)
                </button>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-xs font-bold text-stone-400 uppercase mb-2">
                        Total Items (n) <span className="text-white">{n}</span>
                    </div>
                    <input 
                        type="range" min="3" max="15" value={n}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setN(val);
                            if(k > val) setK(val);
                        }}
                        className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold text-stone-400 uppercase mb-2">
                        Slots to Fill (k) <span className="text-white">{k}</span>
                    </div>
                    <input 
                        type="range" min="1" max={n} value={k}
                        onChange={(e) => setK(Number(e.target.value))}
                        className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                </div>
            </div>
            
            <div className="text-xs text-stone-500 italic">
                {mode === 'perm' 
                    ? "Example: A password. '1-2-3' is distinct from '3-2-1'."
                    : "Example: A fruit salad. 'Apple-Banana' is the same as 'Banana-Apple'."}
            </div>
        </div>

        {/* VISUALIZER (THE VAULT DOOR) */}
        <div className="flex-1 bg-stone-950 rounded-xl border border-stone-800 relative flex flex-col items-center justify-center p-8 overflow-hidden">
             {/* Background Mesh */}
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

             {/* Formula Display */}
             <div className="mb-8 font-mono text-amber-500/50 text-sm">
                 {mode === 'perm' ? `P(${n}, ${k}) = ${n}! / (${n}-${k})!` : `C(${n}, ${k}) = ${n}! / [${k}!(${n}-${k})!]`}
             </div>

             {/* The Big Number */}
             <div className="text-center relative z-10">
                 <div className="text-xs font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">POSSIBLE OUTCOMES</div>
                 <div className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_25px_rgba(217,119,6,0.5)]">
                     {displayResult}
                 </div>
             </div>

             {/* Lock Status Visual */}
             <div className="mt-8 flex gap-4 text-stone-600">
                 {mode === 'perm' ? <Lock size={32} className="text-amber-500" /> : <Unlock size={32} className="text-amber-500" />}
             </div>
             
             {/* Spinning Rings Animation (CSS) */}
             <div className="absolute inset-0 pointer-events-none opacity-10">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-amber-500 rounded-full border-dashed animate-spin-slow" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-amber-500 rounded-full border-dotted animate-reverse-spin" />
             </div>
        </div>
    </div>
  );
}
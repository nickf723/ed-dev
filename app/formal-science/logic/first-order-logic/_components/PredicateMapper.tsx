"use client";
import React, { useState } from 'react';
import { Database, Filter, Target, CheckCircle2, XCircle } from 'lucide-react';

const DOMAIN = [1, 2, 3, 4, 5, 6, 7, 8];

const PREDICATES = [
  { id: 'even', label: 'x is Even', fn: (x: number) => x % 2 === 0 },
  { id: 'greater4', label: 'x > 4', fn: (x: number) => x > 4 },
  { id: 'prime', label: 'x is Prime', fn: (x: number) => [2, 3, 5, 7].includes(x) },
  // This predicate guarantees a TRUE result for the Universal Quantifier!
  { id: 'greater0', label: 'x > 0', fn: (x: number) => x > 0 }, 
];

type Quantifier = 'ALL' | 'EXISTS';

export default function PredicateMapper() {
  const [quantifier, setQuantifier] = useState<Quantifier>('ALL');
  const [predIndex, setPredIndex] = useState(0);

  const activePredicate = PREDICATES[predIndex];
  
  // Evaluate the domain
  const evaluations = DOMAIN.map(x => ({
      val: x,
      isTrue: activePredicate.fn(x)
  }));

  // Calculate final result
  const isAllTrue = evaluations.every(e => e.isTrue);
  const isAnyTrue = evaluations.some(e => e.isTrue);
  const finalResult = quantifier === 'ALL' ? isAllTrue : isAnyTrue;

  return (
    <div className="w-full bg-[#050505] border border-blue-500/20 rounded-3xl overflow-hidden font-sans flex flex-col">
        
        {/* HEADER CONTROLS */}
        <div className="p-6 border-b border-blue-500/20 bg-[#0a0a0a] flex flex-col md:flex-row gap-6 justify-between items-center">
            
            {/* Quantifier Selection */}
            <div className="flex bg-black p-1 rounded-xl border border-white/10 w-full md:w-auto">
                <button 
                    onClick={() => setQuantifier('ALL')}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${quantifier === 'ALL' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-neutral-500 hover:text-white border border-transparent'}`}
                >
                    <span className="font-serif text-lg leading-none">∀</span> For All
                </button>
                <button 
                    onClick={() => setQuantifier('EXISTS')}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${quantifier === 'EXISTS' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-neutral-500 hover:text-white border border-transparent'}`}
                >
                    <span className="font-serif text-lg leading-none pt-1">∃</span> Exists
                </button>
            </div>

            {/* Predicate Selection */}
            <div className="flex items-center gap-3 w-full md:w-auto bg-black border border-white/10 rounded-xl px-4 py-2">
                <Filter size={16} className="text-blue-500" />
                <div className="font-serif italic text-white">P(x) :</div>
                <select 
                    value={predIndex}
                    onChange={(e) => setPredIndex(Number(e.target.value))}
                    className="bg-transparent text-sm font-bold text-blue-400 outline-none cursor-pointer"
                >
                    {PREDICATES.map((p, i) => (
                        <option key={p.id} value={i} className="bg-neutral-900 text-white">{p.label}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* VISUALIZATION STAGE */}
        <div className="p-8 bg-[#030106] flex-1">
            <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                <Database size={14} /> Domain Evaluation Mapping
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {evaluations.map((item) => (
                    <div key={item.val} className={`relative p-4 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center gap-2 ${item.isTrue ? 'bg-blue-950/30 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/10 opacity-50 grayscale'}`}>
                        {/* Input Value */}
                        <div className="text-xs text-neutral-400 font-mono">x = {item.val}</div>
                        
                        {/* Mapping Line */}
                        <div className={`w-px h-4 ${item.isTrue ? 'bg-blue-500' : 'bg-neutral-700'}`} />
                        
                        {/* Result Output */}
                        <div className={`font-black tracking-widest text-sm ${item.isTrue ? 'text-blue-400' : 'text-neutral-600'}`}>
                            {item.isTrue ? 'TRUE' : 'FALSE'}
                        </div>

                        {/* Falsification Indicator for 'ALL' */}
                        {quantifier === 'ALL' && !item.isTrue && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg border border-red-400 animate-pulse z-10">
                                FAILS
                            </div>
                        )}
                        {/* Success Indicator for 'EXISTS' */}
                        {quantifier === 'EXISTS' && item.isTrue && (
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg border border-emerald-400 animate-pulse z-10">
                                MATCH
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* FINAL EVALUATION PANEL */}
            <div className={`p-6 rounded-2xl border flex items-start gap-4 transition-all duration-500 ${finalResult ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-red-950/20 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'}`}>
                {finalResult ? <CheckCircle2 className="text-emerald-400 shrink-0 w-8 h-8" /> : <XCircle className="text-red-400 shrink-0 w-8 h-8" />}
                <div>
                    <h4 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                        <Target size={16} className={finalResult ? 'text-emerald-500' : 'text-red-500'}/> Final Verification
                    </h4>
                    <div className="font-mono text-xs mb-3 text-neutral-300">
                        Statement: <span className={finalResult ? 'text-emerald-300' : 'text-red-300'}>
                            {quantifier === 'ALL' ? '∀' : '∃'}x P(x)
                        </span>
                    </div>
                    <p className={`text-sm font-light leading-relaxed ${finalResult ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                        {quantifier === 'ALL' 
                            ? finalResult 
                                ? "TRUE. The statement holds because P(x) evaluated to TRUE for every single item in the domain without exception." 
                                : "FALSE. The Universal Quantifier demands perfection. We found at least one counter-example where P(x) evaluated to FALSE."
                            : finalResult 
                                ? "TRUE. The Existential Quantifier only needs one success. We found at least one item in the domain where P(x) evaluated to TRUE."
                                : "FALSE. We checked every single item in the domain, and not a single one satisfied the predicate P(x)."
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
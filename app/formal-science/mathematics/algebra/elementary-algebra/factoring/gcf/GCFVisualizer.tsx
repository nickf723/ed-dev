"use client";
import React, { useState, useEffect } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { ArrowDown, Check, Split } from 'lucide-react';

// Data Structure
const EXAMPLES = [
  {
    id: 1,
    poly: "6x^2 + 12x",
    term1: { raw: "6x^2", factors: ["2", "3", "x", "x"] },
    term2: { raw: "12x", factors: ["2", "2", "3", "x"] },
    gcfDisplay: "6x",
    result: "6x(x + 2)"
  },
  {
    id: 2,
    poly: "8x^3 - 4x^2",
    term1: { raw: "8x^3", factors: ["2", "2", "2", "x", "x", "x"] },
    term2: { raw: "-4x^2", factors: ["-1", "2", "2", "x", "x"] },
    gcfDisplay: "4x^2",
    result: "4x^2(2x - 1)"
  },
  {
    id: 3,
    poly: "x^3 + x^2 + x",
    term1: { raw: "x^3", factors: ["x", "x", "x"] },
    term2: { raw: "x^2", factors: ["x", "x"] },
    term3: { raw: "x", factors: ["x"] }, // Optional 3rd term logic
    gcfDisplay: "x",
    result: "x(x^2 + x + 1)"
  }
];

export default function GCFVisualizer() {
  const [activeEx, setActiveEx] = useState(0);
  const data = EXAMPLES[activeEx];
  
  // State for calculated match indices (booleans)
  const [matches1, setMatches1] = useState<boolean[]>([]);
  const [matches2, setMatches2] = useState<boolean[]>([]);

  // 1-to-1 Matching Logic
  useEffect(() => {
    const t1 = [...data.term1.factors];
    const t2 = [...data.term2.factors];
    
    // Track which indices in Term 2 have already been matched to avoid double counting
    const t2MatchedIndices = new Set<number>();
    const t1Results = new Array(t1.length).fill(false);
    const t2Results = new Array(t2.length).fill(false);

    t1.forEach((factor1, i) => {
        // Find first UNUSED occurrence of this factor in Term 2
        const matchIndex = t2.findIndex((factor2, j) => factor2 === factor1 && !t2MatchedIndices.has(j));
        
        if (matchIndex !== -1) {
            // We found a pair!
            t1Results[i] = true;
            t2Results[matchIndex] = true;
            t2MatchedIndices.add(matchIndex);
        }
    });

    setMatches1(t1Results);
    setMatches2(t2Results);
  }, [activeEx]);

  return (
    <div className="relative z-10 w-full bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[500px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col z-20">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Split size={14} /> Decomposition Lab
          </div>
          <div className="space-y-2 mb-8">
              {EXAMPLES.map((ex, i) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveEx(i)}
                    className={`w-full p-3 rounded text-left font-mono text-sm transition-all border-l-4 ${activeEx === i ? 'bg-white border-green-500 text-slate-900 shadow-sm' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-white'}`}
                  >
                      {ex.poly}
                  </button>
              ))}
          </div>
          
          <div className="mt-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Algorithm</div>
              <div className="p-4 bg-green-50 border border-green-200 rounded text-xs text-green-800 leading-relaxed font-mono">
                  1. EXPAND terms<br/>
                  2. MATCH pairs<br/>
                  3. EXTRACT GCF
              </div>
          </div>
      </div>

      {/* MAIN STAGE */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[#f8fafc]">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none" />

          {/* PHASE 1: ORIGINAL TERMS */}
          <div className="flex gap-16 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="text-center group cursor-help">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">Term 1</div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:border-green-400 transition-colors">
                      <div className="text-3xl font-black text-slate-800"><MathRenderer expression={data.term1.raw} /></div>
                  </div>
              </div>
              <div className="text-center group cursor-help">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">Term 2</div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:border-green-400 transition-colors">
                      <div className="text-3xl font-black text-slate-800"><MathRenderer expression={data.term2.raw} /></div>
                  </div>
              </div>
          </div>

          <div className="mb-8 text-slate-300">
              <ArrowDown size={32} />
          </div>

          {/* PHASE 2: ATOMIC BREAKDOWN */}
          <div className="flex gap-12 mb-12">
              {/* Term 1 Factors */}
              <div className="flex gap-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-inner">
                  {data.term1.factors.map((f, i) => (
                      <FactorNode key={i} val={f} isMatch={matches1[i]} />
                  ))}
              </div>

              {/* Term 2 Factors */}
              <div className="flex gap-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-inner">
                  {data.term2.factors.map((f, i) => (
                      <FactorNode key={i} val={f} isMatch={matches2[i]} />
                  ))}
              </div>
          </div>

          <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Check size={14} /> Shared Factors Extracted
          </div>

          {/* PHASE 3: RESULT */}
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative px-8 py-4 bg-white border border-slate-200 rounded-xl shadow-xl flex items-center gap-4">
                  <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">GCF</div>
                      <div className="text-xl font-black text-green-600"><MathRenderer expression={data.gcfDisplay} /></div>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-3xl font-black text-slate-900">
                      <MathRenderer expression={data.result} />
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}

// Sub-component for individual factor bubbles
function FactorNode({ val, isMatch }: { val: string, isMatch: boolean }) {
    return (
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono font-bold text-lg transition-all duration-500 ${isMatch ? 'bg-green-500 text-white shadow-lg scale-110 -translate-y-1' : 'bg-slate-100 text-slate-300 scale-90'}`}>
            {val}
        </div>
    )
}
"use client";
import React, { useState } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { ArrowDown, Check, X, Split } from 'lucide-react';

const EXAMPLES = [
  {
    id: 1,
    poly: "x^2 - 9",
    a: "x", b: "3",
    proof: "(x)(x) + (3)(x) - (3)(x) - (3)(3)",
    cancel: "3x - 3x = 0",
    result: "(x - 3)(x + 3)"
  },
  {
    id: 2,
    poly: "4x^2 - 25",
    a: "2x", b: "5",
    proof: "(2x)(2x) + (5)(2x) - (5)(2x) - (5)(5)",
    cancel: "10x - 10x = 0",
    result: "(2x - 5)(2x + 5)"
  },
  {
    id: 3,
    poly: "a^2 - b^2",
    a: "a", b: "b",
    proof: "a^2 + ab - ab - b^2",
    cancel: "ab - ab = 0",
    result: "(a - b)(a + b)"
  }
];

export default function DOPSVisualizer() {
  const [activeEx, setActiveEx] = useState(0);
  const data = EXAMPLES[activeEx];

  return (
    <div className="relative z-10 w-full bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[500px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col z-20">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Split size={14} /> Square Root Lab
          </div>
          <div className="space-y-2 mb-8">
              {EXAMPLES.map((ex, i) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveEx(i)}
                    className={`w-full p-3 rounded text-left font-mono text-sm transition-all border-l-4 ${activeEx === i ? 'bg-white border-rose-500 text-slate-900 shadow-sm' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-white'}`}
                  >
                      {ex.poly}
                  </button>
              ))}
          </div>
          
          <div className="mt-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Algorithm</div>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 leading-relaxed font-mono">
                  1. SQRT first term<br/>
                  2. SQRT last term<br/>
                  3. PLUS & MINUS
              </div>
          </div>
      </div>

      {/* MAIN STAGE */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[#fdf2f8]">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

          {/* PHASE 1: THE PROBLEM */}
          <div className="mb-12 scale-150 text-slate-800 font-black">
              <MathRenderer expression={data.poly} />
          </div>

          <div className="flex gap-16 mb-8 text-slate-400">
              <ArrowDown size={32} />
              <ArrowDown size={32} />
          </div>

          {/* PHASE 2: THE ROOTS */}
          <div className="flex gap-12 mb-12">
              <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Root A</div>
                  <div className="w-20 h-20 bg-white border-2 border-indigo-400 rounded-xl flex items-center justify-center text-xl font-bold text-indigo-600 shadow-sm">
                      <MathRenderer expression={data.a} />
                  </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Root B</div>
                  <div className="w-20 h-20 bg-white border-2 border-rose-400 rounded-xl flex items-center justify-center text-xl font-bold text-rose-600 shadow-sm">
                      <MathRenderer expression={data.b} />
                  </div>
              </div>
          </div>

          {/* PHASE 3: THE PROOF */}
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">Expansion Check</div>
              <div className="text-center font-mono text-sm text-slate-600 mb-2">
                  <MathRenderer expression={data.proof} />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-500 bg-rose-50 py-1 rounded">
                  <X size={12} /> Middle terms cancel: {data.cancel}
              </div>
          </div>

          {/* PHASE 4: RESULT */}
          <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-rose-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative px-8 py-4 bg-white border border-slate-200 rounded-xl shadow-xl">
                  <div className="text-3xl font-black text-slate-900">
                      <MathRenderer expression={data.result} />
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}
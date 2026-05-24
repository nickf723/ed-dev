"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function DiamondSolver() {
  const [b, setB] = useState(5);
  const [c, setC] = useState(6);
  const [factor1, setFactor1] = useState<number | null>(null);
  const [factor2, setFactor2] = useState<number | null>(null);

  useEffect(() => {
    let found = false;
    // Brute force search for factors
    for(let i = -20; i <= 20; i++) {
        for(let j = -20; j <= 20; j++) {
            if (i * j === c && i + j === b) {
                setFactor1(i);
                setFactor2(j);
                found = true;
                break;
            }
        }
        if(found) break;
    }
    if(!found) {
        setFactor1(null);
        setFactor2(null);
    }
  }, [b, c]);

  return (
    <div className="relative z-10 w-full bg-slate-950/80 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col md:flex-row min-h-[400px]">
      
      {/* INPUTS */}
      <div className="w-full md:w-64 bg-indigo-950/20 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-center gap-6 relative z-20">
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest text-center">Set Parameters</div>
          
          <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                  <span>Sum (b)</span>
                  <span className="text-white bg-indigo-500/20 px-2 rounded">{b}</span>
              </label>
              <input 
                type="range" min="-20" max="20" step="1" 
                value={b} onChange={(e) => setB(parseInt(e.target.value) || 0)}
                className="w-full accent-indigo-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer mt-2"
              />
          </div>

          <div className="space-y-1 mt-4">
              <label className="block text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                  <span>Product (c)</span>
                  <span className="text-white bg-violet-500/20 px-2 rounded">{c}</span>
              </label>
              <input 
                type="range" min="-20" max="20" step="1" 
                value={c} onChange={(e) => setC(parseInt(e.target.value) || 0)}
                className="w-full accent-violet-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer mt-2"
              />
          </div>

          <div className="text-center text-xs text-slate-400 mt-6 bg-black/40 p-3 rounded-xl border border-white/5">
              Finding factors for:<br/>
              <span className="font-mono text-white font-bold tracking-widest mt-1 block">x² {b >= 0 ? '+' : '-'} {Math.abs(b)}x {c >= 0 ? '+' : '-'} {Math.abs(c)}</span>
          </div>
      </div>

      {/* THE DIAMOND VISUALIZER */}
      <div className="flex-1 relative flex items-center justify-center p-8 z-10 bg-black/20">
          <div className="relative w-64 h-64">
              {/* The X graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <X size={256} strokeWidth={1} className="text-slate-800" />
              </div>

              {/* TOP (Product) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-center">
                  <div className="text-[10px] font-bold text-violet-400 uppercase mb-1">Product (c)</div>
                  <div className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">{c}</div>
              </div>

              {/* BOTTOM (Sum) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-center">
                  <div className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">{b}</div>
                  <div className="text-[10px] font-bold text-indigo-400 uppercase mt-1">Sum (b)</div>
              </div>

              {/* LEFT (Factor 1) */}
              <div className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 text-center w-20">
                   {factor1 !== null ? (
                       <div className="animate-in zoom-in duration-300">
                           <div className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{factor1}</div>
                       </div>
                   ) : <span className="text-3xl text-slate-700 font-black">?</span>}
              </div>

              {/* RIGHT (Factor 2) */}
              <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 text-center w-20">
                   {factor2 !== null ? (
                       <div className="animate-in zoom-in duration-300">
                           <div className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{factor2}</div>
                       </div>
                   ) : <span className="text-3xl text-slate-700 font-black">?</span>}
              </div>
          </div>

          {/* RESULT BOX */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              {factor1 !== null ? (
                  <div className="px-6 py-2 bg-emerald-950/50 text-emerald-400 border border-emerald-500/50 rounded-full font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] text-lg">
                      (x {factor1 >= 0 ? '+' : ''} {factor1})(x {factor2 !== null && factor2 >= 0 ? '+' : ''} {factor2})
                  </div>
              ) : (
                  <div className="px-6 py-2 bg-red-950/50 text-red-400 border border-red-500/50 rounded-full font-mono text-xs font-bold">
                      No integer factors found
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}
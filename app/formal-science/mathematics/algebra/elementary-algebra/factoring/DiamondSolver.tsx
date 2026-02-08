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
    // Z-10 ensures this sits above the canvas. Overflow-hidden stops leaks.
    <div className="relative z-10 w-full bg-white border border-slate-300 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[400px]">
      
      {/* INPUTS */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-center gap-6 relative z-20">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Set Parameters</div>
          
          <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Sum (b)</label>
              <input 
                type="number" value={b} onChange={(e) => setB(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-slate-300 rounded text-center font-mono font-bold focus:border-blue-500 outline-none"
              />
          </div>

          <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Product (c)</label>
              <input 
                type="number" value={c} onChange={(e) => setC(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-slate-300 rounded text-center font-mono font-bold focus:border-blue-500 outline-none"
              />
          </div>

          <div className="text-center text-xs text-slate-400 mt-4">
              Finding factors for:<br/>
              <span className="font-mono text-slate-800 font-bold">x² + {b}x + {c}</span>
          </div>
      </div>

      {/* THE DIAMOND VISUALIZER */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-white z-10">
          <div className="relative w-64 h-64">
              {/* The X graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <X size={256} strokeWidth={1} className="text-slate-200" />
              </div>

              {/* TOP (Product) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Product (c)</div>
                  <div className="text-4xl font-black text-slate-800">{c}</div>
              </div>

              {/* BOTTOM (Sum) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-center">
                  <div className="text-4xl font-black text-slate-800">{b}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-1">Sum (b)</div>
              </div>

              {/* LEFT (Factor 1) */}
              <div className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 text-center w-20">
                   {factor1 !== null ? (
                       <div className="animate-in zoom-in duration-300">
                           <div className="text-3xl font-bold text-blue-600">{factor1}</div>
                       </div>
                   ) : <span className="text-2xl text-slate-300">?</span>}
              </div>

              {/* RIGHT (Factor 2) */}
              <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 text-center w-20">
                   {factor2 !== null ? (
                       <div className="animate-in zoom-in duration-300">
                           <div className="text-3xl font-bold text-blue-600">{factor2}</div>
                       </div>
                   ) : <span className="text-2xl text-slate-300">?</span>}
              </div>
          </div>

          {/* RESULT BOX */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
              {factor1 !== null ? (
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-mono font-bold shadow-sm">
                      (x {factor1 > 0 ? '+' : ''}{factor1})(x {factor2 !== null && factor2 > 0 ? '+' : ''}{factor2})
                  </div>
              ) : (
                  <div className="inline-block px-4 py-2 bg-red-50 text-red-500 rounded-full font-mono text-xs font-bold">
                      No integer factors found
                  </div>
              )}
          </div>
      </div>

    </div>
  );
}
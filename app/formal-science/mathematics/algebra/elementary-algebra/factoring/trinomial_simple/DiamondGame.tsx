"use client";
import React, { useState } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { Check, X, RefreshCw, HelpCircle } from 'lucide-react';

const LEVELS = [
  { id: 1, b: 5, c: 6, ans: [2, 3] },        // Basic (+)
  { id: 2, b: -7, c: 12, ans: [-3, -4] },    // Both (-)
  { id: 3, b: 3, c: -10, ans: [5, -2] },     // Mixed, Big Pos
  { id: 4, b: -1, c: -20, ans: [-5, 4] }     // Mixed, Big Neg
];

export default function DiamondGame() {
  const [level, setLevel] = useState(0);
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [feedback, setFeedback] = useState("");

  const current = LEVELS[level];

  const check = () => {
      const n1 = parseInt(f1);
      const n2 = parseInt(f2);

      if (isNaN(n1) || isNaN(n2)) return;

      const sum = n1 + n2;
      const prod = n1 * n2;

      if (sum === current.b && prod === current.c) {
          setStatus('success');
          setFeedback("Perfect Balance!");
      } else {
          setStatus('fail');
          if (prod === current.c) {
              setFeedback(`Product is correct (${prod}), but Sum is ${sum} (needed ${current.b}).`);
          } else if (sum === current.b) {
              setFeedback(`Sum is correct (${sum}), but Product is ${prod} (needed ${current.c}).`);
          } else {
              setFeedback("Neither Sum nor Product match. Try again.");
          }
      }
  };

  const next = () => {
      setLevel((prev) => (prev + 1) % LEVELS.length);
      setF1("");
      setF2("");
      setStatus('idle');
      setFeedback("");
  };

  return (
    <div className="w-full bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[450px]">
      
      {/* SIDEBAR: INFO */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col z-20">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">Level {level + 1}</div>
          <div className="text-sm font-bold text-slate-700 mb-2">Find two numbers that:</div>
          <ul className="text-xs text-slate-500 space-y-2 mb-8 list-disc pl-4">
              <li>Multiply to <strong>{current.c}</strong></li>
              <li>Add up to <strong>{current.b}</strong></li>
          </ul>
          
          <div className="mt-auto p-4 bg-teal-50 border border-teal-200 rounded text-xs text-teal-800 leading-relaxed">
              <strong>Hint:</strong> Always list the factors of the product ({current.c}) first!
          </div>
      </div>

      {/* GAME BOARD */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[#f0fdfa]">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

          {/* THE X */}
          <div className="relative w-64 h-64 mb-8">
              {/* CROSS LINES */}
              <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[1px] h-full bg-slate-300 rotate-45 transform origin-center scale-150" />
                   <div className="w-[1px] h-full bg-slate-300 -rotate-45 transform origin-center scale-150" />
              </div>

              {/* TOP (Product) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Product</div>
                  <div className="text-4xl font-black text-slate-800">{current.c}</div>
              </div>

              {/* BOTTOM (Sum) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-center">
                  <div className="text-4xl font-black text-slate-800">{current.b}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Sum</div>
              </div>

              {/* LEFT INPUT */}
              <div className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2">
                  <input 
                    type="number" 
                    value={f1}
                    onChange={(e) => setF1(e.target.value)}
                    className="w-16 h-16 text-center text-xl font-bold rounded-lg border-2 border-slate-300 focus:border-teal-500 outline-none shadow-sm"
                    placeholder="?"
                  />
              </div>

              {/* RIGHT INPUT */}
              <div className="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2">
                  <input 
                    type="number" 
                    value={f2}
                    onChange={(e) => setF2(e.target.value)}
                    className="w-16 h-16 text-center text-xl font-bold rounded-lg border-2 border-slate-300 focus:border-teal-500 outline-none shadow-sm"
                    placeholder="?"
                  />
              </div>
          </div>

          {/* CONTROLS */}
          <div className="flex gap-4">
              <button 
                  onClick={check}
                  disabled={status === 'success'}
                  className="px-8 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-lg transition-colors shadow-lg"
              >
                  Check Balance
              </button>
              {status === 'success' && (
                  <button onClick={next} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-2">
                      Next <RefreshCw size={14} />
                  </button>
              )}
          </div>

          {/* FEEDBACK */}
          {feedback && (
              <div className={`mt-6 p-3 rounded-lg text-sm font-bold flex items-center gap-2 animate-in slide-in-from-bottom-2 ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status === 'success' ? <Check size={16} /> : <X size={16} />}
                  {feedback}
              </div>
          )}

      </div>
    </div>
  );
}
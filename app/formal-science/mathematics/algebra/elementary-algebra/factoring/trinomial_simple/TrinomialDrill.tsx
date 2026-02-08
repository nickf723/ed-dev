"use client";
import React, { useState } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { CheckCircle, XCircle, ArrowRight, Zap, HelpCircle } from 'lucide-react';

const DRILLS = [
  { q: "x^2 + 7x + 10", ans: "(x+2)(x+5)", hint: "Last term is (+), Middle is (+). Both signs are POSITIVE." },
  { q: "x^2 - 9x + 20", ans: "(x-4)(x-5)", hint: "Last term is (+), Middle is (-). Both signs are NEGATIVE." },
  { q: "x^2 + 2x - 15", ans: "(x+5)(x-3)", hint: "Last term is (-). Signs are DIFFERENT. Bigger number gets (+)." },
  { q: "x^2 - 4x - 12", ans: "(x-6)(x+2)", hint: "Last term is (-). Signs are DIFFERENT. Bigger number gets (-)." }
];

export default function TrinomialDrill() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);

  const check = () => {
    // Normalize: remove spaces, lowercase
    let norm = input.replace(/\s/g, '').toLowerCase();
    let ans = DRILLS[index].ans.replace(/\s/g, '').toLowerCase();
    
    // Handle reverse order: (x+2)(x+5) vs (x+5)(x+2)
    // Hacky swap check for this level
    let reversed = ans.split(')(').reverse().join(')(').replace('))', ')').replace('((', '(');

    if (norm === ans || norm === reversed) {
        setStatus('correct');
        setStreak(s => s + 1);
    } else {
        setStatus('wrong');
        setStreak(0);
    }
  };

  const next = () => {
      setIndex((prev) => (prev + 1) % DRILLS.length);
      setInput("");
      setStatus('idle');
  };

  return (
    <div className="bg-[#134e4a] text-white rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden border border-teal-800">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <MathRenderer expression="x^2+bx+c" block />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-teal-700 pb-4">
            <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2">
                    <Zap size={18} /> Sign Master
                </h3>
                <p className="text-xs text-teal-200 mt-1">Watch your pluses and minuses</p>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-bold text-teal-400 uppercase">Streak</div>
                <div className={`text-2xl font-black font-mono ${streak > 2 ? 'text-yellow-400' : 'text-teal-200'}`}>
                    {streak}
                </div>
            </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-teal-900 text-[10px] font-bold text-teal-300 uppercase tracking-widest mb-4">
                Factor Completely
            </div>
            <div className="text-5xl font-black tracking-tight">
                <MathRenderer expression={DRILLS[index].q} />
            </div>
        </div>

        {/* Input */}
        <div className="flex gap-4 max-w-md mx-auto relative z-10">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="(x + m)(x + n)"
                className="flex-1 bg-teal-950/50 border-2 border-teal-700 rounded-xl px-6 py-4 text-center font-mono text-xl focus:border-yellow-400 focus:bg-teal-900 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && check()}
                disabled={status === 'correct'}
            />
            <button 
                onClick={check}
                disabled={status === 'correct'}
                className="bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold px-8 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
                Check
            </button>
        </div>

        {/* Feedback */}
        {status === 'correct' && (
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex justify-between items-center animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center gap-3 text-green-300 font-bold">
                    <CheckCircle size={24} /> Correct!
                </div>
                <button onClick={next} className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2">
                    Next <ArrowRight size={14} />
                </button>
            </div>
        )}

        {status === 'wrong' && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-start gap-3">
                    <XCircle size={24} className="text-red-300 mt-1" />
                    <div>
                        <div className="text-red-300 font-bold mb-1">Check the signs.</div>
                        <div className="text-sm text-red-200 flex items-start gap-2">
                            <HelpCircle size={14} className="mt-0.5 opacity-70" /> 
                            Hint: {DRILLS[index].hint}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
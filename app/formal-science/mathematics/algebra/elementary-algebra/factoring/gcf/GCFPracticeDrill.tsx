"use client";
import React, { useState } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { CheckCircle, XCircle, ArrowRight, Zap, HelpCircle } from 'lucide-react';

const DRILLS = [
  { q: "5x + 10", ans: "5", hint: "What is the largest number that divides 5 and 10?" },
  { q: "x^2 - 7x", ans: "x", hint: "Both terms have an 'x'. Pull out the lowest power." },
  { q: "4x^3 + 6x^2", ans: "2x^2", hint: "Numbers: GCF of 4 & 6 is 2. Variables: Lowest power is x^2." },
  { q: "12a^2b - 8ab^2", ans: "4ab", hint: "Look at coefficients (12, 8), a's (a^2, a), and b's (b, b^2) separately." },
  { q: "3x + 5", ans: "1", hint: "3 and 5 are prime. They share nothing but 1." }
];

export default function GCFPracticeDrill() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);

  const check = () => {
    // Normalize input (remove spaces)
    if (input.replace(/\s/g, '') === DRILLS[index].ans) {
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
    <div className="bg-[#0f172a] text-white rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden border border-slate-700">
        {/* Background Decal */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <MathRenderer expression="\frac{GCF(a,b)}{x}" block />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-slate-700 pb-4">
            <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-green-400 flex items-center gap-2">
                    <Zap size={18} /> Rapid Fire
                </h3>
                <p className="text-xs text-slate-400 mt-1">Test your GCF intuition</p>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Current Streak</div>
                <div className={`text-2xl font-black font-mono ${streak > 2 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {streak}
                </div>
            </div>
        </div>

        {/* Question Area */}
        <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                Factor out the GCF
            </div>
            <div className="text-5xl font-black tracking-tight">
                <MathRenderer expression={DRILLS[index].q} />
            </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-4 max-w-md mx-auto relative z-10">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type answer..."
                className="flex-1 bg-slate-800/50 border-2 border-slate-600 rounded-xl px-6 py-4 text-center font-mono text-xl focus:border-green-500 focus:bg-slate-800 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && check()}
                disabled={status === 'correct'}
            />
            <button 
                onClick={check}
                disabled={status === 'correct'}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
                Check
            </button>
        </div>

        {/* Feedback Area */}
        {status === 'correct' && (
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex justify-between items-center animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center gap-3 text-green-400 font-bold">
                    <CheckCircle size={24} />
                    <div>
                        <div>Correct!</div>
                        <div className="text-xs font-normal opacity-80 text-green-300">Great job extracting the terms.</div>
                    </div>
                </div>
                <button onClick={next} className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2">
                    Next <ArrowRight size={14} />
                </button>
            </div>
        )}

        {status === 'wrong' && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-start gap-3">
                    <XCircle size={24} className="text-red-400 mt-1" />
                    <div>
                        <div className="text-red-400 font-bold mb-1">Not quite right.</div>
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
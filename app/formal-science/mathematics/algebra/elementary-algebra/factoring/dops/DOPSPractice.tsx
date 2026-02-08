"use client";
import React, { useState } from 'react';
import MathRenderer from '@/components/MathRenderer';
import { CheckCircle, XCircle, ArrowRight, Zap, HelpCircle } from 'lucide-react';

const DRILLS = [
  { q: "x^2 - 49", ans: "(x-7)(x+7)", hint: "Sqrt(49) is 7. One plus, one minus." },
  { q: "y^2 - 100", ans: "(y-10)(y+10)", hint: "Sqrt(100) is 10." },
  { q: "4x^2 - 9", ans: "(2x-3)(2x+3)", hint: "Don't forget the coefficient! Sqrt(4) is 2." },
  { q: "x^2 + 25", ans: "prime", hint: "TRAP! This is a SUM of squares. It cannot be factored." },
  { q: "16 - a^2", ans: "(4-a)(4+a)", hint: "Keep the order! Number first, then variable." }
];

export default function DOPSPractice() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);

  const check = () => {
    // Normalize input (remove spaces, lowercase)
    const normalized = input.replace(/\s/g, '').toLowerCase();
    const correct = DRILLS[index].ans.replace(/\s/g, '').toLowerCase();
    
    // Allow reverse order: (x+7)(x-7) is same as (x-7)(x+7)
    // Simple check: if not prime, check if input contains both parts
    if (correct === 'prime') {
        if (normalized === 'prime' || normalized === 'impossible') {
             setStatus('correct');
             setStreak(s => s + 1);
             return;
        }
    }
    
    // String matching (Robust enough for this level)
    if (normalized === correct) {
        setStatus('correct');
        setStreak(s => s + 1);
    } else {
        // Check for flipped order (e.g. (x+7)(x-7))
        const flipped = correct.split(')(').reverse().join(')(').replace('))', ')').replace('((', '('); // very hacky flip
        if (normalized === flipped) { // Basic attempt to catch reorder
             setStatus('correct');
             setStreak(s => s + 1);
        } else {
             setStatus('wrong');
             setStreak(0);
        }
    }
  };

  const next = () => {
      setIndex((prev) => (prev + 1) % DRILLS.length);
      setInput("");
      setStatus('idle');
  };

  return (
    <div className="bg-[#1e1b4b] text-white rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden border border-indigo-900">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <MathRenderer expression="a^2 - b^2" block />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-indigo-800 pb-4">
            <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-rose-400 flex items-center gap-2">
                    <Zap size={18} /> Rapid Fire
                </h3>
                <p className="text-xs text-indigo-300 mt-1">Identify the Conjugates</p>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-bold text-indigo-400 uppercase">Current Streak</div>
                <div className={`text-2xl font-black font-mono ${streak > 2 ? 'text-rose-400' : 'text-indigo-200'}`}>
                    {streak}
                </div>
            </div>
        </div>

        {/* Question Area */}
        <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-900 text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-4">
                Factor Completely
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
                placeholder="(a - b)(a + b)"
                className="flex-1 bg-indigo-950/50 border-2 border-indigo-700 rounded-xl px-6 py-4 text-center font-mono text-xl focus:border-rose-500 focus:bg-indigo-950 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && check()}
                disabled={status === 'correct'}
            />
            <button 
                onClick={check}
                disabled={status === 'correct'}
                className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 rounded-xl transition-all shadow-lg hover:shadow-rose-500/20 active:scale-95"
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
                        <div className="text-xs font-normal opacity-80 text-green-300">Perfect symmetry.</div>
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
                        <div className="text-red-400 font-bold mb-1">Check your roots.</div>
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
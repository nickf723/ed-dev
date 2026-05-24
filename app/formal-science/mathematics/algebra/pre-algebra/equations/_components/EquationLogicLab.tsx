"use client";
import React, { useState } from 'react';
import { Network, Check, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';

export default function EquationLogicLab() {
    const [step, setStep] = useState(0);
    const [error, setError] = useState(false);

    // The puzzle: 2(x + 3) - 4 = 10
    const workflow = [
        { 
            equation: "2(x + 3) - 4 = 10", 
            question: "What is the best first step?", 
            options: [
                { text: "Subtract 3 from both sides", correct: false },
                { text: "Add 4 to both sides", correct: true },
                { text: "Divide by 2", correct: false }
            ],
            hint: "Clear the loose constants outside the parentheses first!"
        },
        { 
            equation: "2(x + 3) = 14", 
            question: "Now, how do we clear the coefficient?", 
            options: [
                { text: "Divide both sides by 2", correct: true },
                { text: "Subtract 2 from both sides", correct: false },
                { text: "Subtract 3 from both sides", correct: false }
            ],
            hint: "The 2 is multiplying the group. What is the inverse of multiplication?"
        },
        { 
            equation: "x + 3 = 7", 
            question: "Final step to isolate x!", 
            options: [
                { text: "Add 3 to both sides", correct: false },
                { text: "Subtract 3 from both sides", correct: true },
                { text: "Divide by 3", correct: false }
            ],
            hint: "Do the opposite of + 3."
        },
        { 
            equation: "x = 4", 
            question: "Solved!", 
            options: [],
            hint: ""
        }
    ];

    const currentData = workflow[step];
    const isComplete = step === workflow.length - 1;

    const handleGuess = (isCorrect: boolean) => {
        if (isCorrect) {
            setError(false);
            setStep(s => s + 1);
        } else {
            setError(true);
            setTimeout(() => setError(false), 1500);
        }
    };

    return (
        <div className="w-full bg-slate-950/80 backdrop-blur-xl border border-rose-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans flex flex-col min-h-[450px]">
            
            <div className="bg-rose-950/30 border-b border-rose-500/20 p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 border border-rose-500/30 rounded-lg">
                        <Network size={18} className="text-rose-400" />
                    </div>
                    <h3 className="text-white font-bold tracking-wide text-sm uppercase">Logic Router</h3>
                </div>
                {isComplete && (
                    <button onClick={() => setStep(0)} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors">
                        <RefreshCw size={12} /> Reset
                    </button>
                )}
            </div>

            <div className="flex flex-col p-6 md:p-8 flex-1">
                
                {/* The Current Equation */}
                <div className="w-full text-center mb-8">
                    <div className="text-[10px] text-rose-400 uppercase font-black tracking-widest mb-2">Current State</div>
                    <div className={`text-4xl md:text-5xl font-black font-mono transition-all duration-500 ${isComplete ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-white'}`}>
                        {currentData.equation}
                    </div>
                </div>

                {/* The Interaction Zone */}
                {!isComplete ? (
                    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                        <div className="text-center font-bold text-slate-300 mb-2">{currentData.question}</div>
                        
                        {currentData.options.map((opt, i) => (
                            <button 
                                key={i}
                                onClick={() => handleGuess(opt.correct)}
                                className={`p-4 rounded-xl border text-sm font-bold transition-all text-left flex justify-between items-center group
                                    ${error && !opt.correct ? 'opacity-50 pointer-events-none border-red-500/30 bg-red-500/5' : 'bg-black/40 border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 text-slate-300 hover:text-white'}
                                `}
                            >
                                {opt.text}
                                <ArrowRight size={16} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                            </button>
                        ))}

                        {error && (
                            <div className="text-xs text-red-400 font-bold text-center mt-2 flex items-center justify-center gap-2 animate-pulse">
                                <ShieldAlert size={14} /> {currentData.hint}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center flex-1 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mb-4">
                            <Check size={40} className="text-emerald-400" />
                        </div>
                        <h4 className="text-2xl font-black text-white">Variable Isolated!</h4>
                        <p className="text-slate-400 text-sm mt-2 text-center">You successfully peeled back the layers using inverse operations to find the hidden value of x.</p>
                    </div>
                )}

            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-900 flex">
                {workflow.map((_, i) => (
                    <div key={i} className={`h-full flex-1 border-r border-slate-950 transition-colors duration-500 ${i <= step ? 'bg-rose-500' : 'bg-transparent'}`} />
                ))}
            </div>
        </div>
    );
}
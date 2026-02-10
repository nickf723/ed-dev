"use client";
import React, { useState } from 'react';
import { VOCAB } from './_assets/vocab'; // Importing your data
import { ArrowRight, MessageSquare, Ear, Mic, AlertCircle } from 'lucide-react';

export default function CommunicationCycle() {
  const [step, setStep] = useState(0);
  
  // Helper to find definition
  const getDef = (id: string) => VOCAB.find(v => v.id === id);

  const steps = [
      { id: 'source', label: 'Idea', icon: MessageSquare, text: '"Hello!"' },
      { id: 'encoding', label: 'Encoding', icon: Mic, text: 'Thinking...' },
      { id: 'noise', label: 'Channel + Noise', icon: AlertCircle, text: '"H...lo!"' },
      { id: 'decoding', label: 'Decoding', icon: Ear, text: 'Hearing...' },
      { id: 'feedback', label: 'Understanding', icon: ArrowRight, text: '"Hi!"' }
  ];

  return (
    <div className="w-full bg-slate-900 border border-indigo-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">The Transmission Cycle</h2>
            <p className="text-indigo-300 text-xs font-mono mt-2">SHANNON-WEAVER MODEL SIMULATION</p>
        </div>

        {/* The Pipeline */}
        <div className="flex justify-between items-center relative mb-16">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -z-10" />
            <div 
                className="absolute top-1/2 left-0 h-1 bg-cyan-500 -z-10 transition-all duration-500"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s, i) => (
                <button
                    key={s.id}
                    onClick={() => setStep(i)}
                    className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 z-10 ${i <= step ? 'bg-slate-900 border-cyan-500 text-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-600'}`}
                >
                    <s.icon size={24} />
                    {/* Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        {s.label}
                    </div>
                </button>
            ))}
        </div>

        {/* Info Card (Dynamic) */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 min-h-[150px] animate-in slide-in-from-bottom-4 fade-in">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                    {steps[step].label}
                </h3>
                <div className="px-3 py-1 bg-indigo-600 rounded-full text-xs font-mono text-white">
                    Signal: {steps[step].text}
                </div>
            </div>
            
            {/* Pulling data from VOCAB file if key exists */}
            <p className="text-slate-300 leading-relaxed text-sm">
                {getDef(steps[step].id)?.def || "The message originates here in the sender's mind."}
            </p>
            
            {getDef(steps[step].id) && (
                <div className="mt-4 text-xs text-indigo-400 italic">
                    Example: {getDef(steps[step].id)?.example}
                </div>
            )}
        </div>

    </div>
  );
}
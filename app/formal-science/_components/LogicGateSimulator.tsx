"use client";
import React, { useState } from 'react';
import { Cpu, RotateCcw, Zap, ZapOff } from 'lucide-react';

export default function LogicGateSimulator() {
  // Input states (0 or 1)
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  
  // Selected Gate
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('AND');

  // Compute Output
  const computeOutput = () => {
    switch (gateType) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'XOR': return inputA !== inputB ? 1 : 0;
      default: return 0;
    }
  };

  const output = computeOutput();

  const reset = () => {
    setInputA(0); setInputB(0); setGateType('AND');
  };

  return (
    <div className="w-full h-full bg-black/40 backdrop-blur-md border border-rose-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden font-mono flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-8 border-b border-rose-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 mb-1">
            <Cpu size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Logic Gate Lab</h3>
          </div>
          <div className="text-[10px] text-slate-500 tracking-widest uppercase">Boolean Algebra Simulator</div>
        </div>
        <button onClick={reset} className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 flex-1 items-center justify-center">
        
        {/* LEFT: Inputs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Input A</span>
            <button 
              onClick={() => setInputA(inputA ? 0 : 1)}
              className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                inputA ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-black/50 border-white/10 text-slate-600 hover:border-white/30'
              }`}
            >
              {inputA}
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Input B</span>
            <button 
              onClick={() => setInputB(inputB ? 0 : 1)}
              className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                inputB ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-black/50 border-white/10 text-slate-600 hover:border-white/30'
              }`}
            >
              {inputB}
            </button>
          </div>
        </div>

        {/* MIDDLE: Gate Selection */}
        <div className="relative flex flex-col items-center">
          {/* Wire Connections */}
          <div className="absolute top-[20%] -left-12 w-12 h-0.5 bg-rose-500/30" />
          <div className="absolute bottom-[20%] -left-12 w-12 h-0.5 bg-rose-500/30" />
          <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-rose-500/30 -translate-y-1/2" />

          <div className="p-4 bg-black/60 border border-rose-500/30 rounded-2xl flex flex-col gap-2 relative z-10 backdrop-blur-md">
            {(['AND', 'OR', 'XOR'] as const).map((gate) => (
              <button
                key={gate}
                onClick={() => setGateType(gate)}
                className={`px-8 py-3 rounded-lg font-bold tracking-widest transition-all ${
                  gateType === gate 
                    ? 'bg-rose-500/20 border border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]' 
                    : 'bg-white/5 border border-white/5 text-slate-500 hover:text-white'
                }`}
              >
                {gate}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Output */}
        <div className="flex flex-col items-center">
           <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Output</span>
           <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
             output 
              ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.6)]' 
              : 'bg-black/50 border-white/10 shadow-none'
           }`}>
             {output ? <Zap size={40} className="text-rose-400" /> : <ZapOff size={40} className="text-slate-700" />}
           </div>
           <span className="mt-4 text-2xl font-black text-slate-400">{output}</span>
        </div>

      </div>
      
      {/* Truth Table Hint */}
      <div className="mt-8 pt-4 border-t border-rose-500/20 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
          {gateType === 'AND' && "Output is 1 ONLY IF both A and B are 1."}
          {gateType === 'OR' && "Output is 1 IF A or B (or both) are 1."}
          {gateType === 'XOR' && "Output is 1 ONLY IF A and B are DIFFERENT."}
        </p>
      </div>

    </div>
  );
}
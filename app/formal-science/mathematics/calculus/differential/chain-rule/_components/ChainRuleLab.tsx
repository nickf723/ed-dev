"use client";
import React, { useState } from 'react';
import { GitMerge, ArrowRight, X } from 'lucide-react';
import { M } from '@/components/Math';

export default function ChainRuleLab() {
  const [x, setX] = useState(2);
  
  // Scenario: y = sin(x^2)
  // Inner: u = x^2   => u' = 2x
  // Outer: y = sin(u) => y' = cos(u)
  
  const innerFn = (val: number) => val * val;
  const innerDeriv = (val: number) => 2 * val;
  
  const outerFn = (val: number) => Math.sin(val);
  const outerDeriv = (val: number) => Math.cos(val);

  const u = innerFn(x);
  const du_dx = innerDeriv(x);
  
  const y = outerFn(u);
  const dy_du = outerDeriv(u);
  
  const totalDeriv = dy_du * du_dx;

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-green-500 flex items-center gap-2">
                <GitMerge size={14} /> Rate Multiplier
            </div>
            <div className="text-xs font-mono text-neutral-500">
                y = sin(x²)
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            
            {/* STAGE 1: INPUT */}
            <div className="p-8 flex flex-col items-center justify-center gap-4 bg-neutral-900/20">
                <div className="text-[10px] uppercase font-bold text-neutral-500 mb-2">1. The Trigger (x)</div>
                
                {/* Knob */}
                <div className="relative w-24 h-24 rounded-full border-4 border-neutral-800 flex items-center justify-center bg-black">
                    <div 
                        className="absolute w-2 h-4 bg-white top-0 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-75"
                        style={{ transform: `translateY(40px) rotate(${x * 40}deg) translateY(-40px)` }}
                    />
                    <span className="font-mono text-2xl text-white">{x.toFixed(1)}</span>
                </div>

                <input 
                    type="range" min="0" max="3" step="0.1" 
                    value={x} onChange={e => setX(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg accent-white"
                />
            </div>

            {/* STAGE 2: PROCESS */}
            <div className="p-8 flex flex-col justify-center gap-6">
                
                {/* Inner Link */}
                <div className="flex items-center justify-between gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-blue-400 uppercase">Inner Rate</div>
                        <M>{`g'(x) = 2x`}</M>
                    </div>
                    <div className="h-px flex-1 bg-neutral-800 relative">
                        <div className="absolute right-0 -top-1.5 text-neutral-600"><ArrowRight size={14}/></div>
                    </div>
                    <div className="px-2 py-1 bg-blue-900/20 border border-blue-500/30 rounded text-blue-400 font-mono font-bold">
                        {du_dx.toFixed(2)}x
                    </div>
                </div>

                {/* Outer Link */}
                <div className="flex items-center justify-between gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-yellow-400 uppercase">Outer Rate</div>
                        <M>{`f'(u) = \\cos(u)`}</M>
                    </div>
                    <div className="h-px flex-1 bg-neutral-800 relative">
                        <div className="absolute right-0 -top-1.5 text-neutral-600"><ArrowRight size={14}/></div>
                    </div>
                    <div className="px-2 py-1 bg-yellow-900/20 border border-yellow-500/30 rounded text-yellow-400 font-mono font-bold">
                        {dy_du.toFixed(2)}x
                    </div>
                </div>

            </div>

            {/* STAGE 3: RESULT */}
            <div className="p-8 flex flex-col items-center justify-center bg-green-900/10">
                <div className="text-[10px] uppercase font-bold text-green-500 mb-4">Total Chain Reaction</div>
                
                <div className="flex items-center gap-2 text-xl font-mono text-white mb-2">
                    <span className="text-blue-400">{du_dx.toFixed(2)}</span>
                    <X size={14} className="text-neutral-500"/>
                    <span className="text-yellow-400">{dy_du.toFixed(2)}</span>
                </div>
                
                <div className="w-full h-px bg-neutral-700 my-2" />
                
                <div className="text-4xl font-black text-green-400 font-mono">
                    {totalDeriv.toFixed(2)}
                </div>
                <div className="text-xs text-neutral-500 mt-2">Rate of Change (dy/dx)</div>
            </div>

        </div>
    </div>
  );
}
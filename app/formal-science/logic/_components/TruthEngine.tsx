"use client";
import React, { useState } from 'react';
import { Cpu, Power, Hash, GitCommit } from 'lucide-react';
import { M } from '@/app/_components/Math';

export default function TruthEngine() {
  const [p, setP] = useState(false);
  const [q, setQ] = useState(false);

  // Logical Evaluations
  const andResult = p && q;
  const orResult = p || q;
  const xorResult = (p || q) && !(p && q);
  const impliesResult = !p || q; // P -> Q is logically equivalent to NOT P OR Q

  const renderState = (val: boolean) => (
      <span className={`font-mono font-black ${val ? 'text-purple-400' : 'text-neutral-600'}`}>
          {val ? 'TRUE' : 'FALSE'}
      </span>
  );

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-purple-500 flex items-center gap-2 tracking-widest">
                <Cpu size={14} /> The Truth Engine
            </div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Propositional State Evaluator
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            
            {/* INPUT CONTROLS (Left Col) */}
            <div className="md:col-span-4 bg-[#05030a] p-8 flex flex-col justify-center gap-8">
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Power size={14}/> Input Variables
                    </div>
                    
                    <div className="space-y-4">
                        {/* P Toggle */}
                        <button 
                            onClick={() => setP(!p)}
                            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${p ? 'bg-purple-950/40 border-purple-500' : 'bg-black/60 border-neutral-700 hover:border-neutral-500'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xl font-bold text-white">P</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${p ? 'bg-purple-500' : 'bg-neutral-800'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${p ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </button>

                        {/* Q Toggle */}
                        <button 
                            onClick={() => setQ(!q)}
                            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${q ? 'bg-blue-950/40 border-blue-500' : 'bg-black/60 border-neutral-700 hover:border-neutral-500'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xl font-bold text-white">Q</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${q ? 'bg-blue-500' : 'bg-neutral-800'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${q ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* OUTPUT EVALUATIONS (Right Col) */}
            <div className="md:col-span-8 p-8 bg-neutral-900/30 flex flex-col justify-center">
                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Hash size={14}/> Logical Connectives
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* AND */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${andResult ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-black/40 border-neutral-800'}`}>
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-white tracking-widest">AND</span>
                            <M>{`P \\land Q`}</M>
                        </div>
                        <div>
                            <div className="text-[10px] text-neutral-500 uppercase mb-1">Result</div>
                            <div className="text-2xl">{renderState(andResult)}</div>
                        </div>
                    </div>

                    {/* OR */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${orResult ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-black/40 border-neutral-800'}`}>
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-white tracking-widest">OR</span>
                            <M>{`P \\lor Q`}</M>
                        </div>
                        <div>
                            <div className="text-[10px] text-neutral-500 uppercase mb-1">Result</div>
                            <div className="text-2xl">{renderState(orResult)}</div>
                        </div>
                    </div>

                    {/* XOR */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${xorResult ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-black/40 border-neutral-800'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-widest">XOR</span>
                                <span className="text-[9px] text-neutral-500 uppercase mt-1">Exclusive OR</span>
                            </div>
                            <M>{`P \\oplus Q`}</M>
                        </div>
                        <div>
                            <div className="text-[10px] text-neutral-500 uppercase mb-1">Result</div>
                            <div className="text-2xl">{renderState(xorResult)}</div>
                        </div>
                    </div>

                    {/* IMPLIES */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${impliesResult ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-black/40 border-neutral-800'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-widest">IMPLIES</span>
                                <span className="text-[9px] text-neutral-500 uppercase mt-1">If P, then Q</span>
                            </div>
                            <M>{`P \\implies Q`}</M>
                        </div>
                        <div>
                            <div className="text-[10px] text-neutral-500 uppercase mb-1">Result</div>
                            <div className="text-2xl">{renderState(impliesResult)}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
}
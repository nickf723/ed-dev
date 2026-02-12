"use client";
import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Check, X, ArrowRight } from 'lucide-react';

export default function TruthTableLab() {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(true);

  // Logic Calculations
  const notP = !p;
  const notQ = !q;
  const and = p && q;
  const or = p || q;
  const conditional = !p || q; // p -> q is equivalent to !p or q
  const contrapositive = !notQ || notP; // ~q -> ~p

  const BoolBadge = ({ val }: { val: boolean }) => (
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase w-16 text-center inline-block ${val ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
          {val ? 'TRUE' : 'FALSE'}
      </span>
  );

  return (
    <div className="w-full bg-slate-900 border border-green-500/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full md:w-64 space-y-8 bg-black/20 p-6 rounded-xl border border-green-500/10">
            <div className="pb-4 border-b border-green-900">
                <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Inputs</div>
                <h3 className="text-2xl font-black text-white">Variables</h3>
            </div>

            {/* Switch P */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-white">p</span>
                <button onClick={() => setP(!p)} className="text-green-400 hover:text-green-300 transition-colors">
                    {p ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-600" />}
                </button>
            </div>

            {/* Switch Q */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-white">q</span>
                <button onClick={() => setQ(!q)} className="text-green-400 hover:text-green-300 transition-colors">
                    {q ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-slate-600" />}
                </button>
            </div>
            
            <div className="text-xs text-slate-400 mt-4 leading-relaxed">
                Toggle the variables to see how they affect the logic gates below.
            </div>
        </div>

        {/* LOGIC GATES */}
        <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* AND GATE */}
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700 flex justify-between items-center">
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Conjunction (AND)</div>
                        <div className="font-mono text-lg text-white">p ∧ q</div>
                    </div>
                    <BoolBadge val={and} />
                </div>

                {/* OR GATE */}
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700 flex justify-between items-center">
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Disjunction (OR)</div>
                        <div className="font-mono text-lg text-white">p ∨ q</div>
                    </div>
                    <BoolBadge val={or} />
                </div>

                {/* CONDITIONAL */}
                <div className={`p-4 rounded border flex justify-between items-center transition-colors ${!p || q ? 'bg-green-900/10 border-green-500/50' : 'bg-red-900/10 border-red-500/50'}`}>
                    <div>
                        <div className="text-xs font-bold text-green-400 uppercase">Conditional</div>
                        <div className="font-mono text-lg text-white">p → q</div>
                    </div>
                    <BoolBadge val={conditional} />
                </div>

                {/* CONTRAPOSITIVE */}
                <div className={`p-4 rounded border flex justify-between items-center transition-colors ${!notQ || notP ? 'bg-green-900/10 border-green-500/50' : 'bg-red-900/10 border-red-500/50'}`}>
                    <div>
                        <div className="text-xs font-bold text-green-400 uppercase">Contrapositive</div>
                        <div className="font-mono text-lg text-white">~q → ~p</div>
                    </div>
                    <BoolBadge val={contrapositive} />
                </div>
            </div>

            {/* EQUIVALENCE CHECK */}
            <div className="mt-6 p-4 bg-black/40 rounded-xl border border-slate-700 flex items-center justify-center gap-4">
                <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Original</div>
                    <div className="font-mono font-bold text-white">p → q</div>
                </div>
                
                <div className={`flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase ${conditional === contrapositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {conditional === contrapositive ? 'Logically Equivalent' : 'Not Equivalent'} <Check size={14} />
                </div>

                <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Contrapositive</div>
                    <div className="font-mono font-bold text-white">~q → ~p</div>
                </div>
            </div>
        </div>
    </div>
  );
}
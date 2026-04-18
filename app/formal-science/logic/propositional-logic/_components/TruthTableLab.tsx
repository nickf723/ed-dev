"use client";
import React, { useState } from 'react';
import { Table, Check, X, MousePointerClick } from 'lucide-react';
import { M } from '@/app/_components/Math';

export default function TruthTableLab() {
  const [activeRow, setActiveRow] = useState<number | null>(0); // 0, 1, 2, or 3

  // The 4 absolute states of a 2-variable universe
  const rows = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false },
  ];

  const renderCell = (val: boolean, isHighlight: boolean) => (
    <div className={`flex items-center justify-center gap-2 font-mono text-sm md:text-base font-black transition-colors ${
      val 
        ? (isHighlight ? 'text-purple-400' : 'text-purple-400/50') 
        : (isHighlight ? 'text-neutral-500' : 'text-neutral-700')
    }`}>
      {val ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
      {val ? 'T' : 'F'}
    </div>
  );

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-purple-500 flex items-center gap-2 tracking-widest">
                <Table size={14} /> The Universal Truth Table
            </div>
            <div className="text-[10px] uppercase font-bold text-neutral-500 flex items-center gap-2">
                <MousePointerClick size={14} /> Select a row to isolate
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-black/40 border-b border-neutral-800 text-xs font-black uppercase tracking-widest text-neutral-400">
                        <th className="p-4 text-center border-r border-neutral-800 w-1/6">P</th>
                        <th className="p-4 text-center border-r border-neutral-800 w-1/6">Q</th>
                        <th className="p-4 text-center border-r border-neutral-800 w-1/6"><M>P \land Q</M> <span className="block text-[8px] mt-1 text-neutral-600">AND</span></th>
                        <th className="p-4 text-center border-r border-neutral-800 w-1/6"><M>P \lor Q</M> <span className="block text-[8px] mt-1 text-neutral-600">OR</span></th>
                        <th className="p-4 text-center border-r border-neutral-800 w-1/6"><M>P \implies Q</M> <span className="block text-[8px] mt-1 text-neutral-600">IMPLIES</span></th>
                        <th className="p-4 text-center w-1/6"><M>P \iff Q</M> <span className="block text-[8px] mt-1 text-neutral-600">XNOR (IFF)</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                    {rows.map((row, idx) => {
                        const isHighlight = activeRow === idx;
                        const andRes = row.p && row.q;
                        const orRes = row.p || row.q;
                        const impliesRes = !row.p || row.q;
                        const iffRes = row.p === row.q;

                        return (
                            <tr 
                                key={idx} 
                                onClick={() => setActiveRow(idx)}
                                className={`cursor-pointer transition-all duration-300 ${
                                    isHighlight ? 'bg-purple-950/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]' : 'bg-transparent hover:bg-neutral-900/50'
                                }`}
                            >
                                <td className={`p-4 border-r border-neutral-800/50 ${isHighlight ? 'bg-black/20' : ''}`}>{renderCell(row.p, isHighlight)}</td>
                                <td className={`p-4 border-r border-neutral-800/50 ${isHighlight ? 'bg-black/20' : ''}`}>{renderCell(row.q, isHighlight)}</td>
                                <td className="p-4 border-r border-neutral-800/50">{renderCell(andRes, isHighlight)}</td>
                                <td className="p-4 border-r border-neutral-800/50">{renderCell(orRes, isHighlight)}</td>
                                <td className="p-4 border-r border-neutral-800/50">{renderCell(impliesRes, isHighlight)}</td>
                                <td className="p-4">{renderCell(iffRes, isHighlight)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        {/* Dynamic Explanation Panel */}
        <div className="bg-[#05030a] p-6 border-t border-neutral-800 min-h-[120px] flex items-center">
            {activeRow === 0 && (
                <p className="text-sm text-neutral-400 font-light leading-relaxed m-0">
                    <strong className="text-purple-400">State 1 (T, T):</strong> The only universe where <strong className="text-white">AND</strong> evaluates to True. Because P and Q match, the <strong className="text-white">Biconditional (IFF)</strong> is also True.
                </p>
            )}
            {activeRow === 1 && (
                <p className="text-sm text-neutral-400 font-light leading-relaxed m-0">
                    <strong className="text-purple-400">State 2 (T, F):</strong> This is the <em>only</em> scenario that breaks the <strong className="text-white">IMPLIES</strong> statement. You cannot start with a True premise and deduce a False conclusion.
                </p>
            )}
            {activeRow === 2 && (
                <p className="text-sm text-neutral-400 font-light leading-relaxed m-0">
                    <strong className="text-purple-400">State 3 (F, T):</strong> Notice that <strong className="text-white">IMPLIES</strong> is True here. In logic, a False premise implying a True conclusion is considered "Vacuously True."
                </p>
            )}
            {activeRow === 3 && (
                <p className="text-sm text-neutral-400 font-light leading-relaxed m-0">
                    <strong className="text-purple-400">State 4 (F, F):</strong> The only universe where <strong className="text-white">OR</strong> evaluates to False. Because the inputs match, the <strong className="text-white">Biconditional (IFF)</strong> evaluates to True!
                </p>
            )}
        </div>
    </div>
  );
}
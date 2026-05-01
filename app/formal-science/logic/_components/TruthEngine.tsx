"use client";
import React, { useState } from 'react';
import { Cpu, Power, Zap, Activity, ToggleLeft } from 'lucide-react';

export default function TruthEngine() {
  const [mode, setMode] = useState<'unary' | 'binary'>('binary');
  const [p, setP] = useState(false);
  const [q, setQ] = useState(false);

  // Core binary representations
  const pBin = p ? '1' : '0';
  const qBin = q ? '1' : '0';

  // Binary (2-Input) Evaluations
  const binaryResults = {
    AND: p && q,
    OR: p || q,
    XOR: p !== q,
    NAND: !(p && q),
    IMPLIES: !p || q,
    IFF: p === q,
  };

  // Unary (1-Input) Evaluations
  const unaryResults = {
    NOT: !p,
    BUFFER: p,
    TRUE: true,
    FALSE: false,
  };

  // Upgraded Reusable Card with dynamic Unary/Binary substitution formatting
  const LogicCard = ({ title, subtitle, symbol, result, isUnary = false }: { title: string, subtitle?: string, symbol: string, result: boolean, isUnary?: boolean }) => {
    const rBin = result ? '1' : '0';
    
    return (
      <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
        result
          ? 'bg-purple-950/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
          : 'bg-[#0a0a0a] border-white/5 opacity-80 hover:opacity-100 hover:border-white/10'
      }`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-white font-bold tracking-wide flex items-center gap-2">
              {title} {result && <Zap size={14} className="text-purple-400 fill-purple-400 animate-pulse" />}
            </h4>
            {subtitle && <div className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1">{subtitle}</div>}
          </div>
          <div className="text-white font-serif text-xl opacity-50 group-hover:opacity-100 transition-opacity">
            {symbol}
          </div>
        </div>

        {/* Live Substitution Readout (Adapts to Unary or Binary) */}
        <div className="bg-black/50 rounded-lg p-3 border border-white/5 mb-4 font-mono text-xs flex justify-between items-center">
            <div className="flex gap-2 text-neutral-400">
                {isUnary ? (
                    <>
                        <span>{symbol}</span>
                        <span className={p ? 'text-purple-300' : ''}>{pBin}</span>
                    </>
                ) : (
                    <>
                        <span className={p ? 'text-purple-300' : ''}>{pBin}</span>
                        <span>{symbol}</span>
                        <span className={q ? 'text-purple-300' : ''}>{qBin}</span>
                    </>
                )}
            </div>
            <div className="text-neutral-600">=</div>
            <div className={`font-bold text-lg ${result ? 'text-purple-400' : 'text-neutral-600'}`}>
                {rBin}
            </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest">State</div>
          <div className={`text-sm font-black tracking-widest transition-colors ${result ? 'text-purple-400' : 'text-neutral-600'}`}>
            {result ? 'TRUE' : 'FALSE'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-3xl overflow-hidden font-sans shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]">
         <div className="flex items-center gap-3 text-purple-400">
            <Cpu size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">The Truth Engine</h3>
         </div>
         <div className="flex items-center gap-3">
             <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest hidden sm:flex items-center gap-2">
                <Activity size={12} className={p || (mode === 'binary' && q) ? 'text-purple-500 animate-pulse' : ''} />
                Live Evaluation
             </div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* LEFT PANEL: Inputs & Mode Toggle */}
        <div className="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 bg-[#080808] flex flex-col">
           
           {/* Mode Toggle */}
           <div className="flex bg-[#0a0a0a] p-1 rounded-xl border border-white/10 mb-8">
               <button 
                  onClick={() => setMode('unary')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'unary' ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'text-neutral-500 hover:text-white'}`}
               >
                   <ToggleLeft size={14} /> Unary
               </button>
               <button 
                  onClick={() => setMode('binary')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'binary' ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'text-neutral-500 hover:text-white'}`}
               >
                   <ToggleLeft size={14} className="rotate-180" /> Binary
               </button>
           </div>

           <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  <Power size={14} /> Variables
               </div>
               <div className="text-[10px] font-mono text-purple-400/50">{mode === 'unary' ? '1-BIT' : '2-BIT'}</div>
           </div>

           <div className="space-y-4 flex-1">
              {/* P Toggle (Always Visible) */}
              <button
                 onClick={() => setP(!p)}
                 className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between group focus:outline-none ${
                     p ? 'bg-purple-900/20 border-purple-500/50 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'
                 }`}
              >
                 <div className="flex items-center gap-4">
                     <span className={`text-2xl font-black font-serif italic transition-colors ${p ? 'text-white' : 'text-neutral-500'}`}>P</span>
                     <span className={`font-mono text-xs px-2 py-1 rounded ${p ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-neutral-500'}`}>
                         {p ? 'TRUE (1)' : 'FALSE (0)'}
                     </span>
                 </div>
                 <div className={`w-14 h-8 rounded-full p-1 transition-colors ${p ? 'bg-purple-500' : 'bg-neutral-800'}`}>
                    <div className={`w-6 h-6 rounded-full bg-white transition-transform ${p ? 'translate-x-6 shadow-[0_0_10px_white]' : 'translate-x-0'}`} />
                 </div>
              </button>

              {/* Q Toggle (Only visible in Binary Mode) */}
              {mode === 'binary' && (
                  <button
                     onClick={() => setQ(!q)}
                     className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between group focus:outline-none animate-in fade-in slide-in-from-top-2 ${
                         q ? 'bg-purple-900/20 border-purple-500/50 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'
                     }`}
                  >
                     <div className="flex items-center gap-4">
                         <span className={`text-2xl font-black font-serif italic transition-colors ${q ? 'text-white' : 'text-neutral-500'}`}>Q</span>
                         <span className={`font-mono text-xs px-2 py-1 rounded ${q ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-neutral-500'}`}>
                             {q ? 'TRUE (1)' : 'FALSE (0)'}
                         </span>
                     </div>
                     <div className={`w-14 h-8 rounded-full p-1 transition-colors ${q ? 'bg-purple-500' : 'bg-neutral-800'}`}>
                        <div className={`w-6 h-6 rounded-full bg-white transition-transform ${q ? 'translate-x-6 shadow-[0_0_10px_white]' : 'translate-x-0'}`} />
                     </div>
                  </button>
              )}
           </div>
        </div>

        {/* RIGHT PANEL: Connectives */}
        <div className="w-full md:w-2/3 p-6 md:p-8">
           <div className="flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-6">
              <span className="text-purple-500">#</span> {mode === 'unary' ? 'Unary Operators' : 'Binary Connectives'}
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mode === 'binary' ? (
                  <>
                      <LogicCard title="AND" symbol="∧" result={binaryResults.AND} />
                      <LogicCard title="OR" symbol="∨" result={binaryResults.OR} />
                      <LogicCard title="XOR" subtitle="Exclusive" symbol="⊕" result={binaryResults.XOR} />
                      <LogicCard title="NAND" subtitle="Not AND" symbol="⊼" result={binaryResults.NAND} />
                      <LogicCard title="IMPLIES" subtitle="If P, then Q" symbol="⇒" result={binaryResults.IMPLIES} />
                      <LogicCard title="IFF" subtitle="Biconditional" symbol="⇔" result={binaryResults.IFF} />
                  </>
              ) : (
                  <>
                      <LogicCard title="NOT" subtitle="Negation" symbol="¬" result={unaryResults.NOT} isUnary={true} />
                      <LogicCard title="BUFFER" subtitle="Identity" symbol="=" result={unaryResults.BUFFER} isUnary={true} />
                      <LogicCard title="TRUE" subtitle="Tautology" symbol="⊤" result={unaryResults.TRUE} isUnary={true} />
                      <LogicCard title="FALSE" subtitle="Contradiction" symbol="⊥" result={unaryResults.FALSE} isUnary={true} />
                  </>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
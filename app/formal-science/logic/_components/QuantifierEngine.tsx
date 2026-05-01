"use client";
import React, { useState } from 'react';
import { Circle, Square, ArrowRight, CheckCircle2, XCircle, Search, Info } from 'lucide-react';

// --- DATA: The Universe ---
// Set A = "Circles"
// Set B = "Filled Objects"
type Obj = { id: number; isCircle: boolean; isFilled: boolean; region: 'A' | 'B' | 'AB' | 'U' };

const UNIVERSE: Obj[] = [
  // Region A (Circles, Empty)
  { id: 1, isCircle: true, isFilled: false, region: 'A' },
  { id: 2, isCircle: true, isFilled: false, region: 'A' },
  { id: 3, isCircle: true, isFilled: false, region: 'A' },
  // Region AB (Circles, Filled)
  { id: 4, isCircle: true, isFilled: true, region: 'AB' },
  { id: 5, isCircle: true, isFilled: true, region: 'AB' },
  { id: 6, isCircle: true, isFilled: true, region: 'AB' },
  // Region B (Squares, Filled)
  { id: 7, isCircle: false, isFilled: true, region: 'B' },
  { id: 8, isCircle: false, isFilled: true, region: 'B' },
  { id: 9, isCircle: false, isFilled: true, region: 'B' },
  // Region U (Squares, Empty) -> Outside both sets
  { id: 10, isCircle: false, isFilled: false, region: 'U' },
  { id: 11, isCircle: false, isFilled: false, region: 'U' },
  { id: 12, isCircle: false, isFilled: false, region: 'U' },
];

type Step = 1 | 2 | 3 | 4;
type SetOp = 'NONE' | 'A' | 'B' | 'UNION' | 'INTERSECTION' | 'A_MINUS_B';

export default function QuantifierEngine() {
  const [step, setStep] = useState<Step>(1);
  const [activeSetOp, setActiveSetOp] = useState<SetOp>('NONE');
  
  // Quantifier Builder State (Steps 3 & 4)
  const [qType, setQType] = useState<'EXISTS' | 'ALL'>('EXISTS');
  const [qDomain, setQDomain] = useState<'U' | 'A' | 'B'>('U');
  const [qProperty, setQProperty] = useState<'CIRCLE' | 'SQUARE' | 'FILLED' | 'EMPTY'>('FILLED');
  const [evalResult, setEvalResult] = useState<{ isTrue: boolean; highlightIds: number[] } | null>(null);

  // --- LOGIC EVALUATOR ---
  const evaluateStatement = () => {
    // 1. Filter Domain
    const domainObjs = UNIVERSE.filter(obj => {
      if (qDomain === 'U') return true;
      if (qDomain === 'A') return obj.isCircle;
      if (qDomain === 'B') return obj.isFilled;
      return true;
    });

    // 2. Define Property Check
    const checkProperty = (obj: Obj) => {
      if (qProperty === 'CIRCLE') return obj.isCircle;
      if (qProperty === 'SQUARE') return !obj.isCircle;
      if (qProperty === 'FILLED') return obj.isFilled;
      if (qProperty === 'EMPTY') return !obj.isFilled;
      return false;
    };

    // 3. Evaluate based on Quantifier
    if (qType === 'EXISTS') {
      const matchingObjs = domainObjs.filter(checkProperty);
      setEvalResult({
        isTrue: matchingObjs.length > 0,
        highlightIds: matchingObjs.map(o => o.id) // Highlight the ones that prove it's true
      });
    } else if (qType === 'ALL') {
      const failingObjs = domainObjs.filter(o => !checkProperty(o)); // Find counter-examples
      setEvalResult({
        isTrue: failingObjs.length === 0,
        highlightIds: failingObjs.map(o => o.id) // Highlight the counter-examples!
      });
    }
  };

  // --- RENDER HELPERS ---
  const isObjectHighlighted = (obj: Obj) => {
    if (step === 1) return true;
    if (step === 2) {
      if (activeSetOp === 'NONE') return true;
      if (activeSetOp === 'A') return obj.region === 'A' || obj.region === 'AB';
      if (activeSetOp === 'B') return obj.region === 'B' || obj.region === 'AB';
      if (activeSetOp === 'UNION') return obj.region !== 'U';
      if (activeSetOp === 'INTERSECTION') return obj.region === 'AB';
      if (activeSetOp === 'A_MINUS_B') return obj.region === 'A';
      return false;
    }
    if (step === 3 || step === 4) {
      if (!evalResult) return true; // Show all before eval
      return evalResult.highlightIds.includes(obj.id);
    }
    return true;
  };

  const getRegionClass = (region: 'A' | 'B' | 'AB' | 'U') => {
    switch(region) {
        case 'A': return 'col-start-1 col-end-3 row-start-1 row-end-3 justify-self-start self-center ml-12';
        case 'AB': return 'col-start-2 col-end-4 row-start-1 row-end-3 justify-self-center self-center z-10';
        case 'B': return 'col-start-3 col-end-5 row-start-1 row-end-3 justify-self-end self-center mr-12';
        case 'U': return 'col-start-1 col-end-5 row-start-1 row-end-3 justify-self-end self-end mb-4 mr-4';
    }
  };

  return (
    <div className="w-full bg-[#030106] border border-blue-500/20 rounded-3xl overflow-hidden font-sans shadow-2xl flex flex-col min-h-[600px]">
      
      {/* HEADER & STEP PROGRESS */}
      <div className="p-6 border-b border-blue-500/20 bg-[#0a0a0a]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 text-blue-400">
            <Search size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Set & Quantifier Visualizer</h3>
          </div>
          <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
             Module_02 // Interactive
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-900/30 -z-10" />
          {[1, 2, 3, 4].map(s => (
            <button key={s} onClick={() => { setStep(s as Step); setEvalResult(null); setActiveSetOp('NONE'); }} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${step >= s ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-black border-neutral-800 text-neutral-600 hover:border-blue-500/50'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col lg:flex-row flex-1">
        
        {/* LEFT: THE VENN DIAGRAM */}
        <div className="w-full lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-blue-500/20 bg-black/50 relative flex items-center justify-center min-h-[350px]">
           <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">The Universe (U)</div>
           
           {/* Venn Background Circles */}
           <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              {/* Set A Circle */}
              <div className={`absolute w-64 h-64 rounded-full border-2 -ml-32 transition-colors ${activeSetOp === 'A' || activeSetOp === 'UNION' || activeSetOp === 'A_MINUS_B' ? 'bg-blue-500/20 border-blue-400' : 'border-blue-500/30 border-dashed'}`} />
              {/* Set B Circle */}
              <div className={`absolute w-64 h-64 rounded-full border-2 ml-32 transition-colors ${activeSetOp === 'B' || activeSetOp === 'UNION' ? 'bg-cyan-500/20 border-cyan-400' : 'border-cyan-500/30 border-dashed'}`} />
           </div>

           {/* Labels */}
           <div className="absolute top-1/4 left-1/4 text-xs font-bold text-blue-400/50 uppercase tracking-widest">Set A<br/>(Circles)</div>
           <div className="absolute top-1/4 right-1/4 text-xs font-bold text-cyan-400/50 uppercase tracking-widest text-right">Set B<br/>(Filled)</div>

           {/* Objects Grid overlaying the Venn */}
           <div className="grid grid-cols-4 grid-rows-2 w-full max-w-md h-64 relative z-10 gap-2">
              {UNIVERSE.map(obj => {
                const highlighted = isObjectHighlighted(obj);
                return (
                  <div key={obj.id} className={`${getRegionClass(obj.region)} transition-all duration-500 ${highlighted ? 'opacity-100 scale-100' : 'opacity-10 scale-90'}`}>
                    <div className={`flex items-center justify-center ${obj.isFilled ? (obj.isCircle ? 'text-blue-400' : 'text-cyan-400') : 'text-neutral-500'}`}>
                       {obj.isCircle 
                          ? <Circle size={obj.region === 'A' ? 24 : 32} fill={obj.isFilled ? 'currentColor' : 'none'} strokeWidth={3} />
                          : <Square size={obj.region === 'U' ? 20 : 32} fill={obj.isFilled ? 'currentColor' : 'none'} strokeWidth={3} />
                       }
                    </div>
                  </div>
                )
              })}
           </div>
        </div>

        {/* RIGHT: CONTROLS & EXPLANATIONS */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          
          {/* --- STEP 1: INTRO --- */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <h4 className="text-2xl font-black text-white mb-4">The Universe</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Welcome to a logical universe consisting of 12 objects. To make logical statements, we group objects with similar properties into <strong>Sets</strong>.
              </p>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl">
                   <strong className="text-blue-400 block mb-1">Set A</strong>
                   <span className="text-xs text-neutral-300">Contains all objects that are <strong className="text-white">Circles</strong>.</span>
                </div>
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl">
                   <strong className="text-cyan-400 block mb-1">Set B</strong>
                   <span className="text-xs text-neutral-300">Contains all objects that are <strong className="text-white">Filled</strong>.</span>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-colors">
                Next: Set Operations <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* --- STEP 2: SET OPS --- */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <h4 className="text-2xl font-black text-white mb-4">Set Operations</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                We can use logical connectives (AND, OR, NOT) to define new regions in our Venn diagram. Click the operations below to highlight the resulting set.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                 <button onClick={() => setActiveSetOp('INTERSECTION')} className={`p-4 rounded-xl text-left border transition-all ${activeSetOp === 'INTERSECTION' ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/50 border-white/10 hover:border-white/30'}`}>
                    <div className="font-serif text-xl text-white mb-1">A ∩ B</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Intersection (AND)</div>
                 </button>
                 <button onClick={() => setActiveSetOp('UNION')} className={`p-4 rounded-xl text-left border transition-all ${activeSetOp === 'UNION' ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/50 border-white/10 hover:border-white/30'}`}>
                    <div className="font-serif text-xl text-white mb-1">A ∪ B</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Union (OR)</div>
                 </button>
                 <button onClick={() => setActiveSetOp('A_MINUS_B')} className={`p-4 rounded-xl text-left border transition-all ${activeSetOp === 'A_MINUS_B' ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/50 border-white/10 hover:border-white/30'}`}>
                    <div className="font-serif text-xl text-white mb-1">A \ B</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Difference (A NOT B)</div>
                 </button>
                 <button onClick={() => setActiveSetOp('NONE')} className="p-4 rounded-xl text-left border border-white/5 bg-white/5 hover:bg-white/10 text-neutral-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center">
                    Reset View
                 </button>
              </div>
              <button onClick={() => { setStep(3); setActiveSetOp('NONE'); }} className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-colors">
                Next: Existential Quantifier <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* --- STEP 3 & 4: QUANTIFIERS --- */}
          {(step === 3 || step === 4) && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <h4 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                 <span className="font-serif text-3xl text-blue-400">{step === 3 ? '∃' : '∀'}</span> 
                 {step === 3 ? 'There Exists' : 'For All'}
              </h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                {step === 3 
                  ? 'The Existential Quantifier (∃) checks if AT LEAST ONE object in the domain matches your property. Build a sentence and test it!' 
                  : 'The Universal Quantifier (∀) checks if EVERY SINGLE object in the domain matches. A single counter-example makes it FALSE.'}
              </p>

              {/* Sentence Builder */}
              <div className="bg-black/50 border border-blue-500/30 rounded-2xl p-6 mb-6">
                 <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
                    <span className="text-blue-400 font-bold">{step === 3 ? '∃ (There Exists an)' : '∀ (For All)'}</span>
                    <span className="text-neutral-500">object in</span>
                    
                    <select value={qDomain} onChange={(e: any) => {setQDomain(e.target.value); setEvalResult(null);}} className="bg-neutral-900 border border-neutral-700 text-white rounded px-2 py-1 outline-none focus:border-blue-500">
                      <option value="U">The Universe</option>
                      <option value="A">Set A (Circles)</option>
                      <option value="B">Set B (Filled)</option>
                    </select>

                    <span className="text-neutral-500">that is</span>

                    <select value={qProperty} onChange={(e: any) => {setQProperty(e.target.value); setEvalResult(null);}} className="bg-neutral-900 border border-neutral-700 text-white rounded px-2 py-1 outline-none focus:border-blue-500">
                      <option value="FILLED">Filled</option>
                      <option value="EMPTY">Empty</option>
                      <option value="CIRCLE">a Circle</option>
                      <option value="SQUARE">a Square</option>
                    </select>
                 </div>

                 <button onClick={evaluateStatement} className="w-full mt-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-bold uppercase tracking-widest rounded-lg transition-colors">
                    Evaluate Statement
                 </button>
              </div>

              {/* Evaluation Results */}
              <div className="min-h-[100px]">
                {evalResult && (
                  <div className={`p-4 rounded-xl border flex items-start gap-4 animate-in zoom-in-95 ${evalResult.isTrue ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-red-950/30 border-red-500/50'}`}>
                     {evalResult.isTrue ? <CheckCircle2 className="text-emerald-400 shrink-0" /> : <XCircle className="text-red-400 shrink-0" />}
                     <div>
                       <strong className={`block text-lg font-black uppercase tracking-widest mb-1 ${evalResult.isTrue ? 'text-emerald-400' : 'text-red-400'}`}>
                         STATEMENT IS {evalResult.isTrue ? 'TRUE' : 'FALSE'}
                       </strong>
                       <p className="text-xs text-neutral-300">
                         {evalResult.isTrue 
                           ? step === 3 ? "Found at least one matching object! (Highlighted in diagram)" : "Every object in the domain matches the rule! (Highlighted in diagram)"
                           : step === 3 ? "Could not find a single object that matches." : "Found counter-examples that break the rule! (Highlighted in diagram)"
                         }
                       </p>
                     </div>
                  </div>
                )}
              </div>

              {step === 3 && (
                <button onClick={() => { setStep(4); setQType('ALL'); setEvalResult(null); }} className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-colors">
                  Next: Universal Quantifier <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
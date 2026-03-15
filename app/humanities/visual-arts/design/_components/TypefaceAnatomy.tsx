"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Microscope, Maximize, Info, MousePointer, PenTool } from 'lucide-react';

type ViewMode = 'macro' | 'micro';
type MacroMetric = 'cap' | 'xheight' | 'baseline' | 'descender';
type MicroPart = 'stem' | 'bowl' | 'leg' | 'serif';

export default function TypefaceAnatomy() {
  const [viewMode, setViewMode] = useState<ViewMode>('macro');
  const [font, setFont] = useState<'serif' | 'sans'>('serif');
  const [activePart, setActivePart] = useState<string | null>(null);
  const [displayWord, setDisplayWord] = useState<string>('Sphinx'); // Dynamic Input

  // ========================================================================
  // 1. DATA REPOSITORY: Anatomical Definitions
  // ========================================================================

  // --- MACRO VIEW DATA (Structural Lines - Based on 'Sphinx') ---
  const metrics = {
    cap: { top: '38%', color: 'border-sky-500 text-sky-600', bg: 'bg-sky-100', label: 'Cap Height', desc: 'The height of a capital letter above the baseline.' },
    xheight: { top: '44.5%', color: 'border-emerald-500 text-emerald-600', bg: 'bg-emerald-100', label: 'X-Height', desc: 'The height of lowercase letters, specifically the letter x.' },
    baseline: { top: '59%', color: 'border-red-500 text-red-600', bg: 'bg-red-100', label: 'Baseline', desc: 'The invisible line where all characters sit.' },
    descender: { top: '66%', color: 'border-amber-500 text-amber-600', bg: 'bg-amber-100', label: 'Descender', desc: 'The portion of a letter that extends below the baseline.' }
  };

  // --- MICRO VIEW DATA (Letter Anatomy for 'R') ---
  const parts = {
    stem: { name: "The Stem", desc: "The main, usually vertical stroke of a letterform.", color: "bg-yellow-500", borderColor: "border-yellow-500" },
    bowl: { name: "The Bowl", desc: "The curved part of the character that encloses the circular or curved parts (counter).", color: "bg-blue-500", borderColor: "border-blue-500" },
    leg: { name: "The Leg", desc: "The lower, downward sloping stroke of a letter (like in R or K).", color: "bg-purple-500", borderColor: "border-purple-500" },
    serif: { name: "The Serif", desc: "The decorative stroke at the end of a stem. Originates from Roman stone carving techniques.", color: "bg-red-500", borderColor: "border-red-500" },
  };

  // TypeScript fix for safe indexing
  const activeMacroData = viewMode === 'macro' && activePart ? metrics[activePart as MacroMetric] : null;
  const activeMicroData = viewMode === 'micro' && activePart ? parts[activePart as MicroPart] : null;

  return (
    <div className="w-full bg-stone-100 border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row min-h-[500px] font-sans">
      
      {/* ----------------------------------------------------- */}
      {/* LEFT PANEL: CONTROLS & INSPECTOR                      */}
      {/* ----------------------------------------------------- */}
      <div className="w-full md:w-[350px] border-b md:border-b-0 md:border-r-4 border-black p-6 flex flex-col bg-white shrink-0">
          
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                  <Type size={20} />
                  <span className="font-black text-xl uppercase tracking-tighter">Type Lab</span>
              </div>
          </div>
          
          {/* CONTROL SECTION */}
          <div className="space-y-4 mb-8">
              {/* Text Input Terminal */}
              <div>
                  <label htmlFor="typeText" className="text-xs font-black uppercase text-stone-500 mb-1 flex gap-2 items-center">
                      <PenTool size={14} className="text-red-600"/> Subject Input Terminal
                  </label>
                  <input 
                    type="text" 
                    id="typeText"
                    value={displayWord} 
                    onChange={(e) => setDisplayWord(e.target.value)} 
                    placeholder="Enter text..." 
                    className="w-full font-serif text-lg p-3 bg-stone-100 border-2 border-black rounded-sm shadow-inner placeholder:text-stone-400 focus:ring-2 focus:ring-black outline-none"
                  />
                  <div className="text-[10px] font-mono text-stone-400 mt-1 italic leading-snug">
                    Analysis logic is canonical. Macro guidelines apply universally. Micro-points are hard-mapped for 'R' example.
                  </div>
              </div>

              {/* View Toggles */}
              <div className="flex gap-2 bg-stone-200 p-1 border-2 border-black">
                  <button onClick={() => { setViewMode('macro'); setActivePart(null); }} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'macro' ? 'bg-black text-white shadow-sm' : 'text-stone-500 hover:text-black'}`} >
                      <Maximize size={14} /> Macro
                  </button>
                  <button onClick={() => { setViewMode('micro'); setActivePart(null); }} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'micro' ? 'bg-black text-white shadow-sm' : 'text-stone-500 hover:text-black'}`} >
                      <Microscope size={14} /> Micro
                  </button>
              </div>

              {/* Font Style Toggles (Micro mode only) */}
              <AnimatePresence>
                {viewMode === 'micro' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-2" >
                        <button onClick={() => setFont('serif')} className={`flex-1 py-1.5 text-xs font-bold border-2 border-black transition-all ${font === 'serif' ? 'bg-black text-white' : 'bg-transparent hover:bg-stone-200'}`}>
                            Serif
                        </button>
                        <button onClick={() => setFont('sans')} className={`flex-1 py-1.5 text-xs font-bold border-2 border-black transition-all ${font === 'sans' ? 'bg-black text-white' : 'bg-transparent hover:bg-stone-200'}`}>
                            Sans
                        </button>
                    </motion.div>
                )}
              </AnimatePresence>
          </div>

          {/* INSPECTOR PANEL */}
          <div className="flex-1 mt-auto">
              <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 border-b-2 border-stone-200 pb-2 flex items-center gap-2">
                 <Info size={12} /> Inspector Data
              </div>
              
              {activePart ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-stone-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                      {activeMacroData && (
                          <>
                              <div className={`inline-block px-2 py-1 mb-2 text-[10px] font-black uppercase tracking-widest border-2 ${activeMacroData.color.split(' ')[0]} ${activeMacroData.bg}`}>
                                  STRUCTURAL LINE
                              </div>
                              <h3 className="font-black text-xl mb-2">{activeMacroData.label}</h3>
                              <p className="text-sm text-stone-600 leading-relaxed font-medium">{activeMacroData.desc}</p>
                          </>
                      )}
                      {activeMicroData && (
                          <>
                              <div className={`w-3 h-3 ${activeMicroData.color} mb-3 border-2 border-black`} />
                              <h3 className="font-black text-xl mb-2">{activeMicroData.name}</h3>
                              <p className="text-sm text-stone-600 leading-relaxed font-medium">{activeMicroData.desc}</p>
                          </>
                      )}
                  </motion.div>
              ) : (
                  <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-stone-300 text-stone-400 text-xs text-center p-4">
                      <MousePointer size={50} className="mb-2 opacity-50" />
                      Hover over the typography to analyze its anatomy.
                  </div>
              )}
          </div>
          
          <div className="text-[9px] font-mono text-stone-400 mt-6 pt-4 border-t-2 border-stone-200 leading-snug">
              FIG. {viewMode === 'macro' ? '1: STRUCTURAL GUIDELINES' : `2: ${font.toUpperCase()} ANATOMY (Hardmapped for 'R' example)`}
          </div>
      </div>

      {/* ----------------------------------------------------- */}
      {/* RIGHT PANEL: THE VISUAL STAGE                         */}
      {/* ----------------------------------------------------- */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none" />

          {/* === MACRO STAGE (Universal Analysis on full word) === */}
          {viewMode === 'macro' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                  
                  {/* The Guidelines */}
                  {(Object.keys(metrics) as MacroMetric[]).map((key) => {
                      const data = metrics[key];
                      return (
                          <div 
                              key={key}
                              onMouseEnter={() => setActivePart(key)}
                              onMouseLeave={() => setActivePart(null)}
                              className={`absolute left-0 right-0 border-t-[16px] cursor-row-resize transition-all duration-300 z-20 
                                  ${activePart === key ? `${data.color.split(' ')[0]} border-solid bg-transparent` : 'border-transparent hover:border-stone-200'}
                              `}
                              style={{ top: `calc(${data.top} - 8px)` }}
                          >
                              {/* The precision 1px guideline inside the larger hover hitbox */}
                              <div className={`absolute left-0 right-0 h-px top-1/2 -translate-y-1/2 ${activePart === key ? data.bg.replace('100', '400') : 'bg-stone-200 border-dashed'}`} />
                          </div>
                      );
                  })}

                  {/* The Word */}
                                    <h2 className="text-[100px] lg:text-[160px] font-serif tracking-tight leading-none text-black select-none z-10 pointer-events-none">
                      {displayWord || 'Sphinx'}
                  </h2>
              </div>
          )}

          {/* === MICRO STAGE (Dissection of single canonical 'R') === */}
          {viewMode === 'micro' && (
              <div className={`relative text-[300px] lg:text-[400px] leading-none select-none ${font === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>
                  
                  <span className="text-black/5 absolute inset-0 blur-[2px] transform translate-x-6 translate-y-6 pointer-events-none">R</span>
                  <span className="relative z-10 text-stone-900 pointer-events-none">R</span>

                  {/* INTERACTIVE HITBOX ZONES */}
                  
                  {/* Stem */}
                  <div 
                      onMouseEnter={() => setActivePart('stem')} onMouseLeave={() => setActivePart(null)}
                      className="absolute left-[15%] top-[10%] w-[20%] h-[80%] cursor-help group z-20"
                  >
                      <div className={`w-full h-full transition-all duration-300 border-4 border-dashed rounded-sm ${activePart === 'stem' ? `${parts.stem.color.replace('500', '500/30')} ${parts.stem.borderColor} border-solid` : 'border-transparent hover:border-stone-300'}`} />
                  </div>

                  {/* Bowl */}
                  <div 
                      onMouseEnter={() => setActivePart('bowl')} onMouseLeave={() => setActivePart(null)}
                      className="absolute right-[10%] top-[10%] w-[50%] h-[45%] rounded-r-full cursor-help group z-20"
                  >
                      <div className={`w-full h-full transition-all duration-300 border-4 border-dashed rounded-r-[100px] ${activePart === 'bowl' ? `${parts.bowl.color.replace('500', '500/30')} ${parts.bowl.borderColor} border-solid` : 'border-transparent hover:border-stone-300'}`} />
                  </div>

                  {/* Leg */}
                  <div 
                      onMouseEnter={() => setActivePart('leg')} onMouseLeave={() => setActivePart(null)}
                      className="absolute right-[15%] bottom-[5%] w-[35%] h-[40%] cursor-help group z-20"
                  >
                      <div className={`w-full h-full transition-all duration-300 border-4 border-dashed rounded-sm ${activePart === 'leg' ? `${parts.leg.color.replace('500', '500/30')} ${parts.leg.borderColor} border-solid` : 'border-transparent hover:border-stone-300'}`} />
                  </div>

                  {/* Serif Base (Conditional on Serif mode) */}
                  {font === 'serif' && (
                      <div 
                          onMouseEnter={() => setActivePart('serif')} onMouseLeave={() => setActivePart(null)}
                          className="absolute left-[8%] bottom-[8%] w-[35%] h-[12%] cursor-help group z-30"
                      >
                          <div className={`w-full h-full transition-all duration-300 border-4 border-dashed rounded-sm ${activePart === 'serif' ? `${parts.serif.color.replace('500', '500/30')} ${parts.serif.borderColor} border-solid` : 'border-transparent hover:border-stone-300'}`} />
                      </div>
                  )}
              </div>
          )}
      </div>

    </div>
  );
}
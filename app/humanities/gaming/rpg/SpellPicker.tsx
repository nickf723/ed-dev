"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Scroll, Info, CheckCircle, Circle } from "lucide-react";
import { Spell } from "./useDnD";

interface Props {
  spells: Spell[];
  knownSpells: string[];
  onToggle: (spell: Spell) => void;
  maxSpells: number;
}

export default function SpellPicker({ spells, knownSpells, onToggle, maxSpells }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-[#1a181c] border border-stone-800 rounded-xl p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                <Sparkles size={14} /> Spellbook
            </h3>
            <div className="text-xs font-mono text-stone-500">
                {knownSpells.length} / {maxSpells} Memorized
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
            {spells.length === 0 && (
                <div className="text-center py-10 text-stone-600 text-xs uppercase tracking-widest">
                    No spells available for this class.
                </div>
            )}
            
            {spells.map((spell) => {
                const isKnown = knownSpells.includes(spell.name);
                const isExpanded = expanded === spell.index;

                return (
                    <div 
                        key={spell.index}
                        className={`
                            border rounded-lg transition-all duration-300
                            ${isKnown ? "bg-blue-900/20 border-blue-500/50" : "bg-black/40 border-white/5 hover:border-white/20"}
                        `}
                    >
                        <div className="p-3 flex items-center gap-3 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : spell.index)}>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onToggle(spell); }}
                                disabled={!isKnown && knownSpells.length >= maxSpells}
                                className={`shrink-0 ${!isKnown && knownSpells.length >= maxSpells ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 transition-transform'}`}
                            >
                                {isKnown ? <CheckCircle size={18} className="text-blue-400" /> : <Circle size={18} className="text-stone-600" />}
                            </button>
                            
                            <div className="flex-1">
                                <div className={`text-sm font-bold ${isKnown ? 'text-white' : 'text-stone-400'}`}>{spell.name}</div>
                                <div className="text-[10px] text-stone-600 font-mono uppercase">Lvl {spell.level} • {spell.range}</div>
                            </div>
                            
                            <Info size={14} className={`text-stone-600 ${isExpanded ? 'text-blue-400' : ''}`} />
                        </div>

                        {/* Description Reveal */}
                        {isExpanded && (
                            <div className="p-3 pt-0 border-t border-white/5 mt-2 text-xs text-stone-400 leading-relaxed font-serif">
                                <div className="mb-2 text-blue-300/50 text-[10px] font-sans uppercase">{spell.duration}</div>
                                {spell.desc}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  );
}
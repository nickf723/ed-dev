"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Brain, Cpu, Dna, Globe, Zap, RefreshCcw, Plus, ArrowRight, Satellite } from "lucide-react";

// Elements available to mix
const ELEMENTS = [
  { id: "bio", label: "Biology", Icon: Dna, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { id: "tech", label: "Tech", Icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { id: "mind", label: "Mind", Icon: Brain, color: "text-purple-400", bg: "bg-purple-500/20" },
  { id: "physics", label: "Physics", Icon: Atom, color: "text-indigo-400", bg: "bg-indigo-500/20" },
  { id: "society", label: "Society", Icon: Globe, color: "text-blue-400", bg: "bg-blue-500/20" },
  { id: "chem", label: "Chemistry", Icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/20" },
  { id: "astro", label: "Astronomy", Icon: Satellite, color: "text-purple-400", bg: "bg-purple-500/20" },
];

// Recipes for synthesis
const RECIPES: Record<string, { name: string; desc: string }> = {
  "bio-tech": { name: "Bioengineering", desc: "Designing biological systems." },
  "tech-bio": { name: "Bioengineering", desc: "Designing biological systems." },
  
  "mind-tech": { name: "Cognitive Science", desc: "AI & Computational Mind." },
  "tech-mind": { name: "Cognitive Science", desc: "AI & Computational Mind." },

  "bio-chem": { name: "Biochemistry", desc: "Chemical processes in life." },
  "chem-bio": { name: "Biochemistry", desc: "Chemical processes in life." },

  "physics-bio": { name: "Biophysics", desc: "Physics of biological function." },
  "bio-physics": { name: "Biophysics", desc: "Physics of biological function." },

  "society-mind": { name: "Social Psych", desc: "Group behavior & influence." },
  "mind-society": { name: "Social Psych", desc: "Group behavior & influence." },

  "physics-tech": { name: "Engineering", desc: "Applied physics." }, 
  "tech-physics": { name: "Engineering", desc: "Applied physics." },
  
  "physics-chem": { name: "Physical Chem", desc: "Atomic/Subatomic behavior." },
  "chem-physics": { name: "Physical Chem", desc: "Atomic/Subatomic behavior." },

  "astro-physics": { name: "Astrophysics", desc: "Physics of the cosmos." },
  "physics-astro": { name: "Astrophysics", desc: "Physics of the cosmos." },

  "astro-bio": { name: "Astrobiology", desc: "Life in the universe." },
  "bio-astro": { name: "Astrobiology", desc: "Life in the universe." },
};

export default function FusionReactor() {
  const [slot1, setSlot1] = useState<string | null>(null);
  const [slot2, setSlot2] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (!slot1) setSlot1(id);
    else if (!slot2 && id !== slot1) setSlot2(id);
  };

  const reset = () => {
    setSlot1(null);
    setSlot2(null);
  };

  const getResult = () => {
    if (slot1 && slot2) {
      const key = `${slot1}-${slot2}`;
      return RECIPES[key] || { name: "Unknown Alloy", desc: "Research pending..." };
    }
    return null;
  };

  const result = getResult();

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <RefreshCcw size={14} className="text-lime-400" /> Fusion Reactor
        </h3>
        {(slot1 || slot2) && (
            <button onClick={reset} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold">
                Eject
            </button>
        )}
      </div>

      {/* Visualization Area */}
      <div className="p-6 flex flex-col items-center justify-center min-h-[140px] bg-neutral-950/50 relative">
        <div className="flex items-center gap-4 z-10">
            {/* Slot 1 */}
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${slot1 ? "border-white bg-white/10" : "border-neutral-800 border-dashed"}`}>
                {slot1 ? <SlotIcon id={slot1} /> : <span className="text-neutral-700 text-xs">A</span>}
            </div>
            <Plus size={16} className="text-neutral-600" />
            {/* Slot 2 */}
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${slot2 ? "border-white bg-white/10" : "border-neutral-800 border-dashed"}`}>
                {slot2 ? <SlotIcon id={slot2} /> : <span className="text-neutral-700 text-xs">B</span>}
            </div>
        </div>

        {/* Result Output */}
        <AnimatePresence>
            {result && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-bold uppercase text-lime-400 mb-2">
                        <Zap size={12} /> Synthesis Complete
                    </div>
                    <h4 className="text-lg font-bold text-white">{result.name}</h4>
                    <p className="text-xs text-neutral-400">{result.desc}</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-neutral-900">
        {ELEMENTS.map((el) => {
            const isSelected = slot1 === el.id || slot2 === el.id;
            const isDisabled = (slot1 && slot2) && !isSelected;
            
            return (
                <button
                    key={el.id}
                    onClick={() => !isSelected && !isDisabled && handleSelect(el.id)}
                    disabled={isDisabled || isSelected}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all border border-transparent
                        ${isSelected ? "bg-white/10 border-white/20 opacity-50 cursor-default" : "hover:bg-white/5 hover:border-white/10"}
                        ${isDisabled ? "opacity-20 cursor-not-allowed" : "opacity-100"}
                    `}
                >
                    <el.Icon size={18} className={el.color} />
                    <span className="text-[10px] font-medium text-neutral-400">{el.label}</span>
                </button>
            );
        })}
      </div>
    </div>
  );
}

function SlotIcon({ id }: { id: string }) {
    const el = ELEMENTS.find(e => e.id === id);
    if (!el) return null;
    return <el.Icon size={20} className={el.color} />;
}
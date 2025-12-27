"use client";
import { useState } from "react";
import { ArrowRightLeft, Binary, Quote } from "lucide-react";
import { M } from "@/components/Math"; // Import the math renderer

const EXAMPLES = [
  { 
    natural: "If it rains, then the ground is wet.", 
    logic: "R \\implies W",
    desc: "Implication"
  },
  { 
    natural: "All humans are mortal.", 
    logic: "\\forall x (H(x) \\implies M(x))",
    desc: "Universal Quantifier"
  },
  { 
    natural: "Someone is lying.", 
    logic: "\\exists x (L(x))",
    desc: "Existential Quantifier"
  },
  { 
    natural: "You can have cake OR ice cream (but not both).", 
    logic: "C \\oplus I",
    desc: "Exclusive OR (XOR)"
  }
];

export default function SymbolTranslator() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % EXAMPLES.length);
  const current = EXAMPLES[index];

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Binary size={14} className="text-cyan-400" /> Formalizer
        </h3>
        <button onClick={next} className="text-neutral-500 hover:text-white transition-colors">
            <ArrowRightLeft size={14} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Natural Language */}
        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
            <div className="flex gap-2 mb-1">
                <Quote size={12} className="text-neutral-600" />
                <span className="text-[10px] uppercase font-bold text-neutral-500">Natural Language</span>
            </div>
            <p className="text-sm text-neutral-300 italic font-serif">"{current.natural}"</p>
        </div>

        <div className="flex justify-center">
             <div className="h-6 w-[1px] bg-cyan-500/30"></div>
        </div>

        {/* Symbolic Logic */}
        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-8 h-8 bg-cyan-500/20 blur-lg rounded-full"></div>
            
            <div className="flex gap-2 mb-1">
                <Binary size={12} className="text-cyan-500" />
                <span className="text-[10px] uppercase font-bold text-cyan-500">Symbolic Form</span>
            </div>
            
            {/* Render with LaTeX Component */}
            <div className="flex justify-center py-2">
                <span className="text-lg font-bold text-cyan-200">
                    <M>{current.logic}</M>
                </span>
            </div>
            
            <div className="text-[10px] text-right text-cyan-400/60 uppercase tracking-wider">
                Type: {current.desc}
            </div>
        </div>
      </div>
    </div>
  );
}
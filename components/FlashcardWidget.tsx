"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glossaryTerms, GlossaryTermKey } from "@/lib/glossary-db"; // Import your DB
import { BrainCircuit, RefreshCw, Eye, Check } from "lucide-react";

export default function FlashcardWidget() {
  const terms = Object.keys(glossaryTerms) as GlossaryTermKey[];
  const [currentTerm, setCurrentTerm] = useState<GlossaryTermKey | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Hydration fix: pick random term on mount
  useEffect(() => {
    pickRandom();
  }, []);

  const pickRandom = () => {
    setIsRevealed(false);
    const random = terms[Math.floor(Math.random() * terms.length)];
    setCurrentTerm(random);
  };

  if (!currentTerm) return null;

  const definition = glossaryTerms[currentTerm].definition;
  const category = glossaryTerms[currentTerm].category;

  return (
    <div className="glass overflow-hidden rounded-xl border border-cyan-500/20 bg-neutral-900/80 backdrop-blur-xl">
      {/* Header */}
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
          <BrainCircuit size={14} /> Knowledge Check
        </h3>
        <button 
            onClick={pickRandom}
            className="text-neutral-500 hover:text-cyan-400 transition-colors"
        >
            <RefreshCw size={14} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col items-center text-center min-h-[200px] justify-center">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentTerm} // Triggers animation on change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-full"
            >
                <span className="inline-block mb-3 rounded-full bg-cyan-950 border border-cyan-900 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                    {category}
                </span>
                
                <h4 className="text-xl font-black text-white mb-6">
                    {currentTerm}
                </h4>

                {/* Interaction Area */}
                {!isRevealed ? (
                    <button
                        onClick={() => setIsRevealed(true)}
                        className="group flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/50 py-3 text-sm font-bold text-neutral-300 hover:bg-cyan-900/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                    >
                        <Eye size={16} /> Reveal Definition
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neutral-950/50 p-4 rounded-lg border border-white/5"
                    >
                        <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                            {definition}
                        </p>
                        <button
                            onClick={pickRandom}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-cyan-500 transition-colors"
                        >
                            <Check size={14} /> Next Card
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
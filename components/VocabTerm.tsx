"use client";
import React, { useState } from "react";
import { vocabDatabase, VocabKey } from "@/lib/vocab-db";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Info } from "lucide-react";

type VocabTermProps = {
  id: VocabKey;
  children: React.ReactNode;
};

export default function VocabTerm({ id, children }: VocabTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const entry = vocabDatabase[id];

  if (!entry) {
    console.warn(`Vocab term "${id}" not found.`);
    return <span className="text-red-500 line-through">{children}</span>;
  }

  return (
    <span className="relative inline-block">
      {/* Trigger Word */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer border-b-2 border-pink-500/30 hover:border-pink-500 text-pink-200 transition-colors"
        aria-expanded={isOpen}
        aria-label={`Definition of ${entry.native}`}
      >
        {children}
      </button>

      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64"
          >
            <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/95 shadow-2xl backdrop-blur-xl">
                
                {/* Header: Native & IPA */}
                <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex justify-between items-start">
                    <div>
                        <h4 className="text-lg font-bold text-white leading-none mb-1">{entry.native}</h4>
                        <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
                            <span>{entry.ipa}</span>
                            <Volume2 size={10} className="opacity-70" />
                        </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 bg-black/30 px-1.5 py-0.5 rounded">
                        {entry.lang}
                    </span>
                </div>

                {/* Body: Meaning & Root */}
                <div className="p-4 space-y-3">
                    <div>
                        <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider block mb-0.5">Meaning</span>
                        <p className="text-sm text-neutral-200 font-medium leading-snug">
                            {entry.translation}
                        </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        {entry.root && (
                            <div>
                                <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider block mb-0.5">Origin</span>
                                <p className="text-xs text-neutral-400 italic">
                                    {entry.root}
                                </p>
                            </div>
                        )}
                        <span className="text-[9px] font-mono text-neutral-600 border border-neutral-800 px-1 rounded">
                            {entry.type}
                        </span>
                    </div>
                </div>

            </div>
            
            {/* Triangle Pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45 -mt-1.5"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
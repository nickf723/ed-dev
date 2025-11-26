"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { glossaryTerms } from "@/lib/glossary-db";
import { AXIOM_LIBRARY } from "@/lib/axiom-db";
import { Sun, Calendar, Quote, Lightbulb } from "lucide-react";

export default function DailyNexus() {
  const [dailyTerm, setDailyTerm] = useState<any>(null);
  const [dailyAxiom, setDailyAxiom] = useState<any>(null);

  useEffect(() => {
    // Seed random generator with today's date string (e.g., "2023-10-27")
    const dateStr = new Date().toISOString().split('T')[0];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0; 
    }
    const seed = Math.abs(hash);

    // Pick Term
    const termKeys = Object.keys(glossaryTerms);
    const termKey = termKeys[seed % termKeys.length];
    setDailyTerm({ key: termKey, ...glossaryTerms[termKey as keyof typeof glossaryTerms] });

    // Pick Axiom
    const axiom = AXIOM_LIBRARY[seed % AXIOM_LIBRARY.length];
    setDailyAxiom(axiom);

  }, []);

  if (!dailyTerm) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Header Card */}
        <div className="md:col-span-2 rounded-2xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-white/10 p-6 relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Sun size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Daily Briefing</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <p className="text-sm text-cyan-200/70">
                    System status optimal. Knowledge base expanding.
                </p>
            </div>
            <Calendar className="text-white/5 absolute right-6 top-1/2 -translate-y-1/2" size={120} />
        </div>

        {/* Word of the Day */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="group rounded-xl border border-white/10 bg-neutral-900/60 p-6 hover:border-pink-500/30 transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-pink-400">
                    <Quote size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Term of the Day</span>
                </div>
                <span className="text-[10px] text-neutral-600 bg-white/5 px-2 py-1 rounded">{dailyTerm.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{dailyTerm.key}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-serif italic">
                "{dailyTerm.definition}"
            </p>
        </motion.div>

        {/* Law of the Day */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="group rounded-xl border border-white/10 bg-neutral-900/60 p-6 hover:border-violet-500/30 transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-violet-400">
                    <Lightbulb size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Principle of the Day</span>
                </div>
                <span className="text-[10px] text-neutral-600 bg-white/5 px-2 py-1 rounded">{dailyAxiom.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{dailyAxiom.title}</h3>
            <div className="bg-black/30 rounded p-3 mb-3 font-mono text-xs text-violet-200 border border-white/5 text-center">
                {dailyAxiom.formula || "No Formula"}
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
                {dailyAxiom.desc}
            </p>
        </motion.div>

    </div>
  );
}
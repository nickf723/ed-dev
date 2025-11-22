"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignLeft, ArrowRight, Settings2, Shuffle } from "lucide-react";

type SyntaxType = "SVO" | "SOV" | "VSO";

const EXAMPLES: Record<SyntaxType, { label: string; sentence: string; lang: string }> = {
  "SVO": { label: "Subject-Verb-Object", sentence: "The cat [eats] the fish.", lang: "English, Spanish, Mandarin" },
  "SOV": { label: "Subject-Object-Verb", sentence: "The cat the fish [eats].", lang: "Japanese, Korean, Turkish" },
  "VSO": { label: "Verb-Subject-Object", sentence: "[Eats] the cat the fish.", lang: "Arabic, Irish, Filipino" },
};

export default function GrammarWidget() {
  const [order, setOrder] = useState<SyntaxType>("SVO");
  const [morphology, setMorphology] = useState<"analytic" | "synthetic">("analytic");

  const current = EXAMPLES[order];

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Settings2 size={14} className="text-lime-400" /> Universal Grammar
        </h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Order Selector */}
        <div>
            <label className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Word Order</label>
            <div className="flex bg-neutral-950 rounded-lg p-1 border border-white/5">
                {(Object.keys(EXAMPLES) as SyntaxType[]).map((key) => (
                    <button
                        key={key}
                        onClick={() => setOrder(key)}
                        className={`flex-1 py-2 rounded-md text-[10px] font-bold transition-all
                            ${order === key 
                                ? "bg-lime-500/20 text-lime-400 shadow" 
                                : "text-neutral-500 hover:text-neutral-300"}
                        `}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>

        {/* Visualizer */}
        <div className="rounded-xl bg-neutral-950/50 border border-white/5 p-4">
             <div className="flex items-center justify-center gap-2 mb-4 font-mono text-sm text-white">
                {/* We animate the parts swapping */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={order}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                        {current.sentence.split(" ").map((word, i) => (
                            <span key={i} className={word.startsWith("[") ? "text-lime-400 font-bold" : ""}>
                                {word.replace(/[\[\]]/g, "")}{" "}
                            </span>
                        ))}
                    </motion.span>
                </AnimatePresence>
             </div>
             <div className="flex items-start gap-2 text-[10px] text-neutral-500">
                <span className="text-lime-600">Used In:</span>
                <span>{current.lang}</span>
             </div>
        </div>

        {/* Morphology Toggle */}
        <div>
            <label className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Morphology</label>
            <button
                onClick={() => setMorphology(morphology === "analytic" ? "synthetic" : "analytic")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-lime-500/30 transition-colors"
            >
                <span className={`text-xs font-bold ${morphology === "analytic" ? "text-white" : "text-neutral-500"}`}>Analytic (Isolated)</span>
                <Shuffle size={14} className="text-neutral-600" />
                <span className={`text-xs font-bold ${morphology === "synthetic" ? "text-white" : "text-neutral-500"}`}>Synthetic (Fused)</span>
            </button>
            <p className="mt-2 text-[10px] text-neutral-500 leading-relaxed">
                {morphology === "analytic" 
                    ? "Words are separate. Grammar is handled by word order and particles (e.g., English, Mandarin)."
                    : "Words are fused. One word can contain an entire sentence's worth of information (e.g., Turkish, Swahili)."}
            </p>
        </div>

      </div>
    </div>
  );
}
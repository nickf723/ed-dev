"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Percent, Layers } from "lucide-react";

export default function ProbabilityEngine() {
  const [deckSize, setDeckSize] = useState(60);
  const [copies, setCopies] = useState(4);
  const [draws, setDraws] = useState(7); // Opening Hand

  // Hypergeometric calculation for P(X >= 1)
  // Probability of drawing at least one copy of the card
  const calculateProb = () => {
    // Population (N) = deckSize
    // Successes in Population (k) = copies
    // Sample Size (n) = draws
    
    // It's easier to calculate P(X = 0) and subtract from 1
    // P(X=0) = (Combinations of Non-Successes choose n) / (Combinations of Total choose n)
    
    if (draws > deckSize) return 100;
    if (copies > deckSize) return 100;
    
    let probFail = 1;
    // Calculate prob of MISSING the card 'draws' times in a row
    for (let i = 0; i < draws; i++) {
        const cardsLeft = deckSize - i;
        const nonHitsLeft = (deckSize - copies) - i;
        probFail *= (nonHitsLeft / cardsLeft);
    }
    
    return ((1 - probFail) * 100).toFixed(1);
  };

  const prob = calculateProb();

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Calculator size={14} className="text-amber-400" /> Hypergeometric Calc
        </h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Result */}
        <div className="text-center bg-neutral-950/50 rounded-lg border border-white/5 py-6">
            <span className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Odds of finding card</span>
            <div className="flex items-baseline justify-center gap-1">
                <motion.span 
                    key={prob}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-amber-400"
                >
                    {prob}%
                </motion.span>
            </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
            <InputRow label="Deck Size" val={deckSize} set={setDeckSize} min={40} max={100} />
            <InputRow label="Copies in Deck" val={copies} set={setCopies} min={1} max={40} />
            <InputRow label="Cards Drawn" val={draws} set={setDraws} min={1} max={20} />
        </div>
        
        <div className="pt-4 border-t border-white/5 text-[10px] text-neutral-500 leading-relaxed">
            This math determines how many lands to run (consistency) and whether you can rely on drawing your "combo piece" by turn 3.
        </div>

      </div>
    </div>
  );
}

function InputRow({ label, val, set, min, max }: any) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500">
                <span>{label}</span>
                <span className="text-white font-mono">{val}</span>
            </div>
            <input 
                type="range" min={min} max={max} value={val} 
                onChange={(e) => set(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
        </div>
    );
}
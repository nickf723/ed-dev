"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Shield, Zap, Layers, Star } from "lucide-react";

const ZONES = [
  { id: "cost", label: "Mana Cost", x: 85, y: 8, w: 10, h: 5, desc: "What you must pay to cast the spell. Colors dictate identity." },
  { id: "type", label: "Type Line", x: 5, y: 58, w: 90, h: 5, desc: "Card Type (Creature, Instant) and Subtype (Goblin, Arcane)." },
  { id: "text", label: "Rules Text", x: 5, y: 65, w: 90, h: 25, desc: "The card's abilities. 'Oracle Text' is the final authority." },
  { id: "pt", label: "Power/Toughness", x: 80, y: 92, w: 15, h: 5, desc: "Damage dealt (Power) and damage required to kill it (Toughness)." },
  { id: "set", label: "Expansion Symbol", x: 90, y: 60, w: 5, h: 5, desc: "The set the card is from. Color indicates Rarity." }
];

export default function CardAnatomyWidget() {
  const [activeZone, setActiveZone] = useState<typeof ZONES[0] | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Info size={14} className="text-amber-400" /> Card Anatomy
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Card Schematic */}
        <div className="relative w-[200px] aspect-[2.5/3.5] bg-neutral-800 rounded-lg border-2 border-neutral-600 shadow-2xl mb-6 overflow-hidden group">
            
            {/* Art Placeholder */}
            <div className="absolute top-[10%] left-[5%] right-[5%] h-[45%] bg-neutral-900/50 border border-white/5 flex items-center justify-center">
                <Star size={32} className="text-white/10" />
            </div>

            {/* Interactive Zones */}
            {ZONES.map((z) => (
                <motion.button
                    key={z.id}
                    onMouseEnter={() => setActiveZone(z)}
                    className={`absolute border-2 rounded transition-all duration-200 z-10
                        ${activeZone?.id === z.id ? "border-amber-400 bg-amber-500/20" : "border-transparent hover:border-white/30"}
                    `}
                    style={{ 
                        left: `${z.x}%`, top: `${z.y}%`, 
                        width: `${z.w}%`, height: `${z.h}%` 
                    }}
                />
            ))}

            {/* Labels (Static for visual flavor) */}
            <div className="absolute top-2 left-2 w-3/4 h-4 bg-white/10 rounded-sm" />
        </div>

        {/* Info Panel */}
        <div className="w-full min-h-[80px] bg-neutral-950/50 rounded-lg border border-white/5 p-4 text-center flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {activeZone ? (
                    <motion.div
                        key={activeZone.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                        <h4 className="text-xs font-bold text-amber-400 mb-1">{activeZone.label}</h4>
                        <p className="text-[10px] text-neutral-300 leading-relaxed">
                            {activeZone.desc}
                        </p>
                    </motion.div>
                ) : (
                    <span className="text-[10px] text-neutral-500 italic">Hover over the card schematic to analyze components.</span>
                )}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Ghost, Sparkles } from 'lucide-react';

const PHASES = [
  {
    id: 'samhain',
    title: "Samhain",
    era: "Ancient Celtic",
    desc: "The Celtic new year. The harvest is in. The cattle are slaughtered. The bonfires are lit to guide the souls of the dead home—and to ward off the fae who wish to steal them.",
    icon: Flame,
    color: "text-orange-500"
  },
  {
    id: 'hallowmas',
    title: "All Hallows' Eve",
    era: "Middle Ages",
    desc: "The Church attempts to sanctify the dark. 'Souling' begins: poor citizens beg for 'soul cakes' in exchange for praying for the donor's dead relatives. The precursor to Trick-or-Treat.",
    icon: Sparkles,
    color: "text-purple-400"
  },
  {
    id: 'modern',
    title: "The Mask",
    era: "20th Century",
    desc: "Anonymity as armor. We dress as monsters to blend in with them. If the spirits walk among us tonight, they will think we are one of their own.",
    icon: Ghost,
    color: "text-red-500"
  }
];

export default function SamhainRitualWheel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = PHASES[activeIdx];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* THE WHEEL VISUALIZER */}
        <div className="relative h-80 flex items-center justify-center">
            {/* Background Symbols */}
            <div className="absolute inset-0 border-2 border-dashed border-red-900/30 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 border border-red-900/20 rounded-full" />
            
            {/* The Buttons (Planets) */}
            {PHASES.map((phase, i) => {
                const angle = (i * (360 / PHASES.length)) * (Math.PI / 180) - Math.PI/2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                    <button
                        key={phase.id}
                        onClick={() => setActiveIdx(i)}
                        className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10 ${activeIdx === i ? 'bg-red-900 border-red-500 scale-125 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-black border-slate-800 hover:border-red-900'}`}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                        <phase.icon size={20} className={activeIdx === i ? 'text-white' : 'text-slate-600'} />
                    </button>
                )
            })}
            
            {/* Center Eye */}
            <div className="w-24 h-24 rounded-full bg-black border border-red-900 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-red-900/20 animate-pulse" />
                 <current.icon size={32} className={`${current.color} relative z-10`} />
            </div>
        </div>

        {/* THE LORE CARD */}
        <div className="bg-black/80 border border-red-900/50 p-8 rounded-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-8 h-px bg-red-900" /> {current.era}
                    </div>
                    <h2 className={`text-4xl font-black uppercase mb-4 ${current.color} drop-shadow-[0_2px_10px_rgba(0,0,0,1)]`}>
                        {current.title}
                    </h2>
                    <p className="text-sm text-slate-300 leading-loose font-serif italic border-l-2 border-red-900 pl-4">
                        "{current.desc}"
                    </p>
                </motion.div>
            </AnimatePresence>
            
            {/* Blood drips decoration */}
            <div className="absolute top-0 right-8 w-px h-16 bg-gradient-to-b from-red-900 to-transparent" />
            <div className="absolute top-0 right-12 w-px h-8 bg-gradient-to-b from-red-900 to-transparent" />
        </div>

    </div>
  );
}
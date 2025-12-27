"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Footprints, Flame, Brain, Clock } from "lucide-react";

const HOMINIDS = [
  { 
    id: "lucy", 
    name: "Australopithecus", 
    time: "4 - 2 MYA", 
    brain: "450cc", 
    feat: "Bipedalism", 
    desc: "The walking ape. Small brain, but walked upright on two legs." 
  },
  { 
    id: "habilis", 
    name: "Homo Habilis", 
    time: "2.4 - 1.4 MYA", 
    brain: "600cc", 
    feat: "Stone Tools", 
    desc: "'Handy Man.' The first to make and use stone tools (Oldowan)." 
  },
  { 
    id: "erectus", 
    name: "Homo Erectus", 
    time: "1.9 MYA - 110k", 
    brain: "900cc", 
    feat: "Fire & Travel", 
    desc: "The traveler. First to control fire and leave Africa." 
  },
  { 
    id: "neanderthal", 
    name: "Neanderthalensis", 
    time: "400k - 40k YA", 
    brain: "1450cc", 
    feat: "Burial & Art", 
    desc: "Stocky and strong. Practiced ritual burial and made complex tools." 
  },
  { 
    id: "sapiens", 
    name: "Homo Sapiens", 
    time: "300k - Present", 
    brain: "1350cc", 
    feat: "Symbolism", 
    desc: "Us. Characterized by complex language, art, and abstract thought." 
  },
];

export default function SkullTimeline() {
  const [index, setIndex] = useState(0);
  const current = HOMINIDS[index];

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Skull size={14} className="text-amber-500" /> Hominid Evolution
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Timeline Slider */}
        <div className="w-full mb-6">
            <input 
                type="range" 
                min="0" max="4" step="1" 
                value={index}
                onChange={(e) => setIndex(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[9px] text-neutral-600 font-mono mt-2 uppercase">
                <span>Past</span>
                <span>Present</span>
            </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
            <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full text-center"
            >
                <h4 className="text-lg font-bold text-white mb-1">{current.name}</h4>
                <span className="inline-block px-2 py-0.5 rounded bg-amber-900/30 border border-amber-500/30 text-[10px] text-amber-400 font-mono mb-4">
                    {current.time}
                </span>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-neutral-950/50 p-2 rounded border border-white/5 flex flex-col items-center gap-1">
                        <Brain size={14} className="text-neutral-500" />
                        <span className="text-xs font-bold text-neutral-300">{current.brain}</span>
                    </div>
                    <div className="bg-neutral-950/50 p-2 rounded border border-white/5 flex flex-col items-center gap-1">
                         {current.id === 'lucy' ? <Footprints size={14} className="text-amber-500" /> :
                          current.id === 'erectus' ? <Flame size={14} className="text-amber-500" /> :
                          current.id === 'sapiens' ? <Clock size={14} className="text-amber-500" /> :
                          <Skull size={14} className="text-amber-500" />
                         }
                        <span className="text-[10px] font-bold text-neutral-300 leading-tight">{current.feat}</span>
                    </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed italic">
                    "{current.desc}"
                </p>
            </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
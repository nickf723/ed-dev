"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Clock, RotateCcw, Play, ChevronRight, ArrowDown, ArrowRight } from "lucide-react";

const PHASES = [
  {
    id: "beginning",
    name: "Beginning Phase",
    steps: [
      { name: "Untap", desc: "Reset all your permanents." },
      { name: "Upkeep", desc: "beginning-of-turn triggers happen here." },
      { name: "Draw", desc: "Draw a card for the turn." },
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30"
  },
  {
    id: "main1",
    name: "Main Phase 1",
    steps: [
      { name: "Action", desc: "Play lands, cast creatures, sorceries, etc." }
    ],
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20"
  },
  {
    id: "combat",
    name: "Combat Phase",
    steps: [
      { name: "Beginning", desc: "Last chance to tap potential attackers." },
      { name: "Declare Attackers", desc: "Choose who attacks. They tap." },
      { name: "Declare Blockers", desc: "Opponent chooses defenders." },
      { name: "Damage", desc: "Creatures deal damage simultaneously." },
      { name: "End", desc: "Combat ends. 'Until end of combat' effects wear off." },
    ],
    color: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30"
  },
  {
    id: "main2",
    name: "Main Phase 2",
    steps: [
      { name: "Action", desc: "Play lands (if you haven't), cast post-combat spells." }
    ],
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20"
  },
  {
    id: "ending",
    name: "Ending Phase",
    steps: [
      { name: "End Step", desc: "End-of-turn triggers. Last chance for Instants." },
      { name: "Cleanup", desc: "Discard down to 7. Damage heals." }
    ],
    color: "text-neutral-400",
    bg: "bg-neutral-500/20",
    border: "border-neutral-500/30"
  }
];

export default function PhaseTracker() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activePhase = PHASES[activePhaseIdx];
  const activeStep = activePhase.steps[activeStepIdx];

  const next = () => {
    if (activeStepIdx < activePhase.steps.length - 1) {
        setActiveStepIdx(s => s + 1);
    } else {
        setActiveStepIdx(0);
        setActivePhaseIdx(p => (p + 1) % PHASES.length);
    }
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Clock size={14} className="text-cyan-400" /> Turn Structure
        </h3>
        <button onClick={next} className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
            <Play size={14} fill="currentColor" />
        </button>
      </div>

      <div className="p-0 flex flex-col">
         
         {/* Visual Timeline */}
         <div className="flex w-full h-1.5 bg-neutral-800">
            {PHASES.map((p, i) => (
                <div 
                    key={p.id} 
                    className={`h-full transition-all duration-300 ${i === activePhaseIdx ? "bg-cyan-400 shadow-[0_0_10px_cyan]" : "bg-neutral-800"}`} 
                    style={{ flex: p.steps.length }}
                />
            ))}
         </div>

         <div className="p-6">
            {/* Current Phase Display */}
            <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${activePhase.color} ${activePhase.bg} ${activePhase.border}`}
            >
                {activePhase.name}
            </motion.div>

            {/* Step List */}
            <div className="space-y-2 border-l-2 border-neutral-800 ml-2 pl-4 relative">
                {activePhase.steps.map((step, i) => {
                    const isActive = i === activeStepIdx;
                    return (
                        <div key={step.name} className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-2" : "opacity-40"}`}>
                            <div className="flex items-center gap-2">
                                {isActive && <ArrowRight size={12} className="text-cyan-400" />}
                                <span className={`text-sm font-bold ${isActive ? "text-white" : "text-neutral-400"}`}>
                                    {step.name}
                                </span>
                            </div>
                            <AnimatePresence>
                                {isActive && (
                                    <motion.p 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="text-[11px] text-neutral-400 mt-1 leading-relaxed"
                                    >
                                        {step.desc}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
                
                {/* Active Marker on border */}
                <motion.div 
                    className="absolute -left-[3px] w-1.5 h-1.5 bg-cyan-400 rounded-full"
                    animate={{ top: `${activeStepIdx * 40 + 8}px` }} // Approx spacing
                />
            </div>
         </div>

         {/* Footer */}
         <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5 flex justify-between items-center">
             <span className="text-[10px] font-mono text-neutral-500 uppercase">Phase {activePhaseIdx + 1}/{PHASES.length}</span>
             <button onClick={next} className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                 Next Step <ChevronRight size={12} />
             </button>
         </div>
      </div>
    </div>
  );
}
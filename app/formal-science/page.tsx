"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import ParadoxWidget from "@/components/ParadoxWidget";
import {
  Calculator, Key, Terminal, Network, Binary, Sigma, Tally5, SquareFunction, Spline, ChevronRight, BrainCog,
} from "@/components/icons";
import GameOfLifeBackground from "@/components/GameOfLifeBackground";
import { motion } from "framer-motion";
import { Cpu, Layers } from "lucide-react";

// --- Grouped Data with IDs for linking ---
const sectors = [
  {
    name: "Sector I: Foundations",
    icon: Key,
    color: "text-cyan-400",
    desc: "The axioms and rules that define validity itself.",
    items: [
      { id: "logic", title: "Logic", desc: "The study of correct reasoning and valid inference.", href: "/formal-science/logic", Icon: Key, subtitle: "The Rules of Reason" },
      { id: "math", title: "Mathematics", desc: "The science of structure, order, and relation.", href: "/formal-science/mathematics", Icon: Calculator, subtitle: "The Universal Language" }
    ]
  },
  {
    name: "Sector II: Systems & Information",
    icon: Network,
    color: "text-purple-400",
    desc: "How parts form wholes and how information flows.",
    items: [
      { id: "systems", title: "Systems Science", desc: "Modeling complex behaviors and emergence.", href: "/formal-science/systems-science", Icon: Network, subtitle: "Holistic Complexity" },
      { id: "info", title: "Information Science", desc: "The properties and behavior of information itself.", href: "/formal-science/information-science", Icon: Binary, subtitle: "Signal & Noise" }
    ]
  },
  {
    name: "Sector III: Computation & Data",
    icon: Cpu,
    color: "text-emerald-400",
    desc: "Processing information to solve problems and gain insight.",
    items: [
      { id: "cs", title: "Computer Science", desc: "The theory and practice of computation.", href: "/formal-science/computer-science", Icon: Terminal, subtitle: "Algorithmic Thinking" },
      { id: "data", title: "Data Science", desc: "Extracting meaning from vast datasets.", href: "/formal-science/data-science", Icon: Sigma, subtitle: "Empirical Insight" }
    ]
  }
];

// --- Abstraction Ladder Data with Mapping ---
// 'relatedIds' corresponds to the 'id' in the sectors items above
const ladder = [
  { title: "Logic", level: "L0: Foundation", Icon: Key, relatedIds: ["logic"] },
  { title: "Set Theory", level: "L1: Structure", Icon: Tally5, relatedIds: ["math", "logic"] },
  { title: "Number Systems", level: "L2: Quantity", Icon: Tally5, relatedIds: ["math", "info"] },
  { title: "Algebra", level: "L3: Generalization", Icon: SquareFunction, relatedIds: ["math", "cs"] },
  { title: "Calculus", level: "L4: Change", Icon: Spline, relatedIds: ["math", "systems"] },
  { title: "Computation", level: "L5: Process", Icon: Terminal, relatedIds: ["cs", "data"] },
];

export default function FormalSciencePage() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  // Helper to check if a card should be highlighted
  const getVariant = (cardId: string) => {
    if (!activeLevel) return "default";
    const activeStep = ladder.find(l => l.title === activeLevel);
    if (activeStep?.relatedIds.includes(cardId)) return "highlighted";
    return "dimmed";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-16">
      
      <GameOfLifeBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-12">
        
        <PageHeader
          eyebrow="Domain 01"
          title="Formal Sciences"
          subtitle="The Operating System of reality. These disciplines rely on deductive reasoning to define the rules that govern patterns, structure, and information."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
             {sectors.map((sector, idx) => (
               <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="mb-6"
                 >
                    <div className="flex items-center gap-3 mb-2">
                        <sector.icon className={sector.color} size={24} />
                        <h2 className="text-xl font-bold text-white tracking-wide">{sector.name}</h2>
                    </div>
                    <p className="text-sm text-neutral-400 border-l-2 border-white/10 pl-4 ml-1">
                        {sector.desc}
                    </p>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                        >
                            <TopicCard 
                                {...item} 
                                variant={getVariant(item.id)}
                            />
                        </motion.div>
                    ))}
                 </div>
               </section>
             ))}
          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-8 h-fit pt-4">
            
            {/* Interactive Abstraction Stack */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-0 backdrop-blur-xl"
            >
               <div className="flex items-center justify-between bg-white/5 px-6 py-4 border-b border-white/5">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 flex items-center gap-2">
                  <Layers size={14} className="text-cyan-400"/> Abstraction Stack
                </h3>
                <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse delay-75" />
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse delay-150" />
                </div>
               </div>
               
               <div className="flex flex-col p-2">
                {ladder.map((step, index) => {
                  const isActive = activeLevel === step.title;
                  return (
                    <div 
                      key={step.title}
                      onMouseEnter={() => setActiveLevel(step.title)}
                      onMouseLeave={() => setActiveLevel(null)}
                      className={`group relative flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all duration-200
                        ${isActive ? "bg-cyan-500/10 border-cyan-500/30 translate-x-1" : "hover:bg-white/5"}
                      `}
                    >
                      {/* Connecting Line Segment */}
                      {index !== ladder.length - 1 && (
                        <div className="absolute left-[26px] top-10 h-6 w-[1px] bg-neutral-800 group-hover:bg-cyan-500/50" />
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`flex h-6 w-6 items-center justify-center rounded bg-neutral-950 text-neutral-500 border border-neutral-800 transition-colors
                            ${isActive ? "text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : ""}
                        `}>
                            <step.Icon size={12} />
                        </div>
                        <div>
                            <p className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${isActive ? "text-cyan-400" : "text-neutral-500"}`}>
                                {step.level}
                            </p>
                            <p className={`text-sm font-medium transition-colors ${isActive ? "text-white" : "text-neutral-300"}`}>
                                {step.title}
                            </p>
                        </div>
                      </div>

                      <ChevronRight 
                        size={14} 
                        className={`text-neutral-600 transition-transform duration-300 ${isActive ? "text-cyan-400 opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} 
                      />
                    </div>
                  );
                })}
               </div>
               
               <div className="bg-neutral-950/50 px-6 py-3 border-t border-white/5">
                    <p className="text-[10px] text-neutral-500 font-mono">
                        {activeLevel 
                            ? `> TARGETING: ${activeLevel.toUpperCase()}_LAYER` 
                            : "> HOVER TO INSPECT STACK"}
                    </p>
               </div>
            </motion.div>

            {/* New Paradox Widget */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <ParadoxWidget />
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
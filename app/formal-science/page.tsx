"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  Key,
  Terminal,
  Network,
  Binary,
  Sigma,
  Tally5,
  SquareFunction,
  Spline,
  ChevronUp,
  BrainCog,
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import GameOfLifeBackground from "@/components/GameOfLifeBackground";
import { motion } from "framer-motion";
import { Cpu, Layers } from "lucide-react";

// --- Grouped Data ---
const sectors = [
  {
    name: "Sector I: Foundations",
    icon: Key,
    color: "text-cyan-400",
    desc: "The axioms and rules that define validity itself.",
    items: [
      {
        title: "Logic",
        desc: "The study of correct reasoning and valid inference.",
        href: "/formal-science/logic",
        Icon: Key,
        className: "theme-logic",
        subtitle: "The Rules of Reason"
      },
      {
        title: "Mathematics",
        desc: "The science of structure, order, and relation.",
        href: "/formal-science/mathematics",
        Icon: Calculator,
        className: "theme-math",
        subtitle: "The Universal Language"
      }
    ]
  },
  {
    name: "Sector II: Systems & Information",
    icon: Network,
    color: "text-purple-400",
    desc: "How parts form wholes and how information flows.",
    items: [
      {
        title: "Systems Science",
        desc: "Modeling complex behaviors and emergence.",
        href: "/formal-science/systems-science",
        Icon: Network,
        className: "theme-systems-science",
        subtitle: "Holistic Complexity"
      },
      {
        title: "Information Science",
        desc: "The properties and behavior of information itself.",
        href: "/formal-science/information-science",
        Icon: Binary,
        className: "theme-information-science",
        subtitle: "Signal & Noise"
      }
    ]
  },
  {
    name: "Sector III: Computation & Data",
    icon: Cpu,
    color: "text-emerald-400",
    desc: "Processing information to solve problems and gain insight.",
    items: [
      {
        title: "Computer Science",
        desc: "The theory and practice of computation.",
        href: "/formal-science/computer-science",
        Icon: Terminal,
        className: "theme-computer-science",
        subtitle: "Algorithmic Thinking"
      },
      {
        title: "Data Science",
        desc: "Extracting meaning from vast datasets.",
        href: "/formal-science/data-science",
        Icon: Sigma,
        className: "theme-data-science",
        subtitle: "Empirical Insight"
      }
    ]
  }
];

// Sidebar Ladder Data
const ladder = [
  { title: "Logic", level: "Foundation", Icon: Key },
  { title: "Set Theory", level: "Structure", Icon: Tally5 },
  { title: "Number Systems", level: "Quantity", Icon: Tally5 },
  { title: "Algebra", level: "Generalization", Icon: SquareFunction },
  { title: "Calculus", level: "Change", Icon: Spline },
  { title: "Computation", level: "Process", Icon: Terminal },
];

function LadderStep({ item, isLast }: { item: typeof ladder[0]; isLast: boolean }) {
  return (
    <div className="relative flex items-center gap-4 group h-12">
      {!isLast && (
        <div className="absolute left-[15px] top-8 h-8 w-0.5 bg-neutral-800 group-hover:bg-red-500/30 transition-colors" />
      )}
      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-500 transition-all duration-300 group-hover:border-red-500/50 group-hover:text-red-400 group-hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]">
        <item.Icon size={14} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 group-hover:text-red-400/80 transition-colors w-24 text-right">
          {item.level}
        </span>
        <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function FormalSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-16">
      
      <GameOfLifeBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-12">
        
        <PageHeader
          eyebrow="Domain 01"
          title="Formal Sciences"
          subtitle="The study of systems, logic, and abstract structures. These disciplines rely on deductive reasoning to define the rules that govern patterns, creating the 'Operating System' of reality."
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
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
               </section>
             ))}

          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-8 h-fit pt-4">
            
            {/* Ladder Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-2xl border border-red-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80"
            >
               <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                  <Layers size={14} /> Abstraction Stack
                </h3>
               </div>
               
               <div className="space-y-1">
                {ladder.map((step, index) => (
                  <LadderStep key={step.title} item={step} isLast={index === ladder.length - 1} />
                ))}
               </div>
            </motion.div>

            {/* Context Box */}
            <div className="p-5 rounded-xl border border-dashed border-white/10 bg-neutral-900/20">
                <h4 className="text-sm font-bold text-neutral-200 mb-2 flex items-center gap-2">
                    <BrainCog size={16} className="text-yellow-500"/> Deductive Reasoning
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    Unlike Natural Sciences which rely on observation (Induction), Formal Sciences rely on definitions and rules (Deduction). <br/><br/>
                    <span className="text-white/60 italic">"If P implies Q, and P is true, then Q must be true."</span>
                </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
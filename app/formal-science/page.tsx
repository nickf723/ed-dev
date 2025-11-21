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
  BrainCog
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import GameOfLifeBackground from "@/components/GameOfLifeBackground"; // Import the new background
import { motion } from "framer-motion";

// --- DATA: Disciplines ---
const disciplines = [
  {
    title: "Mathematics",
    desc: "The study of quantity, structure, space, and change. The universal language of patterns.",
    href: "/formal-science/mathematics",
    Icon: Calculator,
    className: "theme-math",
    subtitle: "The Language"
  },
  {
    title: "Logic",
    desc: "The rules of valid reasoning and inference that underpin mathematical proofs.",
    href: "/formal-science/logic",
    Icon: Key,
    className: "theme-logic",
    subtitle: "The Rules"
  },
  {
    title: "Computer Science",
    desc: "The theory of computation, algorithms, and the design of information systems.",
    href: "/formal-science/computer-science",
    Icon: Terminal,
    className: "theme-computer-science",
    subtitle: "The Process"
  },
  {
    title: "Systems Science",
    desc: "Modeling complex systems where the whole is greater than the sum of its parts.",
    href: "/formal-science/systems-science",
    Icon: Network,
    className: "theme-systems-science",
    subtitle: "The Whole"
  },
  {
    title: "Information Science",
    desc: "The lifecycle of information: creation, storage, retrieval, and dissemination.",
    href: "/formal-science/information-science",
    Icon: Binary,
    className: "theme-information-science",
    subtitle: "The Data"
  },
  {
    title: "Data Science",
    desc: "Extracting knowledge and insights from structured and unstructured data.",
    href: "/formal-science/data-science",
    Icon: Sigma,
    className: "theme-data-science",
    subtitle: "The Insight"
  },
];

// --- DATA: Ladder of Abstraction ---
const ladder = [
  { title: "Logic", level: "Foundation", Icon: Key, desc: "Truth & Validity" },
  { title: "Set Theory", level: "Structure", Icon: Tally5, desc: "Collections" },
  { title: "Number Systems", level: "Quantity", Icon: Tally5, desc: "Counting" },
  { title: "Algebra", level: "Generalization", Icon: SquareFunction, desc: "Symbols" },
  { title: "Calculus", level: "Change", Icon: Spline, desc: "Limits" },
  { title: "Computation", level: "Process", Icon: Terminal, desc: "Algorithms" },
];

// --- COMPONENT: Ladder Step ---
function LadderStep({ item, isLast }: { item: typeof ladder[0]; isLast: boolean }) {
  return (
    <div className="relative flex items-center gap-4 group h-14">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 h-8 w-0.5 bg-neutral-800 group-hover:bg-red-500/30 transition-colors" />
      )}
      
      <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-500 transition-all duration-300 group-hover:border-red-500/50 group-hover:text-red-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]">
        <item.Icon size={16} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 group-hover:text-red-400/80 transition-colors">
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
      
      {/* 1. Background */}
      <GameOfLifeBackground />
      
      {/* 2. Content Wrapper */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-20">
        
        <PageHeader
          eyebrow="Domain 01"
          title="Formal Sciences"
          subtitle="The study of systems, logic, and abstract structures. These disciplines rely on deductive reasoning to define the rules that govern patterns, essentially creating the 'Operating System' of reality."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-3 border-b border-red-500/20 pb-4"
             >
              <BrainCog className="text-red-500" size={28} />
              <h2 className="text-2xl font-bold text-white tracking-wide">Fields of Study</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {disciplines.map((branch, i) => (
                <motion.div
                  key={branch.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <TopicCard {...branch} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
            
            {/* Ladder Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-2xl border border-red-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80"
            >
               <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                  <ChevronUp size={16} /> Abstraction Stack
                </h3>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
               </div>
               
               <div className="space-y-1 pl-2">
                {ladder.map((step, index) => (
                  <LadderStep key={step.title} item={step} isLast={index === ladder.length - 1} />
                ))}
               </div>

               <div className="mt-8 p-4 rounded-lg bg-red-950/20 border border-red-900/30 text-xs text-red-200/60 font-mono leading-relaxed">
                 <span className="text-red-400 font-bold">{`>`} SYSTEM_NOTE:</span> Formal systems are built recursively. Each layer relies on the axioms of the layer below it.
               </div>
            </motion.div>

            {/* Applied Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-all hover:border-red-500/30 hover:bg-neutral-900/60"
            >
              <h4 className="font-bold text-neutral-200 mb-2 flex items-center gap-2">
                Applied Formalism
              </h4>
              <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                See how these abstract rules are used to build the physical world in Engineering and Technology.
              </p>
              <Link href="/applied-science" className="inline-flex items-center gap-2 text-sm font-bold text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-all">
                Go to Applied Sciences <ChevronUp className="rotate-90 h-4 w-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
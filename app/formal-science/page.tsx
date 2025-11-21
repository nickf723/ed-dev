"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  LockKeyholeOpen,
  Network,
  ChartScatter,
  Terminal,
  Binary,
  Tally5,
  Sigma,
  Spline,
  BrainCog,
  Database,
  SquareFunction,
  Shapes,
  Key,
  ChevronUp
} from "@/components/icons";
import React from "react";
import Link from "next/link";

const formalScienceSymbols = [
  "{}", "∀", "∃", "∈", "⇒", "f(x)", "0", "1", "π", "Σ",
];

// --- DATA: Primary Disciplines (The "Meat") ---
const disciplines = [
  {
    title: "Mathematics",
    desc: "The study of quantity, structure, space, and change. It is the language used to describe patterns in every other field.",
    href: "/formal-science/mathematics",
    Icon: Calculator,
    className: "theme-math",
    subtitle: "The Language of Pattern"
  },
  {
    title: "Logic",
    desc: "The study of correct reasoning. It provides the rules for validity that underpin mathematical proofs and algorithms.",
    href: "/formal-science/logic",
    Icon: Key,
    className: "theme-logic",
    subtitle: "The Rules of Reason"
  },
  {
    title: "Computer Science",
    desc: "The study of computation, information, and automation. It bridges abstract mathematics with practical engineering.",
    href: "/formal-science/computer-science",
    Icon: Terminal,
    className: "theme-computer-science",
    subtitle: "Theory of Computation"
  },
  {
    title: "Systems Science",
    desc: "The interdisciplinary study of complex systems, focusing on how parts interact to form wholes.",
    href: "/formal-science/systems-science",
    Icon: Network,
    className: "theme-systems-science",
    subtitle: "Complexity & Emergence"
  },
  {
    title: "Information Science",
    desc: "The study of the analysis, collection, classification, manipulation, storage, retrieval, and dissemination of information.",
    href: "/formal-science/information-science",
    Icon: Binary,
    className: "theme-information-science",
    subtitle: "Data & Knowledge"
  },
  {
    title: "Data Science",
    desc: "The interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.",
    href: "/formal-science/data-science",
    Icon: Sigma,
    className: "theme-data-science",
    subtitle: "Insights from Data"
  },
];

// --- DATA: The Ladder of Abstraction (Sidebar) ---
const ladder = [
  { title: "Logic", level: "Foundation", Icon: Key },
  { title: "Set Theory", level: "Structure", Icon: Tally5 },
  { title: "Number Systems", level: "Quantity", Icon: Tally5 },
  { title: "Algebra", level: "Generalization", Icon: SquareFunction },
  { title: "Calculus", level: "Change", Icon: Spline },
  { title: "Computation", level: "Process", Icon: Terminal },
];

// --- COMPONENT: Ladder Step ---
function LadderStep({ item, isLast }: { item: typeof ladder[0]; isLast: boolean }) {
  return (
    <div className="relative flex items-center gap-4 group">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 h-6 w-0.5 bg-neutral-800 group-hover:bg-red-500/30 transition-colors" />
      )}
      
      <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-500 transition-all group-hover:border-red-500/50 group-hover:text-red-400 group-hover:shadow-[0_0_10px_rgba(248,113,113,0.2)]">
        <item.Icon size={16} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 group-hover:text-red-400/80 transition-colors">
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
    <main className="topic-page theme-formal-science lg:px-16">
      <FloatingSymbols symbols={formalScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Formal Sciences"
        subtitle="The disciplines concerned with abstract structures described by formal systems. Unlike natural sciences, they rely on deductive reasoning rather than empirical observation."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* MAIN CONTENT: The Disciplines (8 cols) */}
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <BrainCog className="text-red-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Fields of Study</h2>
          </div>
          
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {disciplines.map((branch) => (
              <TopicCard
                key={branch.href}
                href={branch.href}
                title={branch.title}
                desc={branch.desc}
                Icon={branch.Icon}
                className={branch.className}
                subtitle={branch.subtitle}
              />
            ))}
          </section>
        </div>

        {/* SIDEBAR: The Hierarchy (4 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          
          {/* Conceptual Map */}
          <div className="glass p-6 rounded-2xl border border-red-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-red-200">
              <ChevronUp className="text-red-500" /> Ladder of Abstraction
            </h3>
            <div className="space-y-4 pl-2 text-left">
              {ladder.map((step, index) => (
                <LadderStep key={step.title} item={step} isLast={index === ladder.length - 1} />
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-red-950/30 border border-red-900/30 text-xs text-red-200/70 leading-relaxed">
              Formal sciences are built on top of one another. Logic defines the rules; Mathematics builds the structures; Computation animates them.
            </div>
          </div>

          {/* Cross-Link */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-red-500/30">
            <h4 className="font-semibold text-neutral-200 mb-2">Applied Formalism</h4>
            <p className="text-sm text-neutral-400 mb-4">
              See how these abstract rules build the physical world in Engineering.
            </p>
            <Link href="/applied-science" className="text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-1">
              Go to Applied Sciences <ChevronUp className="rotate-90 h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
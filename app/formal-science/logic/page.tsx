"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  LockKeyholeOpen,
  Binary,
  GitMerge,
  BookText,
  HelpCircle,
  AlertTriangle,
  CheckCircle
} from "@/components/icons";
import React from "react";
import Link from "next/link";

const logicSymbols = [
  "\\forall", "\\exists", "\\land", "\\lor", "\\neg", "\\to", "\\iff", "\\therefore",
];

const branches = [
  {
    title: "Propositional Logic",
    desc: "The study of simple statements and the connectives (AND, OR, NOT) that combine them into complex truths.",
    href: "/formal-science/logic/propositional-logic",
    Icon: LockKeyholeOpen,
    className: "theme-logic",
  },
  {
    title: "Predicate Logic",
    desc: "Extending logic to include quantifiers (for all, there exists) and variables, allowing for mathematical proof.",
    href: "/formal-science/logic/predicate-logic",
    Icon: Binary,
    className: "theme-logic",
  },
  {
    title: "Argument & Fallacies",
    desc: "Analyzing the structure of natural language arguments to identify validity, soundness, and errors.",
    href: "/formal-science/logic/argument-structure",
    Icon: BookText,
    className: "theme-logic",
  },
  {
    title: "Modal & Non-Classical",
    desc: "Logics that deal with possibility, necessity, time, and fuzzy truths beyond simple True/False.",
    href: "/formal-science/logic/modal-logics",
    Icon: GitMerge,
    className: "theme-logic",
  },
];

// --- DATA: Paradoxes ---
const paradoxes = [
  {
    title: "The Liar Paradox",
    desc: "\"This statement is false.\" If it's true, it's false. If it's false, it's true.",
    tag: "Self-Reference"
  },
  {
    title: "Sorites Paradox",
    desc: "If you remove one grain of sand from a heap, is it still a heap? When does it stop being one?",
    tag: "Vagueness"
  },
  {
    title: "Raven Paradox",
    desc: "Observing a green apple increases the probability that all ravens are black. (Logically equivalent!)",
    tag: "Induction"
  }
];

function ParadoxCard({ item }: { item: typeof paradoxes[0] }) {
  return (
    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-blue-500/30 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-neutral-200 text-sm group-hover:text-blue-300 transition-colors">{item.title}</h4>
        <span className="text-[10px] uppercase font-bold text-blue-500/70 bg-blue-900/10 px-1.5 py-0.5 rounded border border-blue-900/30">
          {item.tag}
        </span>
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
    </div>
  );
}

export default function LogicPage() {
  return (
    <main className="topic-page theme-logic lg:px-16">
      <FloatingSymbols symbols={logicSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Logic"
        subtitle="The study of correct reasoning. It provides the universal, formal framework for constructing valid arguments and determining truth."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <CheckCircle className="text-blue-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Branches of Logic</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <TopicCard key={branch.href} {...branch} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          {/* Paradoxes */}
          <div className="glass p-1 rounded-2xl border border-blue-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <div className="p-4 border-b border-white/5">
               <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                 <HelpCircle size={16} /> Famous Paradoxes
               </h3>
             </div>
             <div className="p-2 flex flex-col gap-1">
               {paradoxes.map((p) => (
                 <ParadoxCard key={p.title} item={p} />
               ))}
             </div>
          </div>

          {/* Validity vs Truth */}
          <div className="p-5 rounded-xl border border-dashed border-neutral-700/50 bg-neutral-900/20">
            <h4 className="text-sm font-bold text-neutral-300 flex items-center gap-2 mb-2">
               <AlertTriangle size={16} className="text-amber-500" /> Validity ≠ Truth
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              In logic, an argument is <strong>valid</strong> if the conclusion follows from the premises. It can be valid even if the premises are false!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
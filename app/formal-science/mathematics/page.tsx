"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  Variable,
  Shapes,
  Spline,
  ChartScatter,
  Tally5,
  Sigma,
  HelpCircle, // For conjectures
  Brain,
  ChevronDown,
  Lightbulb,
  Binary,
  Scale,
} from "@/components/icons";
import React from "react";
import Link from "next/link";

const mathSymbols = [
  "π", "∞", "√", "∑", "∫", "∂", "ℝ", "ℂ", "e^{iπ}", "P(A|B)",
];

// --- DATA: Core Disciplines ---
const disciplines = [
  {
    title: "Algebra",
    desc: "The study of symbols and the rules for manipulating them. It generalizes arithmetic to solve for unknowns.",
    href: "/formal-science/mathematics/algebra",
    Icon: Variable,
    className: "theme-algebra",
    subtitle: "Structure & Symmetry",
  },
  {
    title: "Geometry",
    desc: "The study of shape, size, relative position of figures, and the properties of space.",
    href: "/formal-science/mathematics/geometry",
    Icon: Shapes,
    className: "theme-geometry",
    subtitle: "Space & Form",
  },
  {
    title: "Calculus & Analysis",
    desc: "The mathematical study of continuous change, limits, and infinite processes.",
    href: "/formal-science/mathematics/calculus",
    Icon: Spline,
    className: "theme-calculus",
    subtitle: "Motion & Change",
  },
  {
    title: "Statistics & Probability",
    desc: "The science of collecting data and analyzing uncertainty.",
    href: "/formal-science/mathematics/statistics",
    Icon: ChartScatter,
    className: "theme-statistics",
    subtitle: "Data & Chance",
  },
  {
    title: "Number Theory",
    desc: "The study of the integers and their properties. The 'Queen of Mathematics'.",
    href: "/formal-science/mathematics/number-theory",
    Icon: Calculator,
    className: "theme-number-theory",
    subtitle: "The Integers",
  },
  {
    title: "Discrete Math",
    desc: "The study of mathematical structures that are distinct and separable. The language of computer science.",
    href: "/formal-science/mathematics/discrete-mathematics",
    Icon: Tally5,
    className: "theme-discrete-math",
    subtitle: "Logic & Graphs",
  },
];

// --- DATA: Unsolved Conjectures ---
const conjectures = [
  {
    title: "Riemann Hypothesis",
    desc: "The distribution of prime numbers is closely related to the zeros of the Riemann zeta function.",
    difficulty: "Legendary",
    Icon: Sigma,
  },
  {
    title: "Twin Prime Conjecture",
    desc: "There are infinitely many pairs of primes that differ by exactly 2 (e.g., 11 and 13).",
    difficulty: "Hard",
    Icon: Binary,
  },
  {
    title: "P vs NP",
    desc: "If a problem's solution can be quickly checked, can it also be quickly found?",
    difficulty: "Millennium Prize",
    Icon: HelpCircle,
  },
];

// --- DATA: The Mathematical Landscape (Sidebar) ---
const landscape = [
  { title: "Foundations", desc: "Logic & Set Theory", Icon: Scale },
  { title: "Arithmetic", desc: "Numbers & Operations", Icon: Calculator },
  { title: "Algebra", desc: "Structures & Equations", Icon: Variable },
  { title: "Analysis", desc: "Continuity & Limits", Icon: Spline },
  { title: "Topology", desc: "Space & Connectivity", Icon: Shapes },
];

// --- COMPONENT: Conjecture Card ---
function ConjectureCard({ item }: { item: typeof conjectures[0] }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60 transition-all group">
      <div className="mt-1 shrink-0 text-pink-400 group-hover:text-pink-300 transition-colors">
        <item.Icon size={20} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-neutral-200 text-sm">{item.title}</h4>
          <span className="text-[10px] font-mono uppercase tracking-wider text-pink-500/80 bg-pink-900/10 px-1.5 py-0.5 rounded">
            {item.difficulty}
          </span>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// --- COMPONENT: Landscape Step ---
function LandscapeStep({ item, isLast }: { item: typeof landscape[0]; isLast: boolean }) {
  return (
    <div className="relative flex items-center gap-4 group py-1">
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 h-6 w-0.5 bg-neutral-800 group-hover:bg-pink-500/30 transition-colors" />
      )}
      
      <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-500 transition-all group-hover:border-pink-500/50 group-hover:text-pink-400 group-hover:shadow-[0_0_10px_rgba(244,114,182,0.2)]">
        <item.Icon size={14} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">
          {item.title}
        </span>
        <span className="text-xs text-neutral-500 group-hover:text-pink-200/60 transition-colors">
          {item.desc}
        </span>
      </div>
    </div>
  );
}

export default function MathPage() {
  return (
    <main className="topic-page theme-math lg:px-16">
      <FloatingSymbols symbols={mathSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Mathematics"
        subtitle="The abstract study of quantity, structure, space, and change. It is the universal language used to describe patterns and solve problems."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* MAIN CONTENT: The Disciplines (8 cols) */}
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Calculator className="text-pink-400" />
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

        {/* SIDEBAR: Landscape & Mysteries (4 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          
          {/* The Mathematical Landscape */}
          <div className="glass p-6 rounded-2xl border border-pink-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-pink-200">
              <Scale className="text-pink-500" /> Map of Math
            </h3>
            <div className="flex flex-col gap-2">
              {landscape.map((step, index) => (
                <LandscapeStep key={step.title} item={step} isLast={index === landscape.length - 1} />
              ))}
            </div>
          </div>

          {/* Unsolved Conjectures */}
          <div className="glass p-2 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            <div className="px-4 pt-4 pb-2">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-pink-400">
                <HelpCircle size={16} /> Unsolved Mysteries
              </h3>
              <p className="text-xs text-neutral-500 mt-1">The frontier of human knowledge</p>
            </div>
            <div className="flex flex-col gap-1">
              {conjectures.map((c) => (
                 <ConjectureCard key={c.title} item={c} />
              ))}
            </div>
          </div>

          {/* Tool Tip */}
          <div className="p-5 rounded-xl border border-dashed border-neutral-700/50 bg-neutral-900/20">
            <h4 className="text-sm font-bold text-neutral-300 flex items-center gap-2 mb-2">
               <Lightbulb size={16} className="text-yellow-500" /> Proof
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              In math, we don't just gather evidence; we prove things. A <strong>Proof</strong> is a logical argument showing a statement must be true in all cases.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
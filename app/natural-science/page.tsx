"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Atom,
  FlaskConical,
  Dna,
  Earth,
  MoonStar,
  Microscope,
  Sprout,
  Orbit,
  Search,
  Telescope,
  Beaker,
  ChevronDown,
  HelpCircle,
  Zap
} from "@/components/icons";
import React from "react";
import Link from "next/link";

const naturalScienceSymbols = [
  "E=mc²", "H₂O", "DNA", "F=ma", "pH", "AU", "λ", "C₆H₁₂O₆",
];

// --- DATA: Core Disciplines ---
const disciplines = [
  {
    title: "Physics",
    desc: "The fundamental study of matter, energy, space, and time. It explains the mechanics of the universe.",
    href: "/natural-science/physics",
    Icon: Atom,
    className: "theme-physics",
  },
  {
    title: "Chemistry",
    desc: "The study of substances, properties, reactions, and the transformation of matter.",
    href: "/natural-science/chemistry",
    Icon: FlaskConical,
    className: "theme-chemistry",
  },
  {
    title: "Biology",
    desc: "The study of life. From molecular machinery to the evolution of ecosystems.",
    href: "/natural-science/biology",
    Icon: Dna,
    className: "theme-biology",
  },
  {
    title: "Earth Science",
    desc: "The study of the Earth's physical constitution, atmosphere, and processes.",
    href: "/natural-science/earth-science",
    Icon: Earth,
    className: "theme-earth-science",
  },
  {
    title: "Astronomy",
    desc: "The study of celestial objects, space, and the physical universe as a whole.",
    href: "/natural-science/astronomy",
    Icon: MoonStar,
    className: "theme-astronomy",
  },
];

// --- DATA: Scale of Reality ---
const scale = [
  { title: "Cosmic", val: "10²⁶m", Icon: Telescope },
  { title: "Planetary", val: "10⁷m", Icon: Earth },
  { title: "Macroscopic", val: "1m", Icon: Sprout },
  { title: "Microscopic", val: "10⁻⁶m", Icon: Microscope },
  { title: "Atomic", val: "10⁻¹⁰m", Icon: Atom },
  { title: "Quantum", val: "10⁻³⁵m", Icon: Orbit },
];

// --- DATA: The Frontier (New Rich Content) ---
const frontiers = [
  {
    title: "Dark Energy",
    desc: "95% of the universe is made of invisible matter and energy. What is it?",
    Icon: MoonStar,
    color: "text-purple-400"
  },
  {
    title: "Abiogenesis",
    desc: "How did life initially arise from non-living matter? The bridge from chem to bio.",
    Icon: Sprout,
    color: "text-green-400"
  },
  {
    title: "Quantum Gravity",
    desc: "Unifying General Relativity (gravity) with Quantum Mechanics. The Theory of Everything.",
    Icon: Orbit,
    color: "text-blue-400"
  }
];

// --- COMPONENT: Topic Card ---
function TopicCard({ item }: { item: typeof disciplines[0] }) {
  return (
    <Link href={item.href} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 p-6 transition-all hover:border-white/20 hover:bg-neutral-900/60 hover:-translate-y-1">
       <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent`} />
       <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300 group-hover:scale-110 transition-transform duration-300">
         <item.Icon size={24} />
       </div>
       <h3 className="text-xl font-bold text-neutral-100 mb-2">{item.title}</h3>
       <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
    </Link>
  );
}

// --- COMPONENT: Scale Meter ---
function ScaleMeter({ item, isLast }: { item: typeof scale[0]; isLast: boolean }) {
  return (
    <div className="relative flex items-center justify-between group py-2.5">
       <div className="flex items-center gap-3">
         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 transition-colors group-hover:bg-emerald-900/50 group-hover:text-emerald-400">
            <item.Icon size={14} />
         </div>
         <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors">
           {item.title}
         </span>
       </div>
       <span className="font-mono text-xs text-neutral-600 group-hover:text-emerald-500/60 transition-colors">
         {item.val}
       </span>
       {!isLast && <div className="absolute left-4 top-9 h-4 w-px border-l border-dashed border-neutral-800" />}
    </div>
  );
}

// --- COMPONENT: Frontier Card (New) ---
function FrontierCard({ item }: { item: typeof frontiers[0] }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-neutral-800 hover:bg-neutral-900/30 transition-colors">
      <div className={`mt-1 shrink-0 ${item.color}`}>
        <item.Icon size={20} />
      </div>
      <div>
        <h4 className="font-bold text-neutral-200 text-sm">{item.title}</h4>
        <p className="text-xs text-neutral-400 leading-relaxed mt-1">{item.desc}</p>
      </div>
    </div>
  );
}

export default function NaturalSciencePage() {
  return (
    <main className="topic-page theme-natural-science lg:px-16">
      <FloatingSymbols symbols={naturalScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Natural Sciences"
        subtitle="The systematic study of the physical universe. From the smallest particles to the largest galaxies, natural science seeks to describe, predict, and understand natural phenomena."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* MAIN CONTENT: Disciplines (8 cols) */}
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Beaker className="text-emerald-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Core Disciplines</h2>
          </div>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {disciplines.map((branch) => (
              <TopicCard key={branch.title} item={branch} />
            ))}
          </section>
          
          {/* Methodology Box (Moved to Main for importance) */}
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-900/5 p-6">
             <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-2">
               <Search size={18} /> The Scientific Method
             </h3>
             <p className="text-sm text-neutral-400">
               Science is not just a collection of facts; it is a <strong>process</strong>. It relies on observation, hypothesis testing, rigorous experimentation, and peer review to build a reliable model of reality.
             </p>
          </div>
        </div>

        {/* SIDEBAR: Scale & Frontiers (4 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          
          {/* The Scale Widget */}
          <div className="glass p-6 rounded-2xl border border-emerald-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-4 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-emerald-500/80 border-b border-emerald-900/30 pb-2">
              Scale of Reality
            </h3>
            <div className="flex flex-col gap-1">
              {scale.map((step, index) => (
                <ScaleMeter key={step.title} item={step} isLast={index === scale.length - 1} />
              ))}
            </div>
          </div>

          {/* The Frontier (Mysteries) */}
          <div className="glass p-2 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            <div className="px-4 pt-4 pb-2">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-purple-400">
                <HelpCircle size={16} /> The Frontier
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Major unsolved problems</p>
            </div>
            <div className="flex flex-col">
              {frontiers.map((f) => (
                 <FrontierCard key={f.title} item={f} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
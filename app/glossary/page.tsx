// app/glossary/page.tsx
"use client";

import FloatingSymbols from "@/components/FloatingSymbols";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
// NEW: Added Waypoints and Calculator
import { BookMarked, Layers, Network, Waypoints, Calculator } from "lucide-react";
import { glossaryTerms } from "@/lib/glossary-db"; // <-- IMPORT THE DB

const knowledgeSymbols = [ "✦", "✧", "✹", "✺", "◇", "◆", "⌘",  "∞", "⚙", "⚛", "🜚", "🝗", ];

// REWORKED: Added new sections for math terms
const glossarySections = [
  {
    id: "foundation",
    title: "Foundational Language",
    desc: "Core terminology that appears across subjects — perfect for quick refreshers before diving into lessons.",
    Icon: BookMarked,
    entries: ["Abstraction", "Model", "Heuristic"],
  },
  {
    id: "methods",
    title: "Problem-Solving Methods",
    desc: "Strategies, frameworks, and thinking patterns you’ll reuse in mathematics, science, and programming.",
    Icon: Layers,
    entries: ["Decomposition", "Iteration", "Proof"],
  },
  {
    id: "connections",
    title: "Cross-Disciplinary Connections",
    desc: "Terms that help you translate insights between math, computing, and real-world systems.",
    Icon: Network,
    entries: ["Feedback Loop", "Symmetry", "Optimization"],
  },
  // --- NEW SECTION ---
  {
    id: "number-systems",
    title: "Number Systems",
    desc: "The fundamental types of numbers, from simple counting to complex analysis.",
    Icon: Waypoints,
    entries: [
      "Number System",
      "Natural Numbers",
      "Whole Numbers",
      "Integers",
      "Rational Numbers",
      "Irrational Numbers",
      "Real Numbers",
      "Imaginary Unit",
      "Complex Numbers",
    ],
  },
  // --- NEW SECTION ---
  {
    id: "algebraic-ops",
    title: "Algebraic Operations",
    desc: "The core rules and concepts for manipulating numbers and variables.",
    Icon: Calculator,
    entries: [
      "Commutative Property",
      "Associative Property",
      "Identity Property",
      "Additive Identity",
      "Multiplicative Identity",
      "Inverse Property",
      "Additive Inverse",
      "Multiplicative Inverse",
      "Distributive Property",
      "Order of Operations",
      "Absolute Value",
      "Factor",
      "Multiple",
      "Greatest Common Factor",
      "Least Common Multiple",
      "Ratio",
      "Rate",
      "Percentage",
    ],
  },
];

export default function GlossaryPage() {
  return (<main className="topic-page theme-glossary lg:px-16">
      <FloatingSymbols symbols={knowledgeSymbols} />

      <PageHeader
        eyebrow="Reference Hub"
        title="Glossary"
        subtitle="Browse the recurring language of the Ed Dev Protocol. Each entry connects patterns across disciplines so the same idea feels familiar wherever you encounter it."
      />

      <section className="topic-grid">
        {glossarySections.map(({ id, title, desc, Icon }) => (
          <TopicCard key={id} href={`#${id}`} title={title} desc={desc} Icon={Icon} />
        ))}
      </section>

      {/* REWORKED: Adjusted grid columns for potentially 5 items */}
      <div className="grid w-full max-w-7xl gap-8 text-left md:grid-cols-2 xl:grid-cols-3">
        {glossarySections.map(({ id, title, entries }) => (
          <article key={id} id={id} className="glass border border-white/10 p-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-header)]">{title}</h2>
            <ul className="mt-6 space-y-4">
              {/* This part correctly reads from the DB */}
              {entries.map((term) => (
                <li key={term} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-title)]">
                    {term}
                  </p>
                  <p className="mt-2 text-sm text-neutral-300">{glossaryTerms[term as keyof typeof glossaryTerms]}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
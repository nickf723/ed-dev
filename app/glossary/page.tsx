// app/glossary/page.tsx
"use client";

import FloatingSymbols from "@/components/FloatingSymbols";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import { BookMarked, Layers, Network } from "lucide-react";

const knowledgeSymbols = [ "✦", "✧", "✹", "✺", "◇", "◆", "⌘",  "∞", "⚙", "⚛", "🜚", "🝗", ];

const glossarySections = [
  {
    id: "foundation",
    title: "Foundational Language",
    desc: "Core terminology that appears across subjects — perfect for quick refreshers before diving into lessons.",
    Icon: BookMarked,
    entries: [
      {
        term: "Abstraction",
        definition: "Simplifying a system by focusing on the essential pattern or rule and ignoring unnecessary detail.",
      },
      {
        term: "Model",
        definition: "A representation that captures how something works, often expressed with diagrams, formulas, or code.",
      },
      {
        term: "Heuristic",
        definition: "A rule of thumb that guides problem solving when an exact method is impractical or unknown.",
      },
    ],
  },
  {
    id: "methods",
    title: "Problem-Solving Methods",
    desc: "Strategies, frameworks, and thinking patterns you’ll reuse in mathematics, science, and programming.",
    Icon: Layers,
    entries: [
      {
        term: "Decomposition",
        definition: "Breaking a complex challenge into smaller parts that are easier to understand and solve.",
      },
      {
        term: "Iteration",
        definition: "Repeating a process with feedback so each pass improves on the last.",
      },
      {
        term: "Proof",
        definition: "A logical argument that demonstrates why a statement must be true in every valid case.",
      },
    ],
  },
  {
    id: "connections",
    title: "Cross-Disciplinary Connections",
    desc: "Terms that help you translate insights between math, computing, and real-world systems.",
    Icon: Network,
    entries: [
      {
        term: "Feedback Loop",
        definition: "When the output of a system circles back as input, amplifying or dampening future behavior.",
      },
      {
        term: "Symmetry",
        definition: "A transformation that leaves an object unchanged — a shared idea in art, physics, and algorithms.",
      },
      {
        term: "Optimization",
        definition: "Finding the best solution under given constraints, whether that’s cost, time, or accuracy.",
      },
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

      <div className="grid w-full max-w-5xl gap-8 text-left lg:grid-cols-2">
        {glossarySections.map(({ id, title, entries }) => (
          <article key={id} id={id} className="glass border border-white/10 p-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-header)]">{title}</h2>
            <ul className="mt-6 space-y-4">
              {entries.map(({ term, definition }) => (
                <li key={term} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-title)]">
                    {term}
                  </p>
                  <p className="mt-2 text-sm text-neutral-300">{definition}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}

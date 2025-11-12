// app/glossary/page.tsx
"use client";

import FloatingSymbols from "@/components/FloatingSymbols";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import { BookMarked, Layers, Network } from "lucide-react";
import { glossaryTerms } from "@/lib/glossary-db"; // <-- IMPORT THE DB

const knowledgeSymbols = [ "✦", "✧", "✹", "✺", "◇", "◆", "⌘",  "∞", "⚙", "⚛", "🜚", "🝗", ];

// REWORKED: This array now just defines the *structure*
// The definitions are pulled from the glossary-db.ts
const glossarySections = [
  {
    id: "foundation",
    title: "Foundational Language",
    desc: "Core terminology that appears across subjects — perfect for quick refreshers before diving into lessons.",
    Icon: BookMarked,
    // This array now just lists the *keys* from the database
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
              {/* REWORKED: Map over the entry keys and pull def from the imported db */}
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
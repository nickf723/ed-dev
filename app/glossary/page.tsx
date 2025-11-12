// app/glossary/page.tsx
"use client";

import FloatingSymbols from "@/components/FloatingSymbols";
import PageHeader from "@/components/PageHeader";
// REWORKED: Removed unused icons
import { glossaryTerms, termCategories, GlossaryTermKey } from "@/lib/glossary-db"; // <-- IMPORT THE DB

const knowledgeSymbols = [ "✦", "✧", "✹", "✺", "◇", "◆", "⌘",  "∞", "⚙", "⚛", "🜚", "🝗", ];

// NEW: Helper function to get tag styles
function getCategoryStyle(category: string): string {
  switch (category) {
    case termCategories.MATH_FOUNDATIONS:
      return "bg-cyan-400/20 text-cyan-300 border-cyan-400/30";
    case termCategories.NUMBER_SYSTEMS:
      return "bg-indigo-400/20 text-indigo-300 border-indigo-400/30";
    case termCategories.GENERAL:
    default:
      return "bg-neutral-700/30 text-neutral-400 border-neutral-700/50";
  }
}

export default function GlossaryPage() {
  // NEW: Get all terms and sort them alphabetically
  const allTerms = Object.keys(glossaryTerms).sort() as GlossaryTermKey[];
  
  return (<main className="topic-page theme-glossary lg:px-16">
      <FloatingSymbols symbols={knowledgeSymbols} />

      <PageHeader
        eyebrow="Reference Hub"
        title="Glossary"
        subtitle="A centralized, alphabetical dictionary of all key terms used across the knowledge network. Find any term from any subject."
      />

      {/* REWORKED: Removed the <section className="topic-grid"> */}

      {/* REWORKED: This is now one single article, centered */}
      <div className="w-full max-w-4xl text-left">
        <article className="glass border border-white/10 p-8 md:p-12">
          <ul className="space-y-6">
            {/* REWORKED: Map over the alphabetized list */}
            {allTerms.map((term) => {
              const { definition, category } = glossaryTerms[term];
              return (
                <li key={term} className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg font-semibold uppercase tracking-wide text-[var(--color-text-title)]">
                      {term}
                    </p>
                    <span
                      className={`mt-2 rounded-full px-2.5 py-0.5 text-xs font-medium border sm:mt-0 ${getCategoryStyle(
                        category
                      )}`}
                    >
                      {category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{definition}</p>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </main>
  );
}
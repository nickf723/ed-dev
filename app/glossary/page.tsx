// app/glossary/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import FloatingSymbols from "@/components/FloatingSymbols";
import PageHeader from "@/components/PageHeader";
import {
  glossaryTerms,
  termCategories,
  GlossaryTermKey,
} from "@/lib/glossary-db";
import { Search, X } from "lucide-react"; // Import icons for filter bar

const knowledgeSymbols = [
  "✦", "✧", "✹", "✺", "◇", "◆", "⌘", "∞", "⚙", "⚛", "🜚", "🝗",
];

// Helper function to get tag styles
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

// Get all terms and categories once
const allTerms = Object.keys(glossaryTerms).sort() as GlossaryTermKey[];
const allCategories = [
  ...new Set(
    Object.values(glossaryTerms).map((term) => term.category)
  ),
].sort();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter and group terms based on state
  const groupedTerms = useMemo(() => {
    // 1. Filter by category
    const categoryFiltered = selectedCategory
      ? allTerms.filter(
          (term) => glossaryTerms[term].category === selectedCategory
        )
      : allTerms;

    // 2. Filter by search text
    const searchFiltered = searchText
      ? categoryFiltered.filter((term) => {
          const item = glossaryTerms[term];
          const query = searchText.toLowerCase();
          return (
            term.toLowerCase().includes(query) ||
            item.definition.toLowerCase().includes(query)
          );
        })
      : categoryFiltered;

    // 3. Group by first letter
    return searchFiltered.reduce((acc, term) => {
      const firstLetter = term[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTermKey[]>);
  }, [searchText, selectedCategory]);

  const activeLetters = useMemo(() => Object.keys(groupedTerms), [groupedTerms]);

  return (
    <main className="topic-page theme-glossary lg:px-16">
      <FloatingSymbols symbols={knowledgeSymbols} />

      <PageHeader
        eyebrow="Reference Hub"
        title="Glossary"
        subtitle="A centralized, alphabetical dictionary of all key terms used across the knowledge network. Find any term from any subject."
      />

      {/* --- NEW: Filter Bar --- */}
      <div className="w-full max-w-7xl sticky top-0 z-20 bg-neutral-950/80 py-4 backdrop-blur-md">
        {/* A-Z Jump Links */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 px-4">
          {alphabet.map((letter) => {
            const isActive = activeLetters.includes(letter);
            return (
              <a
                key={letter}
                href={`#glossary-${letter}`}
                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold transition-colors ${
                  isActive
                    ? "text-cyan-300 hover:bg-cyan-800/50"
                    : "text-neutral-600 cursor-not-allowed"
                }`}
                onClick={(e) => {
                  if (!isActive) e.preventDefault();
                }}
              >
                {letter}
              </a>
            );
          })}
        </div>

        {/* Search and Category Filters */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative sm:col-span-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search all terms and definitions..."
              className="glass w-full rounded-lg border-neutral-700 bg-neutral-900/50 py-2.5 pl-10 pr-4 text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <Search
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
              aria-hidden="true"
            />
          </div>
          <select
            value={selectedCategory || "all"}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value === "all" ? null : e.target.value
              )
            }
            className="glass h-full rounded-lg border-neutral-700 bg-neutral-900/50 py-2.5 pl-3 pr-8 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="all">All Categories</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- REWORKED: Main Content Area --- */}
      <div className="w-full max-w-7xl text-left">
        <article className="glass border border-white/10 p-8 md:p-12">
          {/* REWORKED: Use columns and map over grouped terms */}
          <div className="columns-1 gap-x-12 md:columns-2">
            {activeLetters.length === 0 && (
              <p className="text-center text-neutral-400 md:col-span-2">
                No terms found for your query.
              </p>
            )}

            {activeLetters.map((letter) => (
              <section
                key={letter}
                className="mb-8 break-inside-avoid-column" // Prevents columns from breaking inside a letter group
              >
                <h2
                  id={`glossary-${letter}`}
                  className="sticky top-[152px] z-10 -ml-4 border-b border-neutral-800 bg-neutral-900/80 px-4 py-2 text-2xl font-bold text-cyan-300 backdrop-blur-sm"
                  style={{
                    // Pushes it "behind" the main filter bar
                    zIndex: 10, 
                  }}
                >
                  {letter}
                </h2>
                <ul className="mt-4 space-y-6">
                  {groupedTerms[letter].map((term) => {
                    const { definition, category } = glossaryTerms[term];
                    return (
                      <li
                        key={term}
                        className="rounded-xl border border-white/5 bg-white/5 p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-lg font-semibold uppercase tracking-wide text-[var(--color-text-title)]">
                            {term}
                          </p>
                          <span
                            className={`mt-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium border sm:mt-0 ${getCategoryStyle(
                              category
                            )}`}
                          >
                            {category}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-neutral-300">
                          {definition}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
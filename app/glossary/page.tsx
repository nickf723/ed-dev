"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import MatrixBackground from "@/app/glossary/MatrixBackground";
import FlashcardWidget from "@/app/glossary/FlashcardWidget";
import { glossaryTerms, termCategories, GlossaryTermKey } from "@/lib/glossary-db";
import { Search, Database, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Get all data once
const allTerms = Object.keys(glossaryTerms).sort() as GlossaryTermKey[];
const allCategories = [...new Set(Object.values(glossaryTerms).map((term) => term.category))].sort();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter logic
  const groupedTerms = useMemo(() => {
    const categoryFiltered = selectedCategory
      ? allTerms.filter((term) => glossaryTerms[term].category === selectedCategory)
      : allTerms;

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

    return searchFiltered.reduce((acc, term) => {
      const firstLetter = term[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTermKey[]>);
  }, [searchText, selectedCategory]);

  const activeLetters = useMemo(() => Object.keys(groupedTerms).sort(), [groupedTerms]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Matrix Background */}
      <MatrixBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Reference Hub"
          title="System Glossary"
          subtitle="The central database of definitions. Access key terms, axioms, and concepts from across the entire knowledge network."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8">
            
            {/* Search & Filter Bar */}
            <div className="sticky top-4 z-30 mb-8 flex flex-col gap-4 rounded-xl border border-cyan-500/30 bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-md lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search database..."
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-10 pr-4 text-sm text-cyan-100 placeholder-neutral-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                <select
                  value={selectedCategory || "all"}
                  onChange={(e) => setSelectedCategory(e.target.value === "all" ? null : e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-10 pr-8 text-sm text-cyan-100 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Alphabet Jump Bar */}
            <div className="mb-8 flex flex-wrap gap-1 px-2">
              {alphabet.map((letter) => {
                const isActive = activeLetters.includes(letter);
                return (
                  <a
                    key={letter}
                    href={isActive ? `#section-${letter}` : undefined}
                    className={`flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold transition-colors ${
                      isActive
                        ? "bg-cyan-900/50 text-cyan-300 hover:bg-cyan-500 hover:text-white cursor-pointer"
                        : "text-neutral-700 cursor-default"
                    }`}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>

            {/* Terms List */}
            <div className="space-y-12">
                {activeLetters.length === 0 && (
                    <div className="rounded-xl border border-dashed border-neutral-800 py-20 text-center">
                        <Database className="mx-auto mb-4 h-10 w-10 text-neutral-700" />
                        <p className="text-neutral-500">No records found in archives.</p>
                    </div>
                )}

                {activeLetters.map((letter) => (
                    <section key={letter} id={`section-${letter}`} className="scroll-mt-24">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-xl font-black text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                {letter}
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-900/50 to-transparent" />
                        </div>

                        <div className="grid gap-4">
                            {groupedTerms[letter].map((term) => {
                                const item = glossaryTerms[term];
                                return (
                                    <motion.div
                                        key={term}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="group relative overflow-hidden rounded-lg border border-white/5 bg-neutral-900/40 p-5 transition-all hover:border-cyan-500/30 hover:bg-neutral-900/80"
                                    >
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <h4 className="font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors">
                                                {term}
                                            </h4>
                                            <span className="inline-flex rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-400 border border-white/5">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300">
                                            {item.definition}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="hidden lg:col-span-4 lg:block lg:sticky lg:top-4 h-fit space-y-6">
            
            {/* Flashcard Widget */}
            <FlashcardWidget />

            {/* Stats Box */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Database Stats</h3>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-white">{allTerms.length}</span>
                    <span className="mb-1 text-sm font-medium text-cyan-500">Total Definitions</span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                    <div className="h-full bg-cyan-500 w-[75%]" />
                </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
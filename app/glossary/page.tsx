"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import MatrixBackground from "@/app/glossary/MatrixBackground";
import FlashcardWidget from "@/app/glossary/FlashcardWidget";
import { glossaryTerms, termCategories, GlossaryTermKey } from "@/lib/glossary-db";
import { Search, Database, Filter, ArrowUpRight, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";

const allTerms = Object.keys(glossaryTerms).sort() as GlossaryTermKey[];
const allCategories = [...new Set(Object.values(glossaryTerms).map((term) => term.category))].sort();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const activeLetters = Object.keys(groupedTerms).sort();

  return (
    <main className="relative min-h-screen bg-neutral-950">
      
      <MatrixBackground />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 py-10">
        
        <PageHeader
          eyebrow="The Index"
          title="Glossary"
          subtitle="A high-density definition matrix connecting all domains."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* LEFT: CONTROLS & WIDGETS (3 Cols) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
             
             {/* SEARCH POD */}
             <div className="rounded-xl border border-cyan-500/20 bg-neutral-900/80 p-4 backdrop-blur-md shadow-xl">
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Filter matrix..."
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-9 pr-2 text-xs text-cyan-100 placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                    <select
                      value={selectedCategory || "all"}
                      onChange={(e) => setSelectedCategory(e.target.value === "all" ? null : e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-9 pr-4 text-xs text-cyan-100 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="all">All Domains</option>
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                </div>
             </div>

             {/* STATS POD */}
             <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Database Size</span>
                    <Database size={12} className="text-cyan-600" />
                </div>
                <div className="text-3xl font-black text-white">{allTerms.length} <span className="text-xs font-normal text-neutral-500">records</span></div>
             </div>

             {/* FLASHCARD WIDGET (Compact) */}
             <FlashcardWidget />

             {/* JUMP BAR */}
             <div className="flex flex-wrap gap-1 p-2 rounded-xl border border-neutral-800 bg-neutral-900/30">
                {alphabet.map((letter) => {
                    const isActive = activeLetters.includes(letter);
                    return (
                    <a
                        key={letter}
                        href={isActive ? `#section-${letter}` : undefined}
                        className={`flex h-6 w-6 items-center justify-center rounded text-[9px] font-bold transition-all ${
                        isActive
                            ? "bg-cyan-950 text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-800"
                            : "text-neutral-800 cursor-default"
                        }`}
                    >
                        {letter}
                    </a>
                    );
                })}
             </div>
          </div>

          {/* RIGHT: THE CONTENT MASONRY (9 Cols) */}
          <div className="lg:col-span-9">
            {activeLetters.length === 0 && (
                <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/20">
                    <div className="text-center">
                        <Database className="mx-auto mb-2 h-8 w-8 text-neutral-700" />
                        <p className="text-sm text-neutral-500">Query returned 0 results.</p>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {activeLetters.map((letter) => (
                    <section key={letter} id={`section-${letter}`} className="scroll-mt-24">
                        {/* Letter Header */}
                        <div className="sticky top-0 z-20 mb-4 flex items-center gap-4 bg-neutral-950/90 py-2 backdrop-blur">
                            <span className="flex h-8 w-8 items-center justify-center rounded border border-cyan-500/20 bg-cyan-950/50 text-sm font-black text-cyan-400">
                                {letter}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-900/30 to-transparent" />
                        </div>

                        {/* MASONRY LAYOUT */}
                        <div className="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
                            {groupedTerms[letter].map((term) => {
                                const item = glossaryTerms[term];
                                return (
                                    <div
                                        key={term}
                                        className="break-inside-avoid-column group relative overflow-hidden rounded-lg border border-white/5 bg-neutral-900/60 hover:bg-neutral-900 transition-all hover:border-cyan-500/30"
                                    >
                                        <div className="p-3">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h4 className="text-sm font-bold text-cyan-100 group-hover:text-cyan-400 leading-tight">
                                                    {term}
                                                </h4>
                                                
                                                {item.href && (
                                                    <Link 
                                                        href={item.href}
                                                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-cyan-900 rounded text-cyan-400"
                                                        title="Go to Lesson"
                                                    >
                                                        <ArrowUpRight size={12} />
                                                    </Link>
                                                )}
                                            </div>
                                            
                                            <p className="text-xs leading-relaxed text-neutral-400 group-hover:text-neutral-300 mb-3">
                                                {item.definition}
                                            </p>

                                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-600 group-hover:text-cyan-600/80">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
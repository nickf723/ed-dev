"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import MatrixBackground from "@/app/glossary/MatrixBackground";
import FlashcardWidget from "@/app/glossary/FlashcardWidget";
import { ALL_VOCAB, VocabTerm } from "@/app/_data/vocab/_registry";
import { Search, Database, Filter, ArrowUpRight, EyeOff, Eye, ArrowRight } from "lucide-react";

const allDomains = [...new Set(ALL_VOCAB.map((term) => term.domain))].sort();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  // Safe Mode State with localStorage persistence
  const [hideAdult, setHideAdult] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true);
      const savedSafeMode = localStorage.getItem('vocab_safe_mode');
      if (savedSafeMode !== null) {
          setHideAdult(savedSafeMode === 'true');
      }
  }, []);

  const toggleSafeMode = () => {
      const newState = !hideAdult;
      setHideAdult(newState);
      localStorage.setItem('vocab_safe_mode', String(newState));
  };

  const groupedTerms = useMemo(() => {
    // 1. Filter by Domain
    const domainFiltered = selectedDomain
      ? ALL_VOCAB.filter((term) => term.domain === selectedDomain)
      : ALL_VOCAB;

    // 2. Filter by Safe Mode
    const safeFiltered = hideAdult 
      ? domainFiltered.filter(term => !term.isAdult)
      : domainFiltered;

    // 3. Filter by Search Query
    const searchFiltered = searchText
      ? safeFiltered.filter((term) => {
          const query = searchText.toLowerCase();
          return (
            term.word.toLowerCase().includes(query) ||
            term.definition.toLowerCase().includes(query) ||
            term.tags.some(tag => tag.toLowerCase().includes(query))
          );
        })
      : safeFiltered;

    // 4. Group by First Letter
    return searchFiltered.reduce((acc, term) => {
      // Handle edge cases where a word might start with a number or symbol
      const firstChar = term.word[0].toUpperCase();
      const groupKey = alphabet.includes(firstChar) ? firstChar : "#";
      
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(term);
      return acc;
    }, {} as Record<string, VocabTerm[]>);
  }, [searchText, selectedDomain, hideAdult]);

  // Sort the grouped keys alphabetically (putting '#' at the end if it exists)
  const activeLetters = Object.keys(groupedTerms).sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
  });

  // Prevent hydration mismatch on the client
  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen bg-neutral-950 font-sans">
      
      <MatrixBackground />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* LEFT: CONTROLS & WIDGETS (3 Cols) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
             
             {/* SEARCH POD */}
             <div className="rounded-xl border border-cyan-500/20 bg-neutral-900/80 p-4 backdrop-blur-md shadow-xl flex flex-col gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Filter matrix..."
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-9 pr-2 text-xs text-cyan-100 placeholder-neutral-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                </div>
                
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                    <select
                      value={selectedDomain || "all"}
                      onChange={(e) => setSelectedDomain(e.target.value === "all" ? null : e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-700 bg-neutral-950 py-2 pl-9 pr-4 text-xs text-cyan-100 focus:border-cyan-500 focus:outline-none transition-colors"
                    >
                      <option value="all">All Domains</option>
                      {allDomains.map((domain) => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                </div>

                {/* Safe Mode Toggle */}
                <button 
                    onClick={toggleSafeMode}
                    className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        hideAdult 
                            ? 'bg-emerald-950/40 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-900/60' 
                            : 'bg-rose-950/40 text-rose-500 border border-rose-500/30 hover:bg-rose-900/60'
                    }`}
                >
                    {hideAdult ? <EyeOff size={14} /> : <Eye size={14} />}
                    {hideAdult ? 'Safe Mode: ON' : 'Unrestricted'}
                </button>
             </div>

             {/* STATS POD */}
             <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Indexed Records</span>
                    <Database size={12} className="text-cyan-600" />
                </div>
                <div className="text-3xl font-black text-white">
                    {Object.values(groupedTerms).flat().length} 
                    <span className="text-xs font-normal text-neutral-500 ml-2">/ {ALL_VOCAB.length}</span>
                </div>
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
                            {groupedTerms[letter].map((term) => (
                                <div
                                    key={term.id}
                                    className="break-inside-avoid-column group relative overflow-hidden rounded-lg border border-white/5 bg-neutral-900/60 hover:bg-neutral-900 transition-all hover:border-cyan-500/30 shadow-lg"
                                >
                                    <div className="p-4">
                                        
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="text-base font-bold text-cyan-100 group-hover:text-cyan-400 leading-tight transition-colors">
                                                    {term.word}
                                                </h4>
                                                {term.isAdult && (
                                                    <span className="text-[8px] font-bold bg-rose-950/80 text-rose-400 px-1 py-0.5 rounded uppercase tracking-widest border border-rose-500/30">
                                                        Mature
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {/* Assuming you might add an 'href' to terms later to link to full lesson pages */}
                                            <Link 
                                                href={`/subject/${term.domain.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-cyan-900/50 rounded text-cyan-400 border border-transparent hover:border-cyan-500/30"
                                                title={`Go to ${term.domain} Hub`}
                                            >
                                                <ArrowUpRight size={14} />
                                            </Link>
                                        </div>
                                        
                                        {/* Definition */}
                                        <p className="text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 mb-4 font-light">
                                            {term.definition}
                                        </p>

                                        {/* Tags & Domain Footer */}
                                        <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-600 group-hover:text-cyan-600/80 transition-colors">
                                                    {term.domain}
                                                </span>
                                                
                                                {/* Tags */}
                                                {term.tags && term.tags.length > 0 && (
                                                    <div className="flex gap-1">
                                                        {term.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="text-[8px] font-mono text-neutral-500 bg-black px-1.5 py-0.5 rounded border border-neutral-800">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {term.tags.length > 2 && <span className="text-[8px] text-neutral-600">+{term.tags.length - 2}</span>}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Cross-References */}
                                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-500/50 group-hover:text-cyan-400/80 transition-colors">
                                                    <ArrowRight size={10} />
                                                    <span className="truncate">See: {term.relatedTerms.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
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
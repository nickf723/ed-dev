"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HalloweenBackground from "./HalloweenBackground";

import { useWikiCulture, CultureRecord } from "../../_lib/useWikiCulture"; 
import { MONSTER_META } from "./halloween-data"; // Our new stat block
import { ArrowLeft, Skull, BookOpen, Search, Flame, Moon, Ghost, Quote, ShieldAlert } from "lucide-react";

export default function HalloweenPage() {
  // 1. FETCH LIVE DATA
  const { data: monsters, loading, searchEntry } = useWikiCulture("HALLOWEEN_MONSTERS");
  
  const [selected, setSelected] = useState<CultureRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Select first item once loaded
  useEffect(() => {
      if (monsters.length > 0 && !selected) {
          setSelected(monsters[0]);
      }
  }, [monsters, selected]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(searchTerm) searchEntry(searchTerm);
  };

  // 2. MERGE DATA
  // Get local stats for the selected monster (or default to generic if not found)
  const stats = selected ? MONSTER_META[selected.title] || { 
      origin: "Unknown Folklore", 
      type: "Unknown Entity", 
      weakness: "Unknown", 
      quote: "The archives are silent on this subject." 
  } : null;

  return (
    <main className="min-h-screen bg-[#050505] text-stone-300 font-sans relative overflow-hidden selection:bg-orange-500/30">
      
      {/* 1. ATMOSPHERE ENGINE */}
      <HalloweenBackground />
      {/* Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] pointer-events-none z-0" />
      {/* Fog Floor */}
      <div className="fixed bottom-0 inset-x-0 h-96 bg-gradient-to-t from-orange-950/20 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
                <Link href="/humanities/culture/holidays" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 hover:text-white transition-colors mb-6">
                    <ArrowLeft size={10} /> The Calendar
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-stone-100 tracking-tighter mb-2 flex items-center gap-4 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                    BESTIARY <Skull className="text-orange-600 animate-pulse" size={48} />
                </h1>
                <p className="text-stone-500 font-mono text-xs uppercase tracking-widest">
                    The Archive of Shadows // Wikipedia API Connected
                </p>
            </div>
            
            {/* SEARCH */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-stone-900/50 border border-stone-800 rounded-full px-4 py-2 focus-within:border-orange-600 transition-colors backdrop-blur-md">
                <Search size={14} className="text-stone-500" />
                <input 
                    type="text" 
                    placeholder="Summon entity..." 
                    className="bg-transparent border-none outline-none text-xs font-mono uppercase text-stone-300 w-48 placeholder:text-stone-700"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </form>
        </header>

        {/* LOADING STATE */}
        {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-orange-800 animate-pulse">
                <Ghost size={48} className="mb-4" />
                <div className="text-xs font-mono uppercase tracking-widest">Communing with the Dead...</div>
            </div>
        )}

        {/* MAIN CONSOLE */}
        {!loading && selected && stats && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* LEFT COL: THE LIST */}
            <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto max-h-[70vh] custom-scrollbar pr-2">
                {monsters.map((m) => {
                    const isActive = selected.id === m.id;
                    return (
                        <button 
                            key={m.id}
                            onClick={() => setSelected(m)}
                            className={`
                                group flex items-center gap-4 p-3 rounded-xl border text-left transition-all duration-300
                                ${isActive 
                                    ? "bg-orange-950/30 border-orange-600/50 shadow-[0_0_20px_rgba(234,88,12,0.15)] translate-x-2" 
                                    : "bg-stone-900/40 border-stone-800 hover:border-stone-600 hover:bg-stone-900/60"}
                            `}
                        >
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center border font-black text-lg overflow-hidden relative shrink-0 transition-colors
                                ${isActive ? "border-orange-600 text-orange-600 bg-black" : "border-stone-800 text-stone-700 bg-stone-950"}
                            `}>
                               {m.thumbnail ? (
                                   <img src={m.thumbnail ?? undefined} alt={m.title} className="w-full h-full object-cover opacity-80" />
                               ) : (
                                   <span>{m.title[0]}</span>
                               )}
                            </div>
                            
                            <div>
                                <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 line-clamp-1 ${isActive ? "text-orange-500" : "text-stone-400 group-hover:text-stone-200"}`}>
                                    {m.title.replace(/_/g, " ")}
                                </div>
                                <div className="text-[9px] font-mono text-stone-600 uppercase line-clamp-1">
                                    {MONSTER_META[m.title]?.type || "Entity"}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* RIGHT COL: THE DOSSIER */}
            <div className="lg:col-span-8 flex flex-col h-full">
                <div className="flex-1 bg-stone-900/30 border border-stone-800 rounded-3xl overflow-hidden relative backdrop-blur-md flex flex-col md:flex-row shadow-2xl">
                    
                    {/* DOSSIER VISUAL */}
                    <div className="w-full md:w-5/12 relative bg-black border-b md:border-b-0 md:border-r border-stone-800 group">
                        {/* Visual Logic:
                            1. Use Wiki Thumb if available (it's accurate).
                            2. If Wiki Thumb is missing or low-res, fall back to VisualMedia stock photo.
                        */}
                        
                             <img 
                                src={selected.thumbnail ?? undefined} 
                                alt={selected.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" 
                             />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="inline-block px-2 py-1 bg-orange-600 text-black text-[9px] font-bold uppercase tracking-widest rounded mb-3 shadow-[0_0_10px_rgba(234,88,12,0.5)]">
                                {stats.type}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-none uppercase drop-shadow-lg mb-4">
                                {selected.title.replace(/_/g, " ")}
                            </h2>
                            <blockquote className="text-stone-400 text-xs italic font-serif border-l-2 border-orange-800 pl-3">
                                "{stats.quote}"
                            </blockquote>
                        </div>
                    </div>

                    {/* DOSSIER DATA */}
                    <div className="w-full md:w-7/12 p-8 flex flex-col gap-8 overflow-y-auto max-h-[80vh] custom-scrollbar bg-black/20">
                        
                        {/* Origin Block */}
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-900/40 border border-stone-800/50">
                            <div className="p-2 bg-stone-950 rounded border border-stone-800 text-stone-500">
                                <BookOpen size={16} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">
                                    Cultural Origin
                                </h3>
                                <p className="text-stone-300 font-serif text-lg leading-relaxed text-orange-100/90">
                                    {stats.origin}
                                </p>
                            </div>
                        </div>

                        {/* Wiki Extract */}
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
                                <Moon size={12} /> Archive Summary
                            </h3>
                            <p className="text-stone-400 text-sm leading-7 text-justify">
                                {selected.extract}
                            </p>
                        </div>

                        {/* Weakness Block (The Spooky Footer) */}
                        <div className="mt-auto">
                             <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-3 flex items-center gap-2 animate-pulse">
                                <ShieldAlert size={12} /> Known Weaknesses
                            </h3>
                            <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/30">
                                <p className="text-red-400 font-mono text-xs uppercase tracking-wide">
                                    {stats.weakness}
                                </p>
                            </div>
                        </div>
                        
                        <div className="text-[9px] font-mono text-stone-700 text-center uppercase">
                            Wiki Page ID: {selected.id}
                        </div>

                    </div>

                </div>
            </div>

        </div>
        )}

      </div>
    </main>
  );
}
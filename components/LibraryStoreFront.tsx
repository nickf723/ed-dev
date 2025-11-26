"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UNIVERSAL_LIBRARY, CATEGORIES, ConceptEntry } from "@/lib/universal-db";
import { Search, Globe, BookOpen, X, Volume2 } from "lucide-react";

export default function LibraryStorefront() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ConceptEntry | null>(null);

  // Filter Logic
  const filteredItems = UNIVERSAL_LIBRARY.filter(item => {
      const matchesCat = activeCat === "All" || item.category === activeCat;
      const matchesSearch = item.english.toLowerCase().includes(search.toLowerCase()) || 
                            item.translations.some(t => t.word.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      
      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all
                        ${activeCat === cat 
                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                            : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"}
                    `}
                  >
                      {cat}
                  </button>
              ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-hover:text-white transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search the archive..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
          </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer relative aspect-square rounded-2xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-800/60 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center p-4"
                  >
                      <span className="text-4xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300 scale-90 group-hover:scale-110">
                          {item.icon}
                      </span>
                      <h3 className="font-bold text-neutral-200 group-hover:text-white">{item.english}</h3>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{item.category}</span>
                      
                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
              ))}
          </AnimatePresence>
      </div>

      {/* MODAL (The "Deep Dive") */}
      <AnimatePresence>
          {selectedItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-4">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedItem(null)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                      {/* Header */}
                      <div className="relative h-32 bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center border-b border-white/5">
                          <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
                              <X size={20} />
                          </button>
                          <div className="text-center">
                              <span className="text-6xl drop-shadow-2xl">{selectedItem.icon}</span>
                              <h2 className="text-2xl font-black text-white mt-2">{selectedItem.english}</h2>
                          </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                          <div className="flex items-start gap-3 mb-8 bg-white/5 p-4 rounded-lg border border-white/5">
                              <BookOpen className="text-cyan-400 mt-1 shrink-0" size={20} />
                              <p className="text-sm text-neutral-300 leading-relaxed">{selectedItem.desc}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedItem.translations.map((trans) => (
                                  <div key={trans.lang} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                                      <div>
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                                              {trans.lang}
                                          </span>
                                          <div className="flex items-baseline gap-2">
                                              <span className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                                                  {trans.word}
                                              </span>
                                              <span className="text-xs font-mono text-neutral-500">
                                                  {trans.pronunciation}
                                              </span>
                                          </div>
                                          {trans.notes && (
                                              <p className="text-[10px] text-neutral-400 mt-1 italic">
                                                  Note: {trans.notes}
                                              </p>
                                          )}
                                      </div>
                                      <button className="p-2 rounded-full hover:bg-white/10 text-neutral-600 hover:text-cyan-400 transition-colors">
                                          <Volume2 size={16} />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>

                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
}
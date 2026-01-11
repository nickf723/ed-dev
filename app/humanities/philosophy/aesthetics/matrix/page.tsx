"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import LibraryBackground from "../components/LibraryBackground";
import { 
  AESTHETICS_DB, 
  CategoryKey, 
  PARENT_CATEGORIES, 
  ParentCategory,
  AestheticItem 
} from "../data/aesthetics"; 

import { 
  ArrowLeft, Shirt, Landmark, 
  Cpu, Car, Utensils, 
  Armchair, Film, Music, 
  Brain, Zap, ArrowRight,
  Maximize2, Filter, Layers,
  Shuffle, Lock, Search
} from "lucide-react";
import { useLiveFeed } from './useLiveFeed'
// --- CONFIGURATION ---
const ORDERED_CATEGORIES: CategoryKey[] = [
  'fashion', 'architecture', 'interior', 
  'transport', 'tech', 'media', 
  'cuisine', 'music', 'activities', 'philosophy'
];

const CATEGORY_ICONS: Record<CategoryKey, React.ElementType> = {
  fashion: Shirt, architecture: Landmark, tech: Cpu, transport: Car,
  cuisine: Utensils, interior: Armchair, media: Film, music: Music,
  philosophy: Brain, activities: Zap
};



export default function AestheticMatrixPage() {
  // --- STATE ---
  const [parentFilter, setParentFilter] = useState<ParentCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAestheticId, setActiveAestheticId] = useState(AESTHETICS_DB[0].id);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  // --- DERIVED DATA ---
  const activeProfile = useMemo(() => 
    AESTHETICS_DB.find(a => a.id === activeAestheticId) || AESTHETICS_DB[0],
  [activeAestheticId]);

  const sidebarList = useMemo(() => {
    let list = AESTHETICS_DB;
    // Filter by Parent
    if (parentFilter !== 'All') {
        list = list.filter(a => a.parentCategory === parentFilter);
    }
    // Filter by Search
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(a => 
            a.name.toLowerCase().includes(q) || 
            a.tags.some(t => t.toLowerCase().includes(q))
        );
    }
    return list;
  }, [parentFilter, searchQuery]);

  // Reset variant index when switching categories
  useEffect(() => {
    setActiveVariantIndex(0);
  }, [activeCategory, activeAestheticId]);

  // Get current artifact data
  const currentItems = activeCategory ? activeProfile.items[activeCategory] : [];
  const currentArtifact = activeCategory && activeProfile.items[activeCategory]
    ? activeProfile.items[activeCategory]![activeVariantIndex]
    : null;

// 3. USE THE HOOK
// Pass the current item and the profile's collection ID
const activeImageUrl = useLiveFeed(currentArtifact, activeProfile.unsplashCollectionId);

// 4. The Fallback Generator (If API is loading or fails)
const getFallbackUrl = () => {
    if (!currentArtifact) return "";
    const encodedText = encodeURIComponent(currentArtifact.title);
    const encodedColor = activeProfile.color.replace('#', '');
    return `https://placehold.co/800x600/${encodedColor}/FFF?text=${encodedText}&font=playfair-display`;
};

  // Completeness Ring Math
  const availableKeys = Object.keys(activeProfile.items);
  const completeness = Math.round((availableKeys.length / 10) * 100);
  const radius = 18; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completeness / 100) * circumference;

  // --- ACTIONS ---
  const switchAesthetic = (newId: string) => {
    const newProfile = AESTHETICS_DB.find(a => a.id === newId);
    setActiveAestheticId(newId);
    // If the new world doesn't have the active category, reset to overview
    if (activeCategory && newProfile && !newProfile.items[activeCategory]) {
        setActiveCategory(null);
    }
  };

  const randomize = () => {
      const randomProfile = sidebarList[Math.floor(Math.random() * sidebarList.length)];
      if (randomProfile) switchAesthetic(randomProfile.id);
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-stone-200 font-sans selection:bg-rose-500/30 flex overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <LibraryBackground />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none z-0" />

      {/* 2. SIDEBAR RAIL */}
      <aside className="relative z-20 w-16 md:w-72 border-r border-white/10 bg-black/60 backdrop-blur-xl flex flex-col h-screen transition-all duration-300">
         
         {/* Brand & Exit */}
         <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center">
             <Link href="/humanities/philosophy/aesthetics" className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group" title="Exit Matrix">
                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                 <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">Exit</span>
             </Link>
             <button onClick={randomize} className="text-stone-600 hover:text-rose-400 transition-colors hidden md:block" title="Randomize Reality">
                 <Shuffle size={14} />
             </button>
         </div>

         {/* Search & Filter */}
         <div className="p-4 border-b border-white/10 hidden md:block space-y-4">
             {/* Search Input */}
             <div className="relative group">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-white transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search Reality..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-8 pr-4 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-white/30 transition-all"
                />
             </div>
             {/* Filter Chips */}
             <div className="flex flex-wrap gap-2">
                 <button onClick={() => setParentFilter('All')} className={`px-2 py-1 text-[9px] rounded border transition-colors ${parentFilter === 'All' ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-stone-500 hover:text-white'}`}>
                    ALL
                 </button>
                 {PARENT_CATEGORIES.map(cat => (
                     <button key={cat} onClick={() => setParentFilter(cat)} className={`px-2 py-1 text-[9px] rounded border transition-colors ${parentFilter === cat ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-stone-500 hover:text-white'}`}>
                        {cat.substring(0,4).toUpperCase()}
                     </button>
                 ))}
             </div>
         </div>

         {/* Aesthetic List */}
         <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/10">
             {sidebarList.map((aesthetic) => (
                 <button
                     key={aesthetic.id}
                     onClick={() => switchAesthetic(aesthetic.id)}
                     className={`
                        w-full text-left px-4 md:px-6 py-3 md:py-4 flex items-center justify-between group transition-all duration-200 border-l-2
                        ${activeAestheticId === aesthetic.id ? "bg-white/10 border-white text-white" : "border-transparent text-stone-500 hover:bg-white/5 hover:text-stone-300"}
                     `}
                     style={{ borderColor: activeAestheticId === aesthetic.id ? aesthetic.color : 'transparent' }}
                 >
                     <div className="flex flex-col overflow-hidden">
                         <span className="text-sm font-bold truncate">
                             <span className="md:hidden">{aesthetic.name.substring(0,2).toUpperCase()}</span>
                             <span className="hidden md:inline">{aesthetic.name}</span>
                         </span>
                         <span className="hidden md:inline text-[9px] uppercase tracking-wider opacity-50 truncate">
                             {aesthetic.parentCategory}
                         </span>
                     </div>
                     {/* Active Indicator */}
                     {activeAestheticId === aesthetic.id && (
                         <div className="md:hidden w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />
                     )}
                 </button>
             ))}
         </div>
      </aside>

      {/* 3. MAIN STAGE */}
      <section className="flex-1 flex flex-col h-screen relative z-10">
          
          {/* Header */}
          <header className="h-20 border-b border-white/10 flex items-center px-6 md:px-8 bg-black/40 backdrop-blur-md justify-between shrink-0">
              <div className="flex items-center gap-4">
                  {/* Completeness Ring */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                          <circle cx="20" cy="20" r={radius} stroke="white" strokeOpacity="0.1" strokeWidth="3" fill="transparent" />
                          <circle cx="20" cy="20" r={radius} stroke={activeProfile.color} strokeWidth="3" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
                      </svg>
                      <Layers size={14} className="text-white absolute" />
                  </div>
                  <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-0.5">Active Simulation</div>
                      <h1 className="text-2xl font-black text-white uppercase tracking-tight">{activeProfile.name}</h1>
                  </div>
              </div>
          </header>

          {/* Control Panel (Ribbon) */}
          <div className="p-4 md:p-6 border-b border-white/5 bg-black/20 backdrop-blur-sm z-20">
              <div className="flex flex-wrap gap-2 md:gap-3">
                  {ORDERED_CATEGORIES.map(catKey => {
                      const Icon = CATEGORY_ICONS[catKey];
                      const isActive = activeCategory === catKey;
                      const hasItems = !!activeProfile.items[catKey];
                      return (
                          <button
                              key={catKey}
                              onClick={() => hasItems && setActiveCategory(catKey)}
                              disabled={!hasItems}
                              className={`
                                  flex items-center gap-2 pl-3 pr-4 py-2 rounded-lg border transition-all duration-200
                                  ${!hasItems ? "opacity-20 cursor-not-allowed border-transparent bg-transparent grayscale" : 
                                    isActive 
                                      ? "bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105" 
                                      : "bg-black/40 border-white/10 text-stone-400 hover:border-white/30 hover:text-stone-200"
                                  }
                              `}
                          >
                              <Icon size={16} style={{color: isActive ? '#fff' : (hasItems ? activeProfile.color : undefined)}} />
                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{catKey}</span>
                              {!hasItems && <Lock size={10} className="ml-1 opacity-50" />}
                          </button>
                      )
                  })}
              </div>
          </div>

          {/* Display Port */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto relative">
              
              {/* Empty State */}
              {!activeCategory && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <div className="p-6 rounded-full border-2 border-dashed border-stone-700 mb-4">
                          <Maximize2 size={32} className="text-stone-600" />
                      </div>
                      <h2 className="text-lg font-bold uppercase tracking-widest text-stone-500">Select a Property</h2>
                      <p className="text-xs text-stone-600 mt-2">Inspect the cultural artifacts of {activeProfile.name}</p>
                  </div>
              )}

              {/* Active Content */}
              {activeCategory && currentArtifact && (
                  <div className="h-full flex flex-col lg:flex-row gap-6 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeCategory + activeAestheticId + activeVariantIndex}>
                      
                      {/* Left: Visual Asset */}
                      <div className="lg:w-1/2 flex flex-col gap-4">
                          <div className="relative flex-1 rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl group min-h-[300px] lg:max-h-[600px]">
                              
                              {/* CORE FIX: Using the helper function to determine source.
                                  This handles Local vs Placeholder vs Unsplash.
                              */}
                              <img 
                                    // Use the fetched URL, or fall back to the placeholder if it's still loading
                                    src={activeImageUrl || getFallbackUrl()} 
                                    alt={currentArtifact?.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                                />
                              
                              <div className="absolute inset-0 opacity-20 mix-blend-color" style={{background: activeProfile.color}} />
                              
                              {/* Asset Status Badge */}
                              <div className="absolute top-4 right-4">
                                   <div className={`px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-[10px] font-bold text-white flex items-center gap-2 ${currentArtifact?.localImage ? 'bg-rose-900/60' : 'bg-black/60'}`}>
                                    {/* Green Pulse if Live Feed, Rose Pulse if Archive Asset */}
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentArtifact?.localImage ? 'bg-rose-500' : 'bg-green-500'}`} />
                                    {currentArtifact?.localImage ? 'ARCHIVE ASSET' : 'LIVE FEED'}
                                    </div>
                              </div>
                          </div>
                      </div>

                      {/* Right: Data & Variants */}
                      <div className="lg:w-1/2 flex flex-col py-4">
                          
                          {/* Variant Selector (If > 1) */}
                          {currentItems && currentItems.length > 1 && (
                              <div className="flex gap-2 mb-6 p-2 rounded-lg bg-white/5 border border-white/5 w-fit">
                                  {currentItems.map((item, idx) => (
                                      <button
                                          key={idx}
                                          onClick={() => setActiveVariantIndex(idx)}
                                          className={`
                                              px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all
                                              ${activeVariantIndex === idx 
                                                  ? "bg-white text-black shadow-lg" 
                                                  : "text-stone-500 hover:text-white hover:bg-white/5"}
                                          `}
                                      >
                                          {idx + 1}. {item.title}
                                      </button>
                                  ))}
                              </div>
                          )}

                          <div className="mb-8">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{color: activeProfile.color}}>
                                  {React.createElement(CATEGORY_ICONS[activeCategory], {size: 16})} 
                                  {activeCategory} Specimen 0{activeVariantIndex + 1}
                              </div>
                              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                                  {currentArtifact.title}
                              </h2>
                              <p className="text-lg text-stone-300 leading-relaxed pl-4 border-l-2" style={{borderColor: activeProfile.color}}>
                                  {currentArtifact.desc}
                              </p>
                          </div>

                          {/* Parallel Realities */}
                          <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-5 overflow-hidden flex flex-col max-h-80">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-4">
                                  Parallel Realities: {activeCategory}
                              </div>
                              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                  {sidebarList
                                      .filter(a => a.id !== activeAestheticId && a.items[activeCategory])
                                      .map(other => (
                                          <button 
                                              key={other.id}
                                              onClick={() => switchAesthetic(other.id)}
                                              className="w-full flex items-center justify-between p-3 rounded bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group"
                                          >
                                              <div className="flex items-center gap-3">
                                                  <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[9px] font-bold text-stone-500 border border-white/5">
                                                      {other.name.substring(0,2).toUpperCase()}
                                                  </div>
                                                  <div className="overflow-hidden">
                                                      <div className="text-[9px] font-bold text-stone-500 uppercase">{other.name}</div>
                                                      <div className="text-xs text-stone-300 font-medium truncate w-40">
                                                          {other.items[activeCategory]![0].title}
                                                      </div>
                                                  </div>
                                              </div>
                                              <ArrowRight size={12} className="text-stone-600 group-hover:text-white" />
                                          </button>
                                      ))}
                              </div>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </section>
    </main>
  );
}
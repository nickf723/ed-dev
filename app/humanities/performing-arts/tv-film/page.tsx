"use client";
import React, { useState } from "react";
import Link from "next/link";
import PerformingArtsBackground from "../PerformingArtsBackground"; // Layer 1 (Volumetric)
import TvFilmBackground from "./TvFilmBackground"; // Layer 2 (Data Grid)
import { 
  ArrowLeft, Search, Star, Play, Info, 
  Film, Activity, Clock, Database, ChevronRight 
} from "lucide-react";

// --- MOCK CATALOG DATA ---
const MEDIA_CATALOG = [
  {
    id: "avatar",
    title: "Avatar: The Last Airbender",
    year: "2005",
    type: "Series",
    genre: "Fantasy",
    rating: "9.3",
    status: "Archived",
    imageColor: "from-cyan-600 to-blue-800",
    desc: "A young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar."
  },
  {
    id: "blade-runner",
    title: "Blade Runner 2049",
    year: "2017",
    type: "Film",
    genre: "Sci-Fi",
    rating: "8.0",
    status: "Placeholder",
    imageColor: "from-orange-600 to-rose-700",
    desc: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard."
  },
  {
    id: "godfather",
    title: "The Godfather",
    year: "1972",
    type: "Film",
    genre: "Crime",
    rating: "9.2",
    status: "Placeholder",
    imageColor: "from-stone-700 to-red-950",
    desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    year: "2008",
    type: "Series",
    genre: "Crime",
    rating: "9.5",
    status: "Placeholder",
    imageColor: "from-emerald-800 to-yellow-700",
    desc: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine."
  },
  {
    id: "dune",
    title: "Dune: Part One",
    year: "2021",
    type: "Film",
    genre: "Sci-Fi",
    rating: "8.0",
    status: "Placeholder",
    imageColor: "from-amber-700 to-orange-900",
    desc: "Paul Atreides must travel to the most dangerous planet in the universe to ensure the future of his family and his people."
  },
  {
    id: "arcane",
    title: "Arcane",
    year: "2021",
    type: "Series",
    genre: "Steampunk",
    rating: "9.0",
    status: "Placeholder",
    imageColor: "from-violet-700 to-fuchsia-900",
    desc: "Set in Utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions."
  }
];

export default function TvFilmPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<'ALL' | 'SERIES' | 'FILM'>('ALL');

  // Filter Logic
  const filteredItems = MEDIA_CATALOG.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === 'ALL' || item.type.toUpperCase() === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-[#020202] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* 1. VISUAL STACK (Layered Backgrounds) */}
      <div className="fixed inset-0 z-0">
          <PerformingArtsBackground /> {/* Layer 1: Volumetric Light */}
          <TvFilmBackground />         {/* Layer 2: Tech Grid Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 p-6 md:p-8 flex flex-col xl:flex-row gap-8 min-h-screen">
        
        {/* ==============================================
            LEFT COLUMN: THE CONTROL SPIRE
            (Sticky Sidebar for Controls)
           ============================================== */}
        <aside className="w-full xl:w-72 flex-shrink-0 flex flex-col gap-6 xl:sticky xl:top-8 xl:h-[calc(100vh-4rem)]">
          
          {/* A. NAV HEADER */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <Link href="/humanities/performing-arts" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors mb-4">
                  <ArrowLeft size={10} /> Exit Module
              </Link>
              <h1 className="text-3xl font-black text-white leading-none mb-2 tracking-tight">VISUAL<br/>ARCHIVE</h1>
              <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM ONLINE
              </div>
          </div>

          {/* B. COMMAND DECK (Filters) */}
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-1 overflow-hidden">
              <div className="p-4 border-b border-white/5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">
                      Search Query
                  </label>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={14} />
                      <input 
                          type="text" 
                          placeholder="TITLE / ID..." 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-xs text-white focus:border-cyan-500/50 focus:bg-black/60 transition-all font-mono outline-none"
                      />
                  </div>
              </div>

              <div className="p-4">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone-500 mb-2 block">
                      Media Format
                  </label>
                  <div className="space-y-1">
                      {['ALL', 'FILM', 'SERIES'].map(type => (
                          <button
                              key={type}
                              onClick={() => setActiveType(type as any)}
                              className={`
                                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                  ${activeType === type ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-stone-500 hover:text-white hover:bg-white/5"}
                              `}
                          >
                              {type}
                              {activeType === type && <ChevronRight size={12} />}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* C. QUICK STATS */}
          <div className="mt-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl grid grid-cols-2 gap-4">
             <div>
                 <div className="text-2xl font-black text-white">{MEDIA_CATALOG.length}</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest">Entries</div>
             </div>
             <div>
                 <div className="text-2xl font-black text-white">4K</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest">Resolution</div>
             </div>
          </div>

        </aside>


        {/* ==============================================
            RIGHT COLUMN: THE CINEMA GRID
            (Scrollable Content)
           ============================================== */}
        <section className="flex-1 flex flex-col gap-8">
            
            {/* 1. HERO UNIT (Avatar Feature) */}
            <div className="relative aspect-[21/9] md:aspect-[2.5/1] w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 via-blue-900 to-black opacity-80" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-start z-10 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                        <Star size={10} className="text-yellow-400" fill="currentColor" /> Editor's Choice
                    </div>
                    
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
                        AVATAR
                    </h2>
                    
                    <p className="text-sm md:text-lg text-stone-200 max-w-xl line-clamp-2 md:line-clamp-none mb-8 font-light drop-shadow-md">
                        In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny.
                    </p>
                    
                    <div className="flex gap-4">
                        <Link 
                            href="/humanities/performing-arts/tv-and-film/repository/avatar"
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                            <Info size={14} /> Open Dossier
                        </Link>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all">
                             <Play size={14} /> Trailer
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. THE CATALOG GRID */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-white/10 pb-4">
                <Database size={14} /> 
                <span>Filtered Results</span>
                <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[10px] ml-auto">{filteredItems.length} Records</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <Link 
                        key={item.id} 
                        href={item.id === 'avatar' ? `/humanities/performing-arts/tv-and-film/repository/${item.id}` : '#'}
                        className={`
                            group relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30
                            ${item.status === 'Placeholder' ? 'opacity-70 hover:opacity-100' : ''}
                        `}
                    >
                        {/* Abstract Poster Art */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.imageColor} opacity-50 group-hover:opacity-60 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex justify-between items-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">
                                        {item.type}
                                    </span>
                                    <span className="text-[10px] font-bold text-stone-400">{item.year}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                                    {item.title}
                                </h3>
                                
                                <div className="h-0.5 w-8 bg-cyan-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </section>

      </div>
    </main>
  );
}
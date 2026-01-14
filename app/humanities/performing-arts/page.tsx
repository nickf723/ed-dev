"use client";
import React, { useState } from "react";
import Link from "next/link";
import PerformingArtsBackground from "./PerformingArtsBackground"; 
import { 
  Play, Database, Mic2, Clapperboard, 
  Drama, Move, Tent, Palette, Speaker,
  Maximize2, SkipForward, Volume2
} from "lucide-react";

// --- DATA SCHEMA (Unchanged) ---
const PERFORMING_ARTS_DATA = [
  {
    id: "tv-film",
    title: "TV & Film",
    fullTitle: "TV & Film",
    desc: "The captured performance. From the silver screen to the streaming stream.",
    icon: Clapperboard,
    color: "text-cyan-400",
    accent: "bg-cyan-500",
    repositoryId: "tv-film-db",
    subdomains: [
      { title: "Cinema & TV", desc: "Episodic & feature storytelling." },
      { title: "Voice Acting", desc: "Animation & narrative audio." },
      { title: "Stunt Work", desc: "Physical choreography." },
      { title: "Mo-Cap", desc: "Digital puppetry." }
    ]
  },
  {
    id: "theatre",
    title: "Theatre",
    fullTitle: "Theatre Arts",
    desc: "The immediate, ephemeral connection between actor and audience.",
    icon: Drama,
    color: "text-rose-500",
    accent: "bg-rose-500",
    repositoryId: "play-db",
    subdomains: [
      { title: "Method Acting", desc: "The craft of being." },
      { title: "Directing", desc: "Vision & blocking." },
      { title: "Musical Theatre", desc: "Song, dance, narrative." },
      { title: "Improv", desc: "Spontaneous composition." }
    ]
  },
  {
    id: "music",
    title: "Music",
    fullTitle: "Vocals & Instrumentals",
    desc: "The physical mastery of sound production.",
    icon: Mic2,
    color: "text-amber-400",
    accent: "bg-amber-500",
    repositoryId: "music-db",
    subdomains: [
      { title: "Vocal Tech", desc: "Opera, Jazz, Pop." },
      { title: "Virtuosity", desc: "Strings, Brass, Percussion." },
      { title: "Conducting", desc: "Leading the ensemble." },
      { title: "Ensemble", desc: "Chamber & Orchestral." }
    ]
  },
  {
    id: "dance",
    title: "Dance",
    fullTitle: "Dance & Movement",
    desc: "Expression through the movement of the body in space and time.",
    icon: Move,
    color: "text-indigo-400",
    accent: "bg-indigo-500",
    repositoryId: "choreo-db",
    subdomains: [
      { title: "Choreography", desc: "Design of movement." },
      { title: "Ballet", desc: "Rigorous technique." },
      { title: "Contemporary", desc: "Breaking form." },
      { title: "Somatic", desc: "Body awareness." }
    ]
  },
  {
    id: "variety",
    title: "Variety",
    fullTitle: "Variety Arts",
    desc: "The specialized skills of entertainment, spectacle, and wonder.",
    icon: Tent,
    color: "text-fuchsia-500",
    accent: "bg-fuchsia-500",
    subdomains: [
      { title: "Comedy", desc: "Stand-up & sketch." },
      { title: "Magic", desc: "Attention & deception." },
      { title: "Puppetry", desc: "Marionette & Shadow." },
      { title: "Circus", desc: "Acrobatics & aerials." }
    ]
  },
  {
    id: "sceno",
    title: "Design",
    fullTitle: "Scenography",
    desc: "The creation of the performance environment.",
    icon: Palette,
    color: "text-emerald-400",
    accent: "bg-emerald-500",
    subdomains: [
      { title: "Set Design", desc: "Architectural storytelling." },
      { title: "Lighting", desc: "Painting with photons." },
      { title: "Costume", desc: "Character via texture." },
      { title: "Sound", desc: "The sonic landscape." }
    ]
  },
  {
    id: "word",
    title: "Oratory",
    fullTitle: "Spoken Word",
    desc: "The art of public speaking and comedy.",
    icon: Speaker,
    color: "text-orange-400",
    accent: "bg-orange-500",
    subdomains: [
      { title: "Stand-Up", desc: "Rhythm & timing." },
      { title: "Rhetoric", desc: "Art of persuasion." },
      { title: "Slam Poetry", desc: "Competitive verse." }
    ]
  }
];

export default function PerformingArtsPage() {
  const [activeId, setActiveId] = useState<string>("theatre");
  const activeArt = PERFORMING_ARTS_DATA.find(art => art.id === activeId) || PERFORMING_ARTS_DATA[0];

  return (
    <main className="relative min-h-screen bg-[#050505] text-stone-200 font-sans overflow-hidden flex flex-col">
      
      {/* 1. VISUAL ENGINE (The Visualization) */}
      <PerformingArtsBackground />
      
      {/* Dynamic Glow (The Ambient Light) */}
      <div className={`absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full blur-[200px] opacity-10 transition-colors duration-1000 pointer-events-none ${activeArt.accent.replace('bg-', 'bg-')}`} />

      {/* 2. HEADER: The "Window Title" */}
      <header className="absolute top-0 left-0 md:left-80 right-0 z-20 p-8 flex justify-between items-start pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
               <div className="px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeArt.accent.replace('bg-', 'bg-')}`} />
                   Live Feed
               </div>
               <span className="text-stone-600 text-xs font-mono uppercase">/ Humanities / Performing_Arts</span>
          </div>
          
          {/* Decorative Window Controls */}
          <div className="flex gap-4 text-stone-600">
              <Volume2 size={16} />
              <Maximize2 size={16} />
          </div>
      </header>

      {/* 3. MAIN INTERFACE */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full pl-0 md:pl-80 relative z-10 pt-24 pb-8 pr-8 gap-8">
          
          {/* --- LEFT: LIBRARY (Navigation) --- */}
          <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-1 overflow-y-auto pr-2">
              <div className="text-[9px] font-bold uppercase tracking-widest text-stone-600 mb-4 pl-3">
                  Library
              </div>
              
              {PERFORMING_ARTS_DATA.map((art) => {
                  const isActive = activeId === art.id;
                  const Icon = art.icon;
                  return (
                      <button
                          key={art.id}
                          onClick={() => setActiveId(art.id)}
                          className={`
                              group relative flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200
                              ${isActive ? "bg-white/10 text-white" : "hover:bg-white/5 text-stone-500 hover:text-stone-300"}
                          `}
                      >
                          <Icon size={16} className={`transition-colors ${isActive ? art.color : "opacity-50"}`} />
                          <span className="text-xs font-bold uppercase tracking-wide">{art.title}</span>
                          {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_5px_white]" />}
                      </button>
                  )
              })}
          </div>

          {/* --- RIGHT: THE PLAYER (Content Console) --- */}
          <div className="flex-1 relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">
              
              {/* Top Bar (Progress Line) */}
              <div className={`absolute top-0 left-0 w-full h-0.5 ${activeArt.accent} opacity-50 shadow-[0_0_15px_currentColor]`} />

              {/* BACKGROUND WATERMARK */}
              <activeArt.icon 
                  className={`absolute -top-12 -right-12 text-white opacity-[0.02] transition-transform duration-1000 transform scale-150 rotate-12`} 
                  size={400} strokeWidth={0.5}
              />

              {/* A. UPPER DECK: "Now Playing" Info */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10 animate-in fade-in duration-700 key={activeId}">
                  
                  <div className="flex items-start justify-between mb-8">
                      <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 ${activeArt.color} shadow-lg backdrop-blur-md`}>
                          <activeArt.icon size={40} />
                      </div>
                      {/* Visualization Bar (Fake) */}
                      <div className="flex gap-1 items-end h-8 opacity-50">
                          {[...Array(8)].map((_, i) => (
                              <div key={i} 
                                  className={`w-1 rounded-t-sm bg-white animate-pulse`} 
                                  style={{ 
                                      height: `${Math.random() * 100}%`, 
                                      animationDelay: `${i * 0.1}s` 
                                  }} 
                              />
                          ))}
                      </div>
                  </div>

                  <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-none">
                      {activeArt.fullTitle}
                  </h2>
                  <p className="text-xl text-stone-300 max-w-2xl leading-relaxed">
                      {activeArt.desc}
                  </p>

                  <div className="mt-8 flex gap-4">
                       <Link 
                          href={`/humanities/performing-arts/${activeArt.id}`} 
                          className="flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                       >
                           <Play size={14} fill="currentColor" /> Enter Stage
                       </Link>
                       {activeArt.repositoryId && (
                           <button className="px-6 py-3 rounded-full border border-white/20 text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors flex items-center gap-2">
                               <Database size={12} /> Data
                           </button>
                       )}
                  </div>
              </div>

              {/* B. LOWER DECK: "Tracklist" (Subdomains) */}
              <div className="bg-black/40 border-t border-white/5 p-6 md:p-8 backdrop-blur-md">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-stone-600 mb-4 flex items-center gap-2">
                      <SkipForward size={10} /> Key Disciplines
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {activeArt.subdomains.map((sub, i) => (
                          <div key={i} className="group/item cursor-default hover:bg-white/5 p-2 rounded transition-colors -ml-2">
                              <div className="flex items-baseline gap-2 mb-1">
                                  <span className={`text-[10px] font-mono font-bold ${activeArt.color} opacity-60`}>0{i+1}</span>
                                  <span className="text-sm font-bold text-stone-300 group-hover/item:text-white transition-colors">
                                      {sub.title}
                                  </span>
                              </div>
                              <div className="text-xs text-stone-500 group-hover/item:text-stone-400 leading-tight">
                                  {sub.desc}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

          </div>

      </div>
    </main>
  );
}
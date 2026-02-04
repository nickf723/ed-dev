"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HumanitiesBackground from "./HumanitiesBackground"; // Assuming you have this
import { 
  Hourglass, Rocket, Scale, Star, 
  BookOpen, Languages, Palette, Drama, 
  Music, Flame, Gamepad2, Trophy, Feather,
  ArrowRight, Library
} from "lucide-react";

// --- DATA ---
const DOMAINS = [
  { category: "Time & Thought", items: [
    { id: "history", title: "History", subtitle: "The Record", icon: Hourglass, desc: "The study of past events. Understanding where we came from to know where we are going.", color: "text-amber-500", border: "border-amber-600/40", bg: "from-amber-500/20" },
    { id: "futurology", title: "Futurology", subtitle: "The Horizon", icon: Rocket, desc: "Postulating possible futures. Transhumanism, space colonization, and the singularity.", color: "text-cyan-400", border: "border-cyan-600/40", bg: "from-cyan-500/20" },
    { id: "philosophy", title: "Philosophy", subtitle: "The Logic", icon: Scale, desc: "The study of knowledge, reality, and existence. Asking 'Why?' until it hurts.", color: "text-zinc-300", border: "border-zinc-500/40", bg: "from-zinc-500/20" },
    { id: "religion", title: "Religion", subtitle: "The Belief", icon: Star, desc: "Systems of faith and worship. Exploring the human relationship with the divine.", color: "text-yellow-200", border: "border-yellow-500/40", bg: "from-yellow-500/20" },
  ]},
  { category: "Expression", items: [
    { id: "literature", title: "Literature", subtitle: "The Story", icon: BookOpen, desc: "Written works of artistic merit. The novel, poetry, and the power of narrative.", color: "text-stone-300", border: "border-stone-500/40", bg: "from-stone-500/20" },
    { id: "language", title: "Language", subtitle: "The Code", icon: Languages, desc: "Linguistics and communication. The structure of how we transmit ideas.", color: "text-rose-300", border: "border-rose-500/40", bg: "from-rose-500/20" },
    { id: "visual-arts", title: "Visual Arts", subtitle: "The Image", icon: Palette, desc: "Painting, sculpture, and design. Manifesting imagination into the physical world.", color: "text-fuchsia-400", border: "border-fuchsia-500/40", bg: "from-fuchsia-500/20" },
    { id: "performing-arts", title: "Performing Arts", subtitle: "The Stage", icon: Drama, desc: "Theater, dance, and cinema. The ephemeral art of the moment.", color: "text-red-400", border: "border-red-500/40", bg: "from-red-500/20" },
  ]},
  { category: "Culture & Play", items: [
    { id: "music", title: "Music", subtitle: "The Sound", icon: Music, desc: "Harmonic frequencies. Theory, composition, and the universal language.", color: "text-violet-400", border: "border-violet-500/40", bg: "from-violet-500/20" },
    { id: "culinary-arts", title: "Culinary Arts", subtitle: "The Taste", icon: Flame, desc: "Gastronomy and cooking. The intersection of chemistry, culture, and sustenance.", color: "text-orange-400", border: "border-orange-500/40", bg: "from-orange-500/20" },
    { id: "gaming", title: "Gaming", subtitle: "The Simulation", icon: Gamepad2, desc: "Interactive entertainment. Ludology, game design, and virtual worlds.", color: "text-green-400", border: "border-green-500/40", bg: "from-green-500/20" },
    { id: "sports", title: "Sports", subtitle: "The Motion", icon: Trophy, desc: "Physical exertion and skill. Strategy, athleticism, and the limits of the human body.", color: "text-emerald-400", border: "border-emerald-500/40", bg: "from-emerald-500/20" },
    { id: "culture", title: "Culture", subtitle: "The Collective", icon: Feather, desc: "The shared practices, values, and artifacts of societies. Anthropology and ethnography.", color: "text-amber-400", border: "border-amber-500/40", bg: "from-amber-500/20" },
  ]}
];

export default function HumanitiesPage() {
  // Default to History
  const [active, setActive] = useState(DOMAINS[0].items[0]);

  return (
    <main className="relative h-screen w-full bg-[#1c1917] text-stone-200 overflow-hidden font-sans selection:bg-amber-500/30 flex items-center justify-center">
      <HumanitiesBackground />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl px-6 h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        
        {/* --- LEFT COL: THE ARCHIVE (Navigation) --- */}
        <div className="lg:col-span-4 flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <header className="mb-6 flex-shrink-0">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-700 bg-stone-900/50 backdrop-blur-md mb-4">
                 <Library size={12} className="text-amber-500" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">The Grand Hall</span>
             </div>
             <h1 className="text-4xl font-black text-white uppercase tracking-tight">
                 Humanities
             </h1>
             <p className="text-stone-500 text-sm mt-2">
                 Select a discipline to inspect its artifacts.
             </p>
          </header>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
            {DOMAINS.map((group, i) => (
                <div key={i} className="space-y-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 sticky top-0 bg-[#1c1917]/95 py-2 z-10">
                        {group.category}
                    </h3>
                    <div className="space-y-1">
                        {group.items.map((item) => (
                            <button
                                key={item.id}
                                onMouseEnter={() => setActive(item)}
                                onClick={() => setActive(item)}
                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 flex items-center justify-between group ${
                                    active.id === item.id 
                                    ? `bg-stone-800 ${item.border} border-l-4` 
                                    : 'border-transparent hover:bg-white/5 border-l-4 border-l-transparent'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} className={active.id === item.id ? item.color : 'text-stone-500 group-hover:text-stone-300'} />
                                    <span className={`text-sm font-bold ${active.id === item.id ? 'text-white' : 'text-stone-400 group-hover:text-white'}`}>
                                        {item.title}
                                    </span>
                                </div>
                                {active.id === item.id && (
                                    <motion.div layoutId="arrow">
                                        <ArrowRight size={14} className={item.color} />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
          </div>

        </div>

        {/* --- RIGHT COL: THE LENS (Detail View) --- */}
        <div className="lg:col-span-8 hidden lg:flex flex-col h-full">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex-1 bg-stone-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col"
                >
                    {/* Dynamic Gradient Background based on selection */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${active.bg} to-transparent opacity-20`} />
                    
                    {/* Content Container */}
                    <div className="relative z-10 p-12 flex flex-col h-full">
                        
                        {/* Subtitle Badge */}
                        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded border border-white/10 bg-black/20 text-stone-400 text-xs font-mono uppercase tracking-widest mb-8">
                            <span>#{active.id}</span>
                            <span className="w-px h-3 bg-white/10" />
                            <span>{active.subtitle}</span>
                        </div>

                        {/* Huge Icon */}
                        <div className={`p-6 rounded-2xl bg-black/40 w-fit mb-8 ${active.color}`}>
                            <active.icon size={64} strokeWidth={1.5} />
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            {active.title}
                        </h2>
                        <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                            {active.desc}
                        </p>

                        {/* Action Area (Bottom) */}
                        <div className="mt-auto pt-12 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-4">
                                <Stat label="Modules" value="4" />
                                <Stat label="Articles" value="12" />
                            </div>
                            <Link 
                                href={`/humanities/${active.id}`}
                                className={`px-8 py-4 rounded-xl font-bold text-black uppercase tracking-wider flex items-center gap-3 transition-transform hover:scale-105 ${active.color.replace('text-', 'bg-')}`}
                            >
                                Enter Domain <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Watermark */}
                    <active.icon 
                        className="absolute -bottom-24 -right-24 text-white opacity-[0.03] pointer-events-none" 
                        size={600} 
                        strokeWidth={0.5} 
                    />

                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </main>
  );
}

function Stat({ label, value }: any) {
    return (
        <div>
            <div className="text-[10px] font-bold text-stone-500 uppercase">{label}</div>
            <div className="text-2xl font-mono text-white">{value}</div>
        </div>
    )
}
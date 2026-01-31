"use client";
import React from "react";
import Link from "next/link";
import HumanitiesBackground from "./HumanitiesBackground";
import { 
  ArrowLeft, Hourglass, Rocket, 
  Scale, Star, BookOpen, 
  Languages, Palette, Drama, 
  Music, Flame, Gamepad2, 
  Trophy, Feather
} from "lucide-react";

// --- CURATED COLLECTIONS ---
const DOMAINS = [
  // ROW 1: TIME & THOUGHT
  {
    id: "history",
    title: "History",
    subtitle: "The Record",
    icon: Hourglass,
    desc: "The study of past events. Understanding where we came from to know where we are going.",
    color: "text-amber-500",
    border: "border-amber-600/40"
  },
  {
    id: "futurology",
    title: "Futurology",
    subtitle: "The Horizon",
    icon: Rocket,
    desc: "Postulating possible futures. Transhumanism, space colonization, and the singularity.",
    color: "text-cyan-400", // Pop of modern color
    border: "border-cyan-600/40"
  },
  {
    id: "philosophy",
    title: "Philosophy",
    subtitle: "The Logic",
    icon: Scale, // Representing balance/reason
    desc: "The study of knowledge, reality, and existence. Asking 'Why?' until it hurts.",
    color: "text-zinc-300",
    border: "border-zinc-500/40"
  },
  {
    id: "religion",
    title: "Religion",
    subtitle: "The Belief",
    icon: Star,
    desc: "Systems of faith and worship. Exploring the human relationship with the divine.",
    color: "text-yellow-200",
    border: "border-yellow-500/40"
  },
  
  // ROW 2: EXPRESSION
  {
    id: "literature",
    title: "Literature",
    subtitle: "The Story",
    icon: BookOpen,
    desc: "Written works of artistic merit. The novel, poetry, and the power of narrative.",
    color: "text-stone-300",
    border: "border-stone-500/40"
  },
  {
    id: "language",
    title: "Language",
    subtitle: "The Code",
    icon: Languages,
    desc: "Linguistics and communication. The structure of how we transmit ideas.",
    color: "text-rose-300",
    border: "border-rose-500/40"
  },
  {
    id: "visual-arts",
    title: "Visual Arts",
    subtitle: "The Image",
    icon: Palette,
    desc: "Painting, sculpture, and design. Manifesting imagination into the physical world.",
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/40"
  },
  {
    id: "performing-arts",
    title: "Performing Arts",
    subtitle: "The Stage",
    icon: Drama,
    desc: "Theater, dance, and cinema. The ephemeral art of the moment.",
    color: "text-red-400",
    border: "border-red-500/40"
  },

  // ROW 3: CULTURE & PLAY
  {
    id: "music",
    title: "Music",
    subtitle: "The Sound",
    icon: Music,
    desc: "Harmonic frequencies. Theory, composition, and the universal language.",
    color: "text-violet-400",
    border: "border-violet-500/40"
  },
  {
    id: "culinary-arts",
    title: "Culinary Arts",
    subtitle: "The Taste",
    icon: Flame,
    desc: "Gastronomy and cooking. The intersection of chemistry, culture, and sustenance.",
    color: "text-orange-400",
    border: "border-orange-500/40"
  },
  {
    id: "gaming",
    title: "Gaming",
    subtitle: "The Simulation",
    icon: Gamepad2,
    desc: "Interactive entertainment. Ludology, game design, and virtual worlds.",
    color: "text-green-400",
    border: "border-green-500/40"
  },
  {
    id: "sports",
    title: "Sports",
    subtitle: "The Motion",
    icon: Trophy,
    desc: "Physical exertion and skill. Strategy, athleticism, and the limits of the human body.",
    color: "text-emerald-400",
    border: "border-emerald-500/40"
  },
  {
    id: "culture",
    title: "Culture",
    subtitle: "The Collective",
    icon: Feather,
    desc: "The shared practices, values, and artifacts of societies. Anthropology and ethnography.",
    color: "text-amber-400",
    border: "border-amber-500/40"
  }
];

export default function HumanitiesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0505] text-white overflow-hidden font-serif selection:bg-amber-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <HumanitiesBackground />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4 text-center">
         <Link href="/" className="inline-flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-4 uppercase tracking-widest font-sans group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Return Home
         </Link>
         
         <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 backdrop-blur-md">
                 <Feather size={32} className="text-cyan-500" />
             </div>
             <div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 to-cyan-700">
                   HUMANITIES
                </h1>
                <p className="text-amber-500/60 text-sm tracking-widest uppercase font-sans mt-2">
                    The Study of the Human Condition
                </p>
             </div>
         </div>
      </header>

      {/* 3. THE GALLERY (Grid) */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-12">
          <div className="max-w-fill mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 pt-8">
              
              {DOMAINS.map((item, i) => (
                  <Link 
                      key={item.id}
                      href={`/humanities/${item.id}`}
                      className={`
                          group relative flex flex-col p-6 rounded-sm
                          border backdrop-blur-sm bg-[#1a0a0a]/60
                          transition-all duration-500
                          hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                          ${item.border}
                      `}
                  >
                      {/* Frame Decoration */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-full bg-black/40 border border-white/5 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                              <item.icon size={20} />
                          </div>
                          <span className="font-sans text-[10px] text-white/20 font-bold uppercase tracking-widest">
                              {i < 9 ? `0${i+1}` : i+1}
                          </span>
                      </div>

                      {/* Content */}
                      <div>
                          <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-100 transition-colors">
                              {item.title}
                          </h2>
                          <div className={`font-sans text-[10px] font-bold uppercase tracking-wider mb-4 opacity-70 ${item.color}`}>
                              {item.subtitle}
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed font-sans opacity-80 group-hover:opacity-100 transition-opacity">
                              {item.desc}
                          </p>
                      </div>

                      {/* Hover Interaction: "Read More" Line */}
                      <div className="mt-6 h-px w-full bg-white/5 group-hover:bg-white/20 transition-colors" />
                  </Link>
              ))}

          </div>
      </div>
      
      {/* FOOTER */}
      <div className="relative z-10 p-6 text-center">
          <div className="text-[10px] text-amber-900/50 uppercase font-sans font-bold tracking-[0.3em]">
              Ars Longa, Vita Brevis
          </div>
      </div>

    </main>
  );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import NetworkBackground from "@/app/humanities/NetworkBackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library, Scroll, PenTool, Hourglass, 
  Scale, BookOpen, Palette, Quote, Sparkles,
  ArrowRight, Landmark
} from "lucide-react";

// --- DATA ---
const archives = [
  {
    id: "history",
    label: "HISTORY",
    icon: Hourglass,
    desc: "The Record of Time. Understanding the past to contextualize the present.",
    color: "text-amber-400",
    bg: "bg-amber-900/50",
    border: "border-amber-500",
    items: [
      { 
        title: "Ancient History", 
        href: "/humanities/history/ancient", 
        icon: Landmark,
        desc: "The rise of civilizations: Mesopotamia, Egypt, Greece, and Rome."
      },
      { 
        title: "Archaeology", 
        href: "/humanities/history/archaeology", 
        icon: SearchIcon, // Custom icon below
        desc: "Uncovering the material remains of past human life."
      }
    ]
  },
  {
    id: "philosophy",
    label: "PHILOSOPHY",
    icon: Scale,
    desc: "The Pursuit of Wisdom. Examining existence, knowledge, values, and reason.",
    color: "text-rose-400",
    bg: "bg-rose-900/50",
    border: "border-rose-500",
    items: [
      { 
        title: "Metaphysics", 
        href: "/humanities/philosophy/metaphysics", 
        icon: Sparkles,
        desc: "Exploring the fundamental nature of reality and being."
      },
      { 
        title: "Ethics", 
        href: "/humanities/philosophy/ethics", 
        icon: Scale,
        desc: "Moral philosophy: defining right, wrong, and the good life."
      }
    ]
  },
  {
    id: "arts",
    label: "ARTS & LIT",
    icon: Palette,
    desc: "The Expression of Soul. Literature, visual arts, and the creative impulse.",
    color: "text-purple-400",
    bg: "bg-purple-900/50",
    border: "border-purple-500",
    items: [
      { 
        title: "Literature", 
        href: "/humanities/arts/literature", 
        icon: BookOpen,
        desc: "Written works of lasting artistic merit."
      },
      { 
        title: "Visual Arts", 
        href: "/humanities/arts/visual-arts", 
        icon: Palette,
        desc: "Painting, sculpture, and the visual aesthetics of culture."
      }
    ]
  }
];

// Helper Icon
function SearchIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M16 11h-2"/><path d="M11 16v-2"/></svg>
}

export default function HumanitiesPage() {
  const [activeTab, setActiveTab] = useState("history");
  const activeArchive = archives.find(a => a.id === activeTab) || archives[0];

  return (
    <main className="relative min-h-screen bg-[#1a0505] text-stone-200 overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <NetworkBackground />
      
      {/* OVERLAY: Paper Texture & Vignette */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0202_100%)] pointer-events-none z-0" />

      {/* 2. DASHBOARD UI */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-amber-500/80 mb-4 uppercase tracking-[0.2em] border-b border-amber-900/50 pb-4 w-fit mx-auto md:mx-0">
                <Library size={14} /> The Great Archives // Humanities
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 mb-6 drop-shadow-lg tracking-tight">
                THE<br/>HUMANITIES
             </h1>
             
             <div className="relative max-w-2xl mx-auto md:mx-0">
                 <Quote className="absolute -left-8 -top-4 text-amber-900/50 scale-150 transform -scale-x-100" size={48} />
                 <p className="text-stone-400 text-lg md:text-xl leading-relaxed italic border-l-2 border-amber-800/50 pl-6">
                    "Science explains how the world works; the Humanities explain what it means to be human."
                 </p>
             </div>
        </header>

        {/* 3. ARCHIVE SELECTOR (Tabs) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-12">
            {archives.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`
                        relative px-8 py-4 rounded-sm border transition-all duration-500 group overflow-hidden
                        ${activeTab === cat.id 
                            ? `bg-[#2a0a0a] ${cat.border} text-amber-100 shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)]` 
                            : "bg-[#1f0808] border-white/5 text-stone-500 hover:text-stone-300 hover:border-white/20"
                        }
                    `}
                >
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    
                    <div className="flex items-center gap-3 relative z-10">
                        <cat.icon size={18} className={activeTab === cat.id ? cat.color : ""} />
                        <span className="font-bold tracking-[0.15em] text-xs font-sans">{cat.label}</span>
                    </div>
                </button>
            ))}
        </div>

        {/* 4. CONTENT DISPLAY */}
        <div className="flex-1">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Description Block */}
                    <div className="mb-10 flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${activeArchive.bg} border ${activeArchive.border}`} />
                        <span className={`font-mono text-xs uppercase tracking-widest ${activeArchive.color}`}>
                            {activeArchive.desc}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeArchive.items.map((item) => (
                            <Link 
                                href={item.href} 
                                key={item.title}
                                className="group relative bg-[#150505] border border-white/5 p-8 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 shadow-2xl"
                            >
                                {/* Decorative Corners */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-amber-500/50 transition-colors" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-amber-500/50 transition-colors" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-amber-500/50 transition-colors" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-amber-500/50 transition-colors" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 bg-black/40 border border-white/5 shadow-inner ${activeArchive.color}`}>
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <ArrowRight className="text-stone-700 group-hover:text-amber-500 transition-colors duration-300" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-stone-100 mb-3 group-hover:text-amber-200 transition-colors font-serif tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-stone-500 leading-relaxed font-sans">
                                    {item.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
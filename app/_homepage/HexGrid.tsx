"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sigma, Atom, Users, Cpu, 
  BookOpen, Globe, ArrowRight, Hexagon 
} from "lucide-react";

// --- DATA ---
const DOMAINS = [
  { 
    id: 'formal', 
    title: 'Formal Sciences', 
    subtitle: 'Structure & Proof', 
    desc: 'The language of structure, logic, and proof.',
    tags: ['Math', 'Logic', 'Systems', 'Computation'],
    href: '/formal-science', 
    icon: Sigma, 
    color: 'rose' 
  },
  { 
    id: 'natural', 
    title: 'Natural Sciences', 
    subtitle: 'Physical Laws', 
    desc: 'The fundamental laws governing the physical universe.',
    tags: ['Physics', 'Chemistry', 'Biology', 'Space'],
    href: '/natural-science', 
    icon: Atom, 
    color: 'emerald' 
  },
  { 
    id: 'social', 
    title: 'Social Sciences', 
    subtitle: 'Human Patterns', 
    desc: 'The study of human society and relationships.',
    tags: ['Psychology', 'Sociology', 'Economics', 'Politics'],
    href: '/social-science', 
    icon: Users, 
    color: 'blue' 
  },
  { 
    id: 'applied', 
    title: 'Applied Sciences', 
    subtitle: 'Innovation', 
    desc: 'Knowledge put to work to solve practical problems.',
    tags: ['Engineering', 'Medicine', 'Tech', 'Design'],
    href: '/applied-science', 
    icon: Cpu, 
    color: 'cyan' 
  },
  { 
    id: 'humanities', 
    title: 'Humanities', 
    subtitle: 'Culture & Meaning', 
    desc: 'The exploration of human culture and expression.',
    tags: ['History', 'Philosophy', 'Lit', 'Art'],
    href: '/humanities', 
    icon: BookOpen, 
    color: 'amber' 
  },
  { 
    id: 'interdisciplines', 
    title: 'Interdisciplines', 
    subtitle: 'Synthesis', 
    desc: 'Where domains collide to form new fields.',
    tags: ['Cognitive Sci', 'Data Sci', 'Bioethics', 'Complexity'],
    href: '/interdisciplines', 
    icon: Globe, 
    color: 'indigo' 
  },
];

const THEME_MAP: Record<string, { rgb: string; text: string; border: string; bg: string }> = {
  rose:    { rgb: "244, 63, 94", text: "text-rose-400", border: "border-rose-500/50", bg: "bg-rose-500/20" },
  emerald: { rgb: "16, 185, 129", text: "text-emerald-400", border: "border-emerald-500/50", bg: "bg-emerald-500/20" },
  cyan:    { rgb: "6, 182, 212", text: "text-cyan-400", border: "border-cyan-500/50", bg: "bg-cyan-500/20" },
  violet:  { rgb: "215, 92, 246", text: "text-violet-400", border: "border-violet-500/50", bg: "bg-violet-500/20" },
  amber:   { rgb: "245, 158, 11", text: "text-amber-400", border: "border-amber-500/50", bg: "bg-amber-500/20" },
  indigo:  { rgb: "79, 70, 229", text: "text-indigo-400", border: "border-indigo-500/50", bg: "bg-indigo-500/20" },
  blue:    { rgb: "59, 60, 246", text: "text-blue-400", border: "border-blue-500/50", bg: "bg-blue-500/20" }
};

export default function HexGrid() {
  const [hovered, setHovered] = useState(DOMAINS[0]);
  const theme = THEME_MAP[hovered.color];
  const translate = { x: 3, y: 4  };
  // Hex Coordinates for adjacent layout
  const hexPositions = [
    
    { x: -6 + translate.x, y: -10.5 + translate.y }, { x: 6 + translate.x, y: -10.5 + translate.y }, { x: 12 + translate.x, y: 0 + translate.y },
    { x: 6 + translate.x, y: 10.5 + translate.y }, { x: -6 + translate.x, y: 10.5 + translate.y }, { x: -12 + translate.x, y: 0 + translate.y },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-[800px] w-full overflow-visible z-10">
      
      {/* CENTRAL PORTAL (The Reactor) */}
      <div className="absolute z-50 w-64 h-64 flex flex-col items-center justify-center text-center p-6 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
              <hovered.icon className={theme.text} size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase text-white leading-none mb-1">{hovered.title}</h2>
              <p className="text-[9px] font-medium text-slate-400 leading-tight max-w-[160px] mx-auto mb-3">{hovered.desc}</p>
              
              {/* Tags Grid */}
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                {hovered.tags.map(tag => (
                  <span key={tag} className={`text-[8px] px-1.5 py-0.5 rounded border border-white/10 ${theme.text} bg-white/5`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link 
              href={hovered.href} 
              className={`group inline-flex items-center gap-2 text-[9px] font-black px-6 py-2 rounded-full border transition-all uppercase tracking-widest text-white ${theme.border} ${theme.bg} hover:bg-white hover:text-black`}
            >
              Explore <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HEX GRID */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-0 h-0 flex items-center justify-center"
      >
        {DOMAINS.map((d, i) => (
          <div 
            key={d.id} 
            className="absolute transition-all duration-500"
            style={{ transform: `translate(${hexPositions[i].x}rem, ${hexPositions[i].y}rem)` }}
            onMouseEnter={() => setHovered(d)}
          >
            <HexTile data={d} isActive={hovered.id === d.id} />
          </div>
        ))}
        {/* Ghost Nodes */}
        <GhostHex x={-18} y={-10.5} /> <GhostHex x={18} y={-10.5} />
        <GhostHex x={-18} y={10.5} /> <GhostHex x={18} y={10.5} />
      </motion.div>
    </div>
  );
}

function HexTile({ data: d, isActive }: { data: any, isActive: boolean }) {
  const theme = THEME_MAP[d.color];
  return (
    <Link href={d.href}>
      <motion.div 
        whileHover={{ scale: 1.05, zIndex: 50 }}
        className={`relative w-48 h-56 -ml-24 -mt-28 cursor-pointer transition-all duration-300 group`}
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md transition-all duration-300"
             style={{ backgroundColor: isActive ? `rgba(${theme.rgb}, 0.1)` : 'rgba(10, 10, 20, 0.8)' }} />
        
        <div className="absolute inset-[1px] pointer-events-none"
             style={{ 
               clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
               border: isActive ? "2px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.05)"
             }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-30">
          <d.icon size={28} className={`mb-3 transition-colors ${isActive ? theme.text : "text-slate-600"}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-white" : "text-slate-600"}`}>
            {d.title}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function GhostHex({ x, y }: { x: number, y: number }) {
  return (
    <div className="absolute w-48 h-56 -ml-24 -mt-28 opacity-5 pointer-events-none"
      style={{ 
        transform: `translate(${x}rem, ${y}rem)`,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        border: "1px dashed white",
        background: "rgba(255,255,255,0.02)"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center"><Hexagon size={24} /></div>
    </div>
  )
}
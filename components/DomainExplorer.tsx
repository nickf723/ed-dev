"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Binary, Atom, Handshake, Hammer, Palette, Link as LinkIcon,
  ArrowRight, ChevronRight, Database, BookOpen, Layers 
} from "@/components/icons";

const DOMAINS = [
  {
    id: "formal",
    title: "Formal Sciences",
    desc: "The language of abstract structure.",
    icon: Binary,
    color: "text-red-500",
    border: "border-red-500/50",
    bg: "bg-red-950/30",
    stats: { modules: 12, axioms: 45 },
    subs: [
      { label: "Logic", href: "/formal-science/logic" },
      { label: "Mathematics", href: "/formal-science/mathematics" },
      { label: "Computer Science", href: "/formal-science/computer-science" },
      { label: "Systems Science", href: "/formal-science/systems-science" },
    ]
  },
  {
    id: "natural",
    title: "Natural Sciences",
    desc: "The study of the physical universe.",
    icon: Atom,
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    bg: "bg-cyan-950/30",
    stats: { modules: 24, axioms: 108 },
    subs: [
      { label: "Physics", href: "/natural-science/physics" },
      { label: "Chemistry", href: "/natural-science/chemistry" },
      { label: "Biology", href: "/natural-science/biology" },
      { label: "Astronomy", href: "/natural-science/astronomy" },
      { label: "Earth Science", href: "/natural-science/earth-science" },
    ]
  },
  {
    id: "social",
    title: "Social Sciences",
    desc: "The web of human interaction.",
    icon: Handshake,
    color: "text-violet-400",
    border: "border-violet-500/50",
    bg: "bg-violet-950/30",
    stats: { modules: 18, axioms: 32 },
    subs: [
      { label: "Psychology", href: "/social-science/psychology" },
      { label: "Sociology", href: "/social-science/sociology" },
      { label: "Economics", href: "/social-science/economics" },
      { label: "Political Science", href: "/social-science/political-science" },
      { label: "Geography", href: "/social-science/geography" },
    ]
  },
  {
    id: "applied",
    title: "Applied Sciences",
    desc: "Knowledge turned into action.",
    icon: Hammer,
    color: "text-orange-400",
    border: "border-orange-500/50",
    bg: "bg-orange-950/30",
    stats: { modules: 15, axioms: 60 },
    subs: [
      { label: "Engineering", href: "/applied-science/engineering" },
      { label: "Medicine", href: "/applied-science/medicine" },
      { label: "Materials Science", href: "/applied-science/materials-science" },
      { label: "Comp Tech", href: "/applied-science/computer-technology" },
    ]
  },
  {
    id: "humanities",
    title: "Humanities",
    desc: "The exploration of the human condition.",
    icon: Palette,
    color: "text-amber-400",
    border: "border-amber-500/50",
    bg: "bg-amber-950/30",
    stats: { modules: 20, axioms: 12 },
    subs: [
      { label: "Philosophy", href: "/humanities/philosophy" },
      { label: "History", href: "/humanities/history" },
      { label: "Literature", href: "/humanities/literature" },
      { label: "Arts", href: "/humanities/arts-aesthetics" },
    ]
  },
  {
    id: "inter",
    title: "Interdisciplines",
    desc: "The spaces between boundaries.",
    icon: LinkIcon,
    color: "text-lime-400",
    border: "border-lime-500/50",
    bg: "bg-lime-950/30",
    stats: { modules: 8, axioms: 15 },
    subs: [
      { label: "Game Studies", href: "/interdisciplines/game-studies" },
      { label: "Astrobiology", href: "/interdisciplines/astrobiology" },
      { label: "Psychedelics", href: "/interdisciplines/psychedelics" },
    ]
  },
];

export default function DomainExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {DOMAINS.map((domain) => {
        const isActive = activeId === domain.id;
        return (
          <motion.div
            key={domain.id}
            layout
            onMouseEnter={() => setActiveId(domain.id)}
            onMouseLeave={() => setActiveId(null)}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out
                ${isActive ? `${domain.border} ${domain.bg} shadow-2xl` : "border-white/10 bg-neutral-900/40 hover:border-white/20"}
            `}
            style={{ minHeight: isActive ? "320px" : "240px" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
            />
            
            {/* Content Container */}
            <div className="relative z-10 p-8 h-full flex flex-col">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-neutral-950 border border-white/10 ${domain.color} shadow-lg`}>
                        <domain.icon size={32} />
                    </div>
                    <div className="flex flex-col items-end gap-1 opacity-60">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">SECTOR {domain.id.substring(0,3).toUpperCase()}</span>
                        <Layers size={14} className={domain.color} />
                    </div>
                </div>

                {/* Title & Desc */}
                <div className="mb-auto">
                    <h3 className="text-2xl font-black text-white mb-2">{domain.title}</h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        {domain.desc}
                    </p>
                </div>

                {/* Stats Row (Visible when inactive) */}
                {!isActive && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-6 flex gap-4 text-xs text-neutral-500 font-mono pt-4 border-t border-white/5"
                    >
                        <span className="flex items-center gap-2"><Database size={12} /> {domain.stats.modules} Modules</span>
                        <span className="flex items-center gap-2"><BookOpen size={12} /> {domain.stats.axioms} Laws</span>
                    </motion.div>
                )}

                {/* Sub-Links (Visible when active) */}
                {isActive && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-1"
                    >
                        {domain.subs.map(sub => (
                            <Link 
                                key={sub.label} 
                                href={sub.href}
                                className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-black/40 group/link transition-colors"
                            >
                                <span className="text-sm font-bold text-white group-hover/link:text-cyan-300 transition-colors">
                                    {sub.label}
                                </span>
                                <ChevronRight size={14} className="text-neutral-600 group-hover/link:text-cyan-400 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        ))}
                        <div className="pt-3 mt-2 border-t border-white/10 flex justify-end">
                            <Link href={`/${domain.id === 'inter' ? 'interdisciplines' : domain.id + '-science'}`} className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${domain.color}`}>
                                Enter Sector <ArrowRight size={12} />
                            </Link>
                        </div>
                    </motion.div>
                )}

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
"use client";
import React from "react";
import Link from "next/link";
import BiologyBackground from "./BiologyBackground";
import { 
  Dna, Microscope, Atom, Sprout, 
  Bug, Leaf, PawPrint, HeartPulse, 
  Globe, Activity, ArrowLeft, ArrowUpRight 
} from "lucide-react";
import DnaBackground from "./DnaBackground";
import LifeBackground from "./LifeBackground";

// --- DATA: Grouped by Scale ---
const BIO_SCALES = [
  {
    title: "MICRO SCALE",
    subtitle: "Cellular Foundations",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
    bg: "bg-cyan-950/20",
    items: [
      { id: "cytology", title: "Cytology", icon: Microscope, desc: "Structure & function of cells." },
      { id: "genetics", title: "Genetics", icon: Dna, desc: "Heredity and variation." },
      { id: "molecular", title: "Molecular Bio", icon: Atom, desc: "Biological activity." },
    ]
  },
  {
    title: "MESO SCALE",
    subtitle: "Organismal Life",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-950/20",
    items: [
      { id: "microbiology", title: "Microbiology", icon: Bug, desc: "Bacteria, viruses, archaea." },
      { id: "mycology", title: "Mycology", icon: Sprout, desc: "The kingdom of Fungi." },
      { id: "botany", title: "Botany", icon: Leaf, desc: "Plant physiology & ecology." },
      { id: "zoology", title: "Zoology", icon: PawPrint, desc: "Animal behavior & structure." },
    ]
  },
  {
    title: "MACRO SCALE",
    subtitle: "Systems & Process",
    color: "text-amber-400",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-950/20",
    items: [
      { id: "anatomy", title: "Anatomy", icon: HeartPulse, desc: "Bodily structure." },
      { id: "ecology", title: "Ecology", icon: Globe, desc: "Interactions & biospheres." },
      { id: "evolution", title: "Evolution", icon: Activity, desc: "Change over time." },
    ]
  }
];

export default function BiologyPage() {
  return (
    <main className="h-screen bg-[#050a07] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-emerald-500/30">
      {/* 1. VISUAL ENGINE */}
      <DnaBackground />
      
      {/* Vignette Overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-[#050a07] pointer-events-none opacity-80" />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-end mb-8 shrink-0">
             <div>
                 <Link href="/natural-science" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/80 hover:text-emerald-400 transition-colors mb-2">
                     <ArrowLeft size={10} /> Natural Science
                 </Link>
                 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                     BIOLOGY
                 </h1>
                 <p className="text-sm text-stone-400 font-mono mt-1">
                     SYSTEMS OF LIFE: v.3.0
                 </p>
             </div>
             
             {/* Decorative Stat */}
             <div className="hidden md:block text-right">
                 <div className="text-2xl font-black text-emerald-500">10</div>
                 <div className="text-[9px] uppercase tracking-widest text-stone-600">Core Disciplines</div>
             </div>
        </header>

        {/* MAIN DASHBOARD GRID */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto pb-4 custom-scrollbar">
            
            {BIO_SCALES.map((scale, i) => (
                <div key={i} className="flex flex-col gap-4">
                    
                    {/* Column Header */}
                    <div className={`
                        p-4 rounded-xl border bg-black/40 backdrop-blur-md
                        ${scale.border}
                    `}>
                        <div className={`text-xl font-black ${scale.color} mb-1`}>{scale.title}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            {scale.subtitle}
                        </div>
                    </div>

                    {/* Domain Cards */}
                    <div className="flex-1 flex flex-col gap-3">
                        {scale.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    href={`/natural-science/biology/${item.id}`}
                                    className={`
                                        group relative p-5 rounded-xl border bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:bg-black/40
                                        ${scale.border}
                                    `}
                                >
                                    {/* Background Glow on Hover */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${scale.bg} to-transparent rounded-xl`} />
                                    
                                    <div className="relative z-10 flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                p-2.5 rounded-lg bg-black/30 border border-white/5 group-hover:border-white/20 transition-colors
                                                ${scale.color}
                                            `}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-none mb-1 group-hover:text-emerald-200 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[11px] text-stone-400 font-medium">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Arrow Icon */}
                                        <ArrowUpRight size={14} className={`opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${scale.color}`} />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ))}

        </div>

      </div>
    </main>
  );
}
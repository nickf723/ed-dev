"use client";
import React from "react";
import Link from "next/link";
import CrystalBackground from "./CrystalBackground";
import { 
  ArrowLeft, Gem, Hexagon, Component, 
  Microscope, Sparkles, BoxSelect
} from "lucide-react";

// The Data
const SUBDOMAINS = [
  {
    id: "crystallography",
    title: "Crystallography",
    desc: "The experimental science of determining the arrangement of atoms in crystalline solids.",
    icon: Hexagon,
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/50",
    bg: "bg-fuchsia-950/30"
  },
  {
    id: "petrology",
    title: "Petrology",
    desc: "The study of rocks – igneous, metamorphic, and sedimentary – and the conditions under which they form.",
    icon: Component,
    color: "text-purple-400",
    border: "border-purple-500/50",
    bg: "bg-purple-950/30"
  },
  {
    id: "gemology",
    title: "Gemology",
    desc: "The science of identifying, grading, and evaluating natural and artificial gemstones.",
    icon: Gem,
    color: "text-pink-400",
    border: "border-pink-500/50",
    bg: "bg-pink-950/30"
  },
  {
    id: "physics",
    title: "Mineral Physics",
    desc: "The science of materials that compose the interior of planets, particularly the Earth.",
    icon: Microscope,
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    bg: "bg-cyan-950/30"
  }
];

export default function MineralogyPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-white overflow-hidden font-sans selection:bg-fuchsia-500/50">
      
      {/* 1. VISUAL ENGINE */}
      <CrystalBackground />
      
      {/* VIGNETTE & GRAIN */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16">
             <div>
                 <Link href="/natural-science" className="flex items-center gap-2 text-xs font-mono text-fuchsia-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Natural_Sciences // Domain_02
                 </Link>
                 <div className="flex items-center gap-4">
                     {/* The Logo: A rotating cube effect using borders */}
                     <div className="relative w-16 h-16 border-2 border-fuchsia-500 flex items-center justify-center rotate-45 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                        <div className="w-10 h-10 border border-white flex items-center justify-center">
                            <Gem size={20} className="text-white -rotate-45" />
                        </div>
                     </div>
                     <div className="ml-4">
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-purple-400 tracking-tighter">
                           MINERALOGY
                        </h1>
                        <div className="flex gap-4 text-[10px] font-mono text-fuchsia-400/60 uppercase tracking-widest mt-1">
                            <span className="flex items-center gap-1"><Sparkles size={10}/> Luster: Vitreous</span>
                            <span className="flex items-center gap-1"><BoxSelect size={10}/> Cleavage: Perfect</span>
                        </div>
                     </div>
                 </div>
             </div>
        </header>

        {/* CONTENT GRID */}
        {/* We use 'group' hover effects to make the cards feel like they are lighting up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto mb-12">
            {SUBDOMAINS.map((item, i) => (
                <div 
                    key={item.id}
                    className={`
                        relative group cursor-pointer transition-all duration-500 hover:-translate-y-1
                    `}
                >
                    {/* The "Cut Gem" Shape background */}
                    {/* We use clip-path to cut the corners */}
                    <div className={`
                        absolute inset-0 backdrop-blur-md border ${item.border} opacity-60 group-hover:opacity-100 transition-opacity
                        ${item.bg}
                    `} 
                    style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}
                    />
                    
                    {/* Inner Glow on Hover */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity
                    `}
                    style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}
                    />

                    {/* Content */}
                    <div className="relative p-8 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 border border-white/10 bg-black/50 ${item.color}`}>
                                <item.icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                0{i+1} // {item.id}
                            </span>
                        </div>

                        <h2 className={`text-3xl font-bold text-white mb-2 group-hover:${item.color} transition-colors`}>
                            {item.title}
                        </h2>
                        
                        <div className="w-12 h-0.5 bg-white/20 mb-4 group-hover:w-full transition-all duration-700 ease-out" />
                        
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                            {item.desc}
                        </p>

                        {/* Decoration: Refractive Index lines */}
                        <div className="mt-auto pt-6 flex gap-1 opacity-20 group-hover:opacity-60 transition-opacity">
                            <div className="h-1 w-2 bg-white skew-x-12" />
                            <div className="h-1 w-4 bg-white skew-x-12" />
                            <div className="h-1 w-1 bg-white skew-x-12" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* FOOTER */}
        <div className="border-t border-fuchsia-900/30 pt-6 flex justify-between items-center text-[10px] text-fuchsia-700 font-mono uppercase tracking-widest">
            <span>System: Triclinic</span>
            <span>Hardness: 9.0 (Mohs)</span>
        </div>

      </div>
    </main>
  );
}
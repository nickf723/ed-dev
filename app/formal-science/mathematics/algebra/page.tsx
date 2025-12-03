"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AlgebraBackground from "@/components/AlgebraBackground"; // NEW Background
import { 
  Variable, Scale, BoxSelect, ArrowRight, 
  Grid3X3, Divide, Braces, User, ShieldQuestion, Cpu
} from "lucide-react";

// --- DATA: ALGEBRAIC STRUCTURES ---
const SECTORS = [
  {
    id: "linear",
    title: "Linear Algebra",
    subtitle: "The Science of Space",
    desc: "The study of vectors, vector spaces, and linear transformations. It is the engine behind modern computing, describing how multi-dimensional space can be warped and mapped.",
    href: "/formal-science/mathematics/algebra/linear-algebra",
    icon: Grid3X3,
    color: "text-cyan-400",
    bg: "bg-cyan-950/30",
    border: "border-cyan-500/50",
    visual: "T(u + v) = T(u) + T(v)",
    visualLabel: "Linearity Property",
    titan: "Hermann Grassmann",
    frontier: "Quantum Computing Gates",
    apps: ["Neural Networks", "3D Graphics", "Engineering"]
  },
  {
    id: "abstract",
    title: "Abstract Algebra",
    subtitle: "The Science of Symmetry",
    desc: "Generalized algebraic structures like groups, rings, and fields. It strips away numbers to study the pure architecture of symmetry and permutation.",
    href: "/formal-science/mathematics/algebra/abstract-algebra",
    icon: BoxSelect,
    color: "text-violet-400",
    bg: "bg-violet-950/30",
    border: "border-violet-500/50",
    visual: "a • (b • c) = (a • b) • c",
    visualLabel: "Associativity Axiom",
    titan: "Emmy Noether",
    frontier: "Langlands Program",
    apps: ["Cryptography (ECC)", "Particle Physics", "Crystallography"]
  },
  {
    id: "elementary",
    title: "Elementary Algebra",
    subtitle: "The Science of Balance",
    desc: "The basic arithmetic of unknown quantities. We introduce variables to generalize specific arithmetic problems into universal formulas.",
    href: "/formal-science/mathematics/algebra/elementary-algebra",
    icon: Variable,
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/50",
    visual: "x = [-b ± √(b² - 4ac)] / 2a",
    visualLabel: "Quadratic Formula",
    titan: "Al-Khwarizmi",
    frontier: "Algorithmic Complexity",
    apps: ["Economics", "Ballistics", "Architecture"]
  },
  {
    id: "pre",
    title: "Pre-Algebra",
    subtitle: "The Bridge",
    desc: "The transition from arithmetic to symbolic reasoning. Integers, fractions, and the fundamental rules of operations that make algebra possible.",
    href: "/formal-science/mathematics/algebra/pre-algebra",
    icon: Divide,
    color: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/50",
    visual: "a(b + c) = ab + ac",
    visualLabel: "Distributive Law",
    titan: "Diophantus",
    frontier: "Math Education Theory",
    apps: ["Logic", "Computer Programming", "Finance"]
  }
];

export default function AlgebraPage() {
  const [activeSector, setActiveSector] = useState<string>("elementary");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      
      {/* 1. New Algebra Background */}
      <AlgebraBackground /> 
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-2">Algebra</h1>
                <p className="text-sm text-neutral-400 font-mono">DOMAIN_01.2.1 // THE_STRUCTURE_OF_RELATION</p>
            </div>
            
            {/* Header Widget: The Scale */}
            <div className="hidden md:flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase text-neutral-500">Equation State</span>
                    <span className="text-xs font-mono text-blue-400">BALANCED</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="p-2 rounded bg-white/5 border border-white/10">
                    <Scale size={18} className="text-white" />
                </div>
            </div>
        </div>

        {/* 2. The Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Navigation (The Variables) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
                {SECTORS.map((sector) => {
                    const isActive = activeSector === sector.id;
                    return (
                        <div 
                            key={sector.id}
                            onMouseEnter={() => setActiveSector(sector.id)}
                            className={`
                                group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300
                                ${isActive ? `h-32 ${sector.bg} ${sector.border} shadow-[0_0_30px_rgba(0,0,0,0.5)]` : "h-20 bg-neutral-900/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/80"}
                            `}
                        >
                            {/* Active Bar */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-bar"
                                    className={`absolute left-0 top-0 bottom-0 w-1 ${sector.color.replace('text', 'bg')}`} 
                                />
                            )}

                            <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-black/20 ${isActive ? sector.color : "text-neutral-600"}`}>
                                            <sector.icon size={18} />
                                        </div>
                                        <h3 className={`text-base font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                                            {sector.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className={`text-xs transition-opacity ${isActive ? "text-neutral-300 opacity-100" : "text-neutral-600 opacity-0"}`}>
                                    {sector.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT: The Workbench (Detail) */}
            <div className="lg:col-span-8 min-h-[60vh] relative pl-4 border-l border-white/5">
                <AnimatePresence mode="wait">
                    {SECTORS.map((sector) => {
                        if (sector.id !== activeSector) return null;
                        
                        return (
                            <motion.div
                                key={sector.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                <Link 
                                    href={sector.href}
                                    className="group relative flex-1 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
                                >
                                    {/* Ambient Background Glow */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${sector.color.replace('text', 'from')} to-transparent`} />
                                    
                                    <div className="relative z-10 p-8 flex-1 flex flex-col">
                                        
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 ${sector.color} mb-4`}>
                                                    <sector.icon size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{sector.subtitle}</span>
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                                    {sector.title}
                                                </h2>
                                            </div>
                                            
                                            {/* Decorative Symbol */}
                                            <div className="hidden md:block opacity-20">
                                                <Braces size={80} strokeWidth={0.5} className="text-white" />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mb-8">
                                            {sector.desc}
                                        </p>

                                        {/* VISUALIZER (Central Feature) */}
                                        <div className="relative bg-black/40 rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center text-center group-hover:border-white/10 transition-colors h-40 overflow-hidden mb-8">
                                            
                                            {/* Animated Grid Lines */}
                                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                                            
                                            {/* The Equation */}
                                            <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 block">
                                                {sector.visualLabel}
                                            </span>
                                            <div className={`relative z-10 font-serif italic text-3xl md:text-4xl ${sector.color} text-shadow-glow`}>
                                                {sector.visual}
                                            </div>
                                        </div>

                                        {/* The Knowledge Matrix (Rich Data) */}
                                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                            
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <User size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Titan</span>
                                                </div>
                                                <div className="text-sm font-medium text-white">{sector.titan}</div>
                                            </div>

                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <ShieldQuestion size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Frontier</span>
                                                </div>
                                                <div className="text-sm font-medium text-white">{sector.frontier}</div>
                                            </div>

                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2 text-neutral-400">
                                                    <Cpu size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Applications</span>
                                                </div>
                                                <div className="text-xs text-white flex flex-wrap gap-1">
                                                    {sector.apps.map((app, i) => (
                                                        <span key={i} className="after:content-[','] last:after:content-[''] mr-1">{app}</span>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                        {/* Action Button */}
                                        <div className={`absolute bottom-8 right-8 p-4 rounded-full bg-white text-black transition-transform group-hover:scale-110 shadow-lg ${sector.color.replace('text', 'shadow')}/50`}>
                                            <ArrowRight size={24} />
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
      </div>
    </main>
  );
}
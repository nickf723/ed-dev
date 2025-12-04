"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AlgebraBackground from "@/components/AlgebraBackground"; 
import { 
  Variable, Scale, BoxSelect, ArrowRight, 
  Grid3X3, Divide, Braces, User, ShieldQuestion, Cpu, 
  ChevronRight, Calculator
} from "lucide-react";

// --- DATA: ALGEBRAIC STRUCTURES ---
const SECTORS = [
  {
    id: "linear",
    title: "Linear Algebra",
    subtitle: "The Science of Space",
    desc: "The study of vectors and linear transformations. It describes how multi-dimensional space shears, rotates, and maps.",
    href: "/formal-science/mathematics/algebra/linear-algebra",
    icon: Grid3X3,
    color: "text-cyan-400",
    bg: "bg-cyan-950/40",
    border: "border-cyan-500/50",
    visual: "T(u + v) = T(u) + T(v)",
    visualLabel: "Linearity Property",
    titan: "Hermann Grassmann",
    frontier: "Quantum Gates",
    apps: ["Neural Networks", "3D Graphics", "Robotics"]
  },
  {
    id: "abstract",
    title: "Abstract Algebra",
    subtitle: "The Science of Symmetry",
    desc: "Generalized structures like groups, rings, and fields. Stripping away numbers to study the pure architecture of symmetry.",
    href: "/formal-science/mathematics/algebra/abstract-algebra",
    icon: BoxSelect,
    color: "text-violet-400",
    bg: "bg-violet-950/40",
    border: "border-violet-500/50",
    visual: "a • (b • c) = (a • b) • c",
    visualLabel: "Associativity",
    titan: "Emmy Noether",
    frontier: "Langlands Program",
    apps: ["Cryptography", "Particle Physics", "Crystallography"]
  },
  {
    id: "elementary",
    title: "Elementary Algebra",
    subtitle: "The Science of Balance",
    desc: "The basic arithmetic of unknown quantities. Introducing variables to generalize specific arithmetic into universal formulas.",
    href: "/formal-science/mathematics/algebra/elementary-algebra",
    icon: Variable,
    color: "text-blue-400",
    bg: "bg-blue-950/40",
    border: "border-blue-500/50",
    visual: "x = [-b ± √(b² - 4ac)] / 2a",
    visualLabel: "Quadratic Formula",
    titan: "Al-Khwarizmi",
    frontier: "Polynomial Complexity",
    apps: ["Economics", "Ballistics", "Optimization"]
  },
  {
    id: "pre",
    title: "Pre-Algebra",
    subtitle: "The Bridge",
    desc: "The transition from arithmetic to symbolic reasoning. Integers, fractions, and the fundamental rules of operations.",
    href: "/formal-science/mathematics/algebra/pre-algebra",
    icon: Divide,
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
    border: "border-emerald-500/50",
    visual: "a(b + c) = ab + ac",
    visualLabel: "Distributive Law",
    titan: "Diophantus",
    frontier: "Pedagogy",
    apps: ["Logic", "Programming", "Finance"]
  }
];

export default function AlgebraPage() {
  const [activeSector, setActiveSector] = useState<string>("linear");

  // Helper to find current sector data
  const current = SECTORS.find(s => s.id === activeSector) || SECTORS[0];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      
      {/* 1. Background Engine (Shearing Grid) */}
      <AlgebraBackground /> 
      
      <div className="relative z-10 w-full min-h-screen flex flex-col p-6 md:p-12 pointer-events-none">
        
        {/* --- HEADER (Top Left) --- */}
        <header className="pointer-events-auto flex items-start justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Braces className="text-blue-500" size={32} />
                    <h1 className="text-4xl font-black tracking-tight text-white">Algebra</h1>
                </div>
                <p className="text-sm text-neutral-400 font-mono ml-11">
                    DOMAIN_01.2.1 // STRUCTURE_&_RELATION
                </p>
            </div>
            
            {/* Context Widget (Top Right) */}
            <div className="hidden md:flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase text-neutral-500">Transform</span>
                    <span className="text-xs font-mono text-cyan-400">AFFINE</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <Calculator size={18} className="text-white" />
            </div>
        </header>

        {/* --- MAIN STAGE (Middle Layer) --- */}
        <div className="flex-1 flex items-center justify-center relative">
            
            {/* FLOATING EQUATION (Center) - No Card Background to show Vectors */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                        {current.visualLabel}
                    </span>
                    <div className={`font-serif italic text-5xl md:text-8xl ${current.color} text-shadow-glow`}>
                        {current.visual}
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>

        {/* --- CONTROL DECK (Bottom) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pointer-events-auto">
            
            {/* NAVIGATION RAIL (Bottom Left) */}
            <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase text-neutral-600 pl-2 mb-2 block">
                    Select Module
                </span>
                {SECTORS.map((sector) => {
                    const isActive = activeSector === sector.id;
                    return (
                        <button 
                            key={sector.id}
                            onMouseEnter={() => setActiveSector(sector.id)}
                            className={`
                                group flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-300 w-full text-left
                                ${isActive ? `bg-neutral-900/80 border-white/20 ${sector.color} shadow-lg` : "bg-black/40 border-white/5 hover:bg-neutral-900/60 hover:border-white/10 text-neutral-400"}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <sector.icon size={18} className={isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"} />
                                <span className="font-bold text-sm tracking-wide">{sector.title}</span>
                            </div>
                            {isActive && <ChevronRight size={14} className="animate-pulse" />}
                        </button>
                    );
                })}
            </div>

            {/* INFO HUD (Bottom Right) */}
            <div className="lg:col-span-8 flex justify-end">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-3xl rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Top Line */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${current.color.split('-')[1]}-500 to-transparent opacity-50`} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Description Column */}
                            <div>
                                <h2 className={`text-2xl font-black text-white mb-2 ${current.color}`}>
                                    {current.title}
                                </h2>
                                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                                    {current.desc}
                                </p>
                                <Link 
                                    href={current.href}
                                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${current.color} hover:text-white transition-colors`}
                                >
                                    <span>Initialize Module</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            {/* Stats Grid Column */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Titan */}
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-1 text-neutral-500">
                                        <User size={12} />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Titan</span>
                                    </div>
                                    <div className="text-xs font-medium text-white">{current.titan}</div>
                                </div>
                                {/* Frontier */}
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-1 text-neutral-500">
                                        <ShieldQuestion size={12} />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Frontier</span>
                                    </div>
                                    <div className="text-xs font-medium text-white">{current.frontier}</div>
                                </div>
                                {/* Apps */}
                                <div className="col-span-2 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-1 text-neutral-500">
                                        <Cpu size={12} />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Applications</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {current.apps.map(app => (
                                            <span key={app} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                                                {app}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>

      </div>
    </main>
  );
}
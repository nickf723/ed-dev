"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SymmetryBackground from "@/app/formal-science/mathematics/algebra/abstract-algebra/SymmetryBackground";
import { 
  BoxSelect, RefreshCw, FlipHorizontal, ArrowRight, 
  Hexagon, Circle, Square, Grid, ShieldQuestion, BrainCircuit, Workflow
} from "lucide-react";

// --- DATA: THE STRUCTURES ---
const SECTORS = [
  {
    id: "groups",
    title: "Group Theory",
    subtitle: "The Study of Symmetry",
    desc: "A group is a set of actions that preserve structure. Think of a Rubik's cube: you can rotate sides, but the cube remains a cube.",
    icon: Hexagon,
    color: "text-violet-400",
    visual: "G = {r0, r90, r180, ...}",
    visualLabel: "Set of Symmetries",
    titan: "Evariste Galois",
    frontier: "Monster Group",
    apps: ["Crystallography", "Quantum Mechanics", "Cryptography"],
    href: "/formal-science/mathematics/algebra/abstract-algebra/groups"
  },
  {
    id: "rings",
    title: "Ring Theory",
    subtitle: "Arithmetic Structure",
    desc: "Rings are structures where you can add and multiply, like integers. This generalizes arithmetic to polynomials and matrices.",
    icon: Circle,
    color: "text-fuchsia-400",
    visual: "(R, +, •)",
    visualLabel: "Ring Definition",
    titan: "Emmy Noether",
    frontier: "Algebraic Geometry",
    apps: ["Coding Theory", "Number Theory", "Signal Processing"],
    href: "/formal-science/mathematics/algebra/abstract-algebra/rings"
  },
  {
    id: "fields",
    title: "Field Theory",
    subtitle: "Division & Rationality",
    desc: "Fields allow for division. The rational numbers, real numbers, and complex numbers are all fields. This is where linear algebra lives.",
    icon: Grid,
    color: "text-cyan-400",
    visual: "F = Q(√2)",
    visualLabel: "Field Extension",
    titan: "Dedekind",
    frontier: "Class Field Theory",
    apps: ["Error Correction", "Encryption", "Computing"],
    href: "/formal-science/mathematics/algebra/abstract-algebra/fields"
  }
];

export default function AbstractAlgebraPage() {
  const [activeSector, setActiveSector] = useState<string>("groups");
  
  // --- INTERACTIVE GROUP WIDGET STATE ---
  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Helper actions for the widget
  const rotate90 = () => setRotation(r => r + 90);
  const flip = () => setFlipped(f => !f);
  const reset = () => { setRotation(0); setFlipped(false); };

  // Get current sector data
  const current = SECTORS.find(s => s.id === activeSector) || SECTORS[0];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-violet-500/30 font-sans">
      
      {/* 1. Background Engine */}
      <SymmetryBackground /> 
      
      <div className="relative z-10 w-full min-h-screen flex flex-col p-6 md:p-12 pointer-events-none">
        
        {/* --- HEADER --- */}
        <header className="pointer-events-auto flex items-start justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <BoxSelect className="text-violet-500" size={32} />
                    <h1 className="text-4xl font-black tracking-tight text-white">Abstract Algebra</h1>
                </div>
                <p className="text-sm text-neutral-400 font-mono ml-11">
                    DOMAIN_01.2.1.2 // SYMMETRY_&_STRUCTURE
                </p>
            </div>
        </header>

        {/* --- MAIN STAGE: THE SYMMETRY LAB --- */}
        <div className="flex-1 flex flex-col items-center justify-center relative pointer-events-auto">
            
            {/* The Interactive Square (Dihedral Group D4) */}
            <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-violet-500/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                
                <motion.div
                    animate={{ 
                        rotate: rotation,
                        scaleX: flipped ? -1 : 1 
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-64 h-64 border-4 border-violet-400/50 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                >
                    {/* Corner Markers to track orientation */}
                    <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_red]" />
                    <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_blue]" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_lime]" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_10px_yellow]" />
                    
                    <span className="text-4xl font-black text-white/20">D₄</span>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-8">
                <button onClick={rotate90} className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-900/40 border border-violet-500/30 hover:bg-violet-500/20 transition-all text-sm font-bold uppercase tracking-wider">
                    <RefreshCw size={16} /> Rotate 90°
                </button>
                <button onClick={flip} className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-900/40 border border-violet-500/30 hover:bg-violet-500/20 transition-all text-sm font-bold uppercase tracking-wider">
                    <FlipHorizontal size={16} /> Flip
                </button>
                <button onClick={reset} className="px-4 py-3 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 text-neutral-400">
                    Reset
                </button>
            </div>

            <p className="text-neutral-500 text-xs font-mono max-w-md text-center">
                Interaction Log: Rotation: {rotation % 360}° // Flipped: {flipped ? "TRUE" : "FALSE"}
                <br/>
                This square represents a Group. No matter how many times you rotate or flip it, it still fits in the same hole.
            </p>

        </div>

        {/* --- CONTROL DECK (Bottom) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pointer-events-auto">
            
            {/* NAVIGATION RAIL */}
            <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase text-neutral-600 pl-2 mb-2 block">
                    Structures
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
                        </button>
                    );
                })}
            </div>

            {/* INFO HUD */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Content */}
                            <div>
                                <h2 className={`text-2xl font-black text-white mb-2 ${current.color}`}>
                                    {current.title}
                                </h2>
                                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                                    {current.desc}
                                </p>
                                {/* Mini Visualizer */}
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-center text-neutral-400 mb-4">
                                    <span className="block text-[9px] uppercase tracking-widest text-neutral-600 mb-2">{current.visualLabel}</span>
                                    <span className={current.color}>{current.visual}</span>
                                </div>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-1 gap-3">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase text-neutral-500">Titan</span>
                                    <span className="text-xs font-medium text-white">{current.titan}</span>
                                </div>
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase text-neutral-500">Frontier</span>
                                    <span className="text-xs font-medium text-white">{current.frontier}</span>
                                </div>
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="block text-[10px] font-bold uppercase text-neutral-500 mb-2">Real World</span>
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
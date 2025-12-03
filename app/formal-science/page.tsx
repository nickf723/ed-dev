"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GameOfLifeBackground from "@/components/GameOfLifeBackground";
import { 
  Binary, Key, Calculator, Network, Terminal, 
  ArrowRight, Cpu, Infinity, ShieldCheck, 
  Code, Sigma, Braces, Globe, Database, Signal, Sparkles
} from "lucide-react";

// --- DATA: THE ABSTRACTION STACK ---
const LAYERS = [
  {
    id: "L5",
    label: "Process Layer",
    title: "Computation & Data",
    desc: "The active processing of information. We build abstract machines to simulate logic, solve problems, and extract meaning from noise.",
    icon: Cpu,
    color: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/50",
    // DISTINCT MODULES RESTORED
    modules: [
        {
            title: "Computer Science",
            desc: "The theory of algorithmic processes and software architecture.",
            href: "/formal-science/computer-science",
            icon: Terminal,
            stat: "TURING_COMPLETE"
        },
        {
            title: "Data Science",
            desc: "Extracting knowledge and insights from structured and unstructured data.",
            href: "/formal-science/data-science",
            icon: Database,
            stat: "PREDICTIVE"
        }
    ]
  },
  {
    id: "L4",
    label: "System Layer",
    title: "Systems & Information",
    desc: "The study of structure and transmission. How parts interact to form complex wholes, and how signals flow through them.",
    icon: Network,
    color: "text-purple-400",
    bg: "bg-purple-950/30",
    border: "border-purple-500/50",
    modules: [
        {
            title: "Systems Science",
            desc: "Holistic modeling of complex behaviors, feedback loops, and emergence.",
            href: "/formal-science/systems-science",
            icon: Globe,
            stat: "HOLISTIC"
        },
        {
            title: "Information Science",
            desc: "The properties, behavior, and flow of information itself.",
            href: "/formal-science/information-science",
            icon: Signal,
            stat: "ENTROPIC"
        }
    ]
  },
  {
    id: "L3",
    label: "Structure Layer",
    title: "Mathematics",
    desc: "The abstract science of number, quantity, and space. It reveals the hidden patterns that govern the universe.",
    icon: Calculator,
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/50",
    modules: [
        {
            title: "Mathematics",
            desc: "The universal language. Algebra, Geometry, Calculus, and Number Theory.",
            href: "/formal-science/mathematics",
            icon: Sigma,
            stat: "UNIVERSAL"
        }
    ]
  },
  {
    id: "L2",
    label: "Logic Layer",
    title: "Logic",
    desc: "The systematic study of valid inference. Logic creates the framework that allows truth to be distinguished from falsehood.",
    icon: Key,
    color: "text-cyan-400",
    bg: "bg-cyan-950/30",
    border: "border-cyan-500/50",
    modules: [
        {
            title: "Formal Logic",
            desc: "Deductive reasoning systems and the structure of argumentation.",
            href: "/formal-science/logic",
            icon: Binary,
            stat: "DEDUCTIVE"
        }
    ]
  },
  {
    id: "L1",
    label: "Origin Layer",
    title: "Axioms",
    desc: "The bedrock. The starting points of reasoning accepted as true without proof.",
    icon: Infinity,
    color: "text-red-500",
    bg: "bg-red-950/30",
    border: "border-red-500/50",
    modules: [] // Special Render Case
  }
];

// Axioms for the "Origin" layer widget
const AXIOMS = [
  { name: "Identity", formula: "A = A", desc: "A thing is itself." },
  { name: "Non-Contradiction", formula: "¬(A ∧ ¬A)", desc: "Nothing can both be and not be." },
  { name: "Excluded Middle", formula: "A ∨ ¬A", desc: "Everything must either be or not be." },
  { name: "Succession", formula: "n + 1", desc: "Every number has a successor." }
];

export default function FormalSciencePage() {
  const [activeLayer, setActiveLayer] = useState<string>("L5");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-cyan-500/30">
      
      {/* 1. Background Engine */}
      <GameOfLifeBackground />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-white mb-2">Formal Sciences</h1>
                <p className="text-sm text-neutral-400 font-mono">DOMAIN_01 // THE_CODE_OF_REALITY</p>
            </div>
        </div>

        {/* 2. The Open Monolith */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: The Stack (Always Visible Navigation) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
                {LAYERS.map((layer) => {
                    const isActive = activeLayer === layer.id;
                    return (
                        <div 
                            key={layer.id}
                            onMouseEnter={() => setActiveLayer(layer.id)}
                            className={`
                                group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300
                                ${isActive ? `h-32 ${layer.bg} ${layer.border} shadow-[0_0_30px_rgba(0,0,0,0.5)]` : "h-24 bg-neutral-900/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/80"}
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-glow"
                                    className={`absolute left-0 top-0 bottom-0 w-1 ${layer.color.replace('text', 'bg')}`} 
                                />
                            )}

                            <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                                {/* Top Row: ID & Icon */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono font-bold ${isActive ? layer.color : "text-neutral-600"}`}>
                                            {layer.id}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                            {layer.label}
                                        </span>
                                    </div>
                                    <layer.icon 
                                        size={20} 
                                        className={`transition-colors ${isActive ? layer.color : "text-neutral-700 group-hover:text-neutral-500"}`} 
                                    />
                                </div>
                                
                                {/* Main Title (ALWAYS VISIBLE) */}
                                <h3 className={`text-lg font-bold transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                                    {layer.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT: The Gateway (Rich Detail) */}
            <div className="lg:col-span-8 min-h-[60vh] relative pl-4 border-l border-white/5">
                <AnimatePresence mode="wait">
                    {LAYERS.map((layer) => {
                        if (layer.id !== activeLayer) return null;
                        
                        return (
                            <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                {/* Layer Header */}
                                <div className="mb-10">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 ${layer.color} mb-4`}>
                                        <layer.icon size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{layer.title}</span>
                                    </div>
                                    <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                        {layer.desc}
                                    </p>
                                </div>

                                {/* CONTENT SWITCH: Modules or Axiom Terminal */}
                                {layer.id !== "L1" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Render distinct cards for each module (CS, Data, etc.) */}
                                        {layer.modules.map((mod) => (
                                            <Link 
                                                key={mod.title} 
                                                href={mod.href}
                                                className="group relative flex-1 p-8 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between min-h-[240px]"
                                            >
                                                {/* Hover Glow */}
                                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${layer.color.replace('text', 'from')} to-transparent`} />
                                                
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${layer.color}`}>
                                                            <mod.icon size={32} />
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono ${layer.color}`}>
                                                            {mod.stat}
                                                        </div>
                                                    </div>
                                                    
                                                    <h3 className="text-2xl font-bold text-white mb-2">{mod.title}</h3>
                                                    <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300">
                                                        {mod.desc}
                                                    </p>
                                                </div>

                                                <div className={`mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity ${layer.color}`}>
                                                    <span>Initialize</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    /* --- L1: THE AXIOM TERMINAL --- */
                                    <div className="flex-1 rounded-3xl border border-red-900/30 bg-black/40 backdrop-blur-xl p-8 flex flex-col relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(200,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
                                        
                                        <div className="flex items-center gap-3 mb-8 border-b border-red-500/20 pb-4">
                                            <ShieldCheck className="text-red-500" />
                                            <span className="text-sm font-bold uppercase tracking-widest text-red-500">Kernel Access // Read-Only</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                            {AXIOMS.map((axiom, i) => (
                                                <div key={i} className="p-4 rounded border border-red-500/10 bg-red-950/10 hover:bg-red-950/20 transition-colors font-mono">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs text-red-400 font-bold uppercase">{axiom.name}</span>
                                                        <span className="text-[10px] text-red-700">AXIOM_0{i}</span>
                                                    </div>
                                                    <div className="text-xl text-white mb-2 tracking-wider">{axiom.formula}</div>
                                                    <p className="text-[10px] text-red-300/60 leading-tight">
                                                        {axiom.desc}
                                                    </p>
                                                </div>
                                            ))}
                                            
                                            {/* Link to Full Axiom Library */}
                                            <Link href="/library/axioms" className="p-4 rounded border border-dashed border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 group">
                                                <Database className="text-red-500 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Open Full Archive</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}

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
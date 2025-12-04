"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PermutationBackground from "@/components/PermutationBackground"; // NEW BACKGROUND
import GroupCalculator from "@/components/GroupCalculator";
import { 
  Hexagon, RefreshCw, Layers, Shield,
  ArrowRight, Grid, Circle, Shuffle, Orbit
} from "lucide-react";

// --- SUB-MODULES ---
const MODULES = [
  {
    title: "Finite Groups",
    desc: "Groups with a finite number of elements. Includes cyclic groups, point groups, and the Monster Group.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/finite-groups",
    icon: Grid,
    color: "text-pink-400",
    border: "border-pink-500/50"
  },
  {
    title: "Continuous (Lie) Groups",
    desc: "Groups representing smooth, continuous symmetries like rotation (SO3) and unitary operations (SU2).",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/lie-groups",
    icon: Circle, // Or a smooth shape icon
    color: "text-cyan-400",
    border: "border-cyan-500/50"
  },
  {
    title: "Permutation Groups",
    desc: "Groups consisting of permutations of a set. The symmetric group Sn contains all possible shuffles.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/permutation-groups",
    icon: Shuffle,
    color: "text-amber-400",
    border: "border-amber-500/50"
  },
  {
    title: "Representation Theory",
    desc: "Representing abstract group elements as matrices to study them using Linear Algebra.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/representation-theory",
    icon: Orbit, // Or matrix icon
    color: "text-violet-400",
    border: "border-violet-500/50"
  }
];

const AXIOMS = [
  {
    title: "Closure",
    desc: "If you combine any two elements, the result remains in the group.",
    icon: Shield,
    example: "a • b ∈ G"
  },
  {
    title: "Associativity",
    desc: "The order of operations does not change the result.",
    icon: Layers,
    example: "(a • b) • c = a • (b • c)"
  },
  {
    title: "Identity",
    desc: "There exists an element 'e' that leaves others unchanged.",
    icon: Hexagon,
    example: "a • e = a"
  },
  {
    title: "Invertibility",
    desc: "Every element has an inverse that returns it to Identity.",
    icon: RefreshCw,
    example: "a • a⁻¹ = e"
  }
];

export default function GroupTheoryPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-violet-500/30 font-sans">
      
      {/* 1. Background */}
      <PermutationBackground /> 
      
      <div className="relative z-10 w-full min-h-screen flex flex-col p-6 md:p-12">
        
        {/* --- HEADER --- */}
        <header className="mb-20 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/50 text-violet-400">
                    <Hexagon size={32} />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">Group Theory</h1>
            </div>
            <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-2xl border-l-2 border-violet-500/50 pl-6 ml-2">
                The language of symmetry. A Group is a machine that defines how a system can be transformed while preserving its essential structure.
            </p>
        </header>

        {/* --- SECTION 1: THE FOUNDATIONS (Axioms) --- */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest">The Four Axioms</h2>
                <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {AXIOMS.map((axiom, i) => (
                    <motion.div 
                        key={axiom.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <axiom.icon size={28} className="text-violet-500 group-hover:scale-110 transition-transform" />
                            <span className="font-mono text-[10px] text-violet-400 opacity-50">{axiom.example}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{axiom.title}</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            {axiom.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* --- SECTION 2: INTERACTIVE LAB (Calculator) --- */}
        <section className="mb-24 flex flex-col items-center">
            <div className="text-center mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-400 mb-2 block">Simulation</span>
                <h2 className="text-3xl font-black text-white mb-2">Cayley Table Visualizer</h2>
                <p className="text-neutral-400 text-sm">Observe the internal structure of finite groups by performing operations.</p>
            </div>
            
            <GroupCalculator />
        </section>

        {/* --- SECTION 3: EXPLORE SUB-DOMAINS --- */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Sectors of Study</h2>
                <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MODULES.map((mod) => (
                    <Link 
                        key={mod.title} 
                        href={mod.href}
                        className="group relative p-8 rounded-3xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/60 transition-all overflow-hidden flex flex-col"
                    >
                        {/* Hover Glow */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${mod.color.replace('text', 'from')} to-transparent`} />
                        
                        <div className="relative z-10 flex items-start gap-6">
                            <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${mod.color}`}>
                                <mod.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline decoration-white/20 underline-offset-4">
                                    {mod.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {mod.desc}
                                </p>
                            </div>
                        </div>

                        <div className={`relative z-10 mt-8 ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${mod.color}`}>
                            <span>Open Sector</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}
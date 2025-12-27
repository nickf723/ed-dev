"use client";

import AxiomBackground from "@/app/formal-science/axioms/AxiomBackground";
import AxiomPlayground from "@/app/formal-science/axioms/AxiomPlayground";
import { ArrowLeft, Infinity, ShieldCheck, Database, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AxiomsPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#030303] text-white overflow-x-hidden selection:bg-red-500/30">
      
      <AxiomBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/formal-science" className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            <span>RETURN_TO_STACK</span>
        </Link>
        <div className="text-[10px] font-mono text-red-500/60 font-bold tracking-widest">
            LAYER_00 // ORIGIN
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <section className="mb-24 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-red-500/20 bg-red-950/10 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                    <Infinity size={12} />
                    <span>The Unprovable Foundation</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                    Axioms
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    An axiom is a statement that is taken to be true, to serve as a premise or starting point for further reasoning and arguments. They cannot be proven, only accepted.
                </p>
            </motion.div>
        </section>

        {/* THE INTERACTIVE PLAYGROUND */}
        <section className="mb-32">
            <AxiomPlayground />
        </section>

        {/* CONTENT BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Block 1: Logical Axioms */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-400 border-b border-red-900/30 pb-4">
                    <ShieldCheck size={24} />
                    <h2 className="text-xl font-bold">Logical Axioms</h2>
                </div>
                <p className="text-neutral-400 leading-relaxed text-sm">
                    These are universally true statements that apply to any consistent system of logic. Without them, we cannot distinguish sense from nonsense. They define the very nature of existence and thought.
                </p>
                <ul className="space-y-4">
                    {[
                        { title: "Law of Identity", code: "A = A", desc: "A thing is itself." },
                        { title: "Law of Non-Contradiction", code: "¬(P ∧ ¬P)", desc: "Statements cannot be both true and false." },
                        { title: "Law of Excluded Middle", code: "P ∨ ¬P", desc: "A statement is either true or false." }
                    ].map((item) => (
                        <li key={item.title} className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-red-500/30 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-neutral-200">{item.title}</span>
                                <code className="text-xs font-mono text-red-400">{item.code}</code>
                            </div>
                            <p className="text-xs text-neutral-500">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Block 2: Non-Logical Axioms */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-400 border-b border-blue-900/30 pb-4">
                    <Database size={24} />
                    <h2 className="text-xl font-bold">Mathematical Axioms</h2>
                </div>
                <p className="text-neutral-400 leading-relaxed text-sm">
                    These are starting points for specific fields, like Arithmetic or Geometry. Unlike logical axioms, we can change them to create different systems (e.g., changing Euclid's parallel postulate creates Non-Euclidean geometry).
                </p>
                <ul className="space-y-4">
                    {[
                        { title: "Peano Axioms", tag: "ARITHMETIC", desc: "Defines the natural numbers (0, 1, 2...)." },
                        { title: "Euclidean Postulates", tag: "GEOMETRY", desc: "Defines flat space and parallel lines." },
                        { title: "Zermelo-Fraenkel (ZFC)", tag: "SET THEORY", desc: "Standard foundation for modern math." }
                    ].map((item) => (
                        <li key={item.title} className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/30 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-neutral-200">{item.title}</span>
                                <span className="text-[10px] font-bold text-blue-400 border border-blue-900/50 px-2 rounded-full">{item.tag}</span>
                            </div>
                            <p className="text-xs text-neutral-500">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        {/* FOOTER QUOTE */}
        <div className="mt-32 text-center max-w-2xl mx-auto opacity-50">
            <BookOpen className="mx-auto mb-4 text-neutral-600" size={24} />
            <blockquote className="text-2xl font-serif italic text-neutral-500">
                "We must believe that there is a truth, otherwise we would not seek it."
            </blockquote>
            <cite className="block mt-4 text-xs font-mono text-neutral-600 uppercase not-italic">
                — Norbert Wiener
            </cite>
        </div>

      </div>
    </main>
  );
}
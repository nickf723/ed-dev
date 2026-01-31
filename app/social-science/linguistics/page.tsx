"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import SyntaxBackground from "./SyntaxBackground";
import GrammarWidget from "./GrammarWidget"; // New interactive lab
import { 
  MessageSquare, Mic2, Layers, Repeat, 
  Share2, Type, ChevronRight, Binary
} from "lucide-react";

export default function LinguisticsPage() {
  const branches = [
    { name: "Phonology", icon: Mic2, color: "text-rose-400", desc: "The Sound System" },
    { name: "Morphology", icon: Layers, color: "text-amber-400", desc: "Word Formation" },
    { name: "Syntax", icon: Repeat, color: "text-lime-400", desc: "Sentence Logic" },
    { name: "Semantics", icon: Type, color: "text-cyan-400", desc: "Constructing Meaning" },
    { name: "Pragmatics", icon: Share2, color: "text-indigo-400", desc: "Social Context" }
  ];

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden selection:bg-lime-500/30">
      <SyntaxBackground />
      
      {/* 1. HERO HUD: THE SEMIOTIC MATRIX */}
      <div className="relative z-20 pt-16 pb-12 px-6">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-lime-500/30 animate-pulse shadow-[0_0_15px_lime-500]" />
        <div className="max-w-4xl">
          <div className="inline-block px-2 py-1 bg-lime-500 text-slate-950 text-[10px] font-black uppercase mb-4 tracking-widest">
            Signal Processor // Active
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
            LINGUISTICS
          </h1>
          <p className="mt-6 text-lime-200/60 max-w-xl font-medium leading-relaxed italic">
            "The scientific study of language and its structure, investigating the cognitive and social processes of human communication."
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* --- UNIVERSAL NAV --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border-t border-b border-white/10 bg-white/5 backdrop-blur-md">
            {branches.map((b) => (
                <Link key={b.name} href={`/social-science/linguistics/${b.name.toLowerCase()}`}
                      className="p-6 border-x border-white/5 hover:bg-lime-500/5 transition-all group">
                    <b.icon className={`${b.color} mb-3 group-hover:scale-110 transition-transform`} size={20} />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white">{b.name}</h3>
                    <p className="text-[9px] text-slate-500 mt-1">{b.desc}</p>
                </Link>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pb-20">
            {/* INTERACTIVE LAB: THE GRAMMAR ENGINE */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-lime-500/20 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Generative Lab</h2>
                    <div className="px-3 py-1 bg-lime-500/10 border border-lime-500/30 rounded-full text-[10px] text-lime-400 font-bold uppercase">Recursive_Loop</div>
                </div>
                <GrammarWidget /> {/* Interactive tree-diagram builder */}
            </div>

            {/* SIDEBAR: CORE THEORIES */}
            <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-3xl bg-black border border-slate-800 hover:border-lime-500/50 transition-colors group">
                    <Binary size={32} className="text-lime-500 mb-4 group-hover:rotate-180 transition-transform duration-700" />
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">The LAD Hypothesis</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                        "We are born with a Language Acquisition Device (LAD)—a biological blueprint that allows children to master complex grammar without formal instruction."
                    </p>
                    <div className="text-[10px] font-mono text-lime-500 uppercase tracking-widest">— Noam Chomsky</div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-lime-900/20 to-slate-950 border border-lime-900/30">
                    <h3 className="text-lg font-bold text-lime-100 mb-2 italic">Linguistic Relativity</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        The **Sapir-Whorf Hypothesis** suggests that the structure of the language we speak influences the way we perceive and think about the world.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
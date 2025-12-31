"use client";
import Link from "next/link";
import LifeBackground from "@/app/formal-science/mathematics/discrete/LifeBackground";
import GraphColoring from "@/app/formal-science/mathematics/discrete/GraphColoring";
import { 
  ArrowLeft, Share2, Binary, Braces, Calculator, 
  Grid, Network, Sigma
} from "lucide-react";

export default function DiscreteMathPage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-blue-100 font-sans selection:bg-orange-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <LifeBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#172554]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest font-mono">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-blue-900 border border-orange-500/50 rounded">
                    <Grid size={18} className="text-orange-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    DISCRETE_MATH
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-blue-300/50 uppercase tracking-widest">
            Module: 01 // Logic & Structures
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE BLUEPRINT (Concepts) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-blue-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Mathematics of "Things"</h2>
                            <p className="text-sm text-blue-200 leading-relaxed mb-6">
                                Calculus studies smooth, continuous change. Discrete mathematics studies distinct, separated objects. It is the language of computer science, logic, and combinatorics.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-black/20 border border-white/10 rounded text-xs font-mono text-orange-300">Integers</span>
                                <span className="px-3 py-1 bg-black/20 border border-white/10 rounded text-xs font-mono text-orange-300">Graphs</span>
                                <span className="px-3 py-1 bg-black/20 border border-white/10 rounded text-xs font-mono text-orange-300">Statements</span>
                            </div>
                        </div>
                    </div>

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-blue-900/40 border border-white/5 p-5 rounded-xl hover:border-orange-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Binary className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Logic</h3>
                            </div>
                            <p className="text-xs text-blue-300/70">
                                True or False. The study of reasoning and inference using formal symbols ($p \implies q$).
                            </p>
                        </div>

                        <div className="bg-blue-900/40 border border-white/5 p-5 rounded-xl hover:border-orange-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Share2 className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Graph Theory</h3>
                            </div>
                            <p className="text-xs text-blue-300/70">
                                The study of pairwise relations between objects (Nodes and Edges).
                            </p>
                        </div>

                        <div className="bg-blue-900/40 border border-white/5 p-5 rounded-xl hover:border-orange-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Braces className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Set Theory</h3>
                            </div>
                            <p className="text-xs text-blue-300/70">
                                Collections of objects. Union, Intersection, and the foundations of all math.
                            </p>
                        </div>

                        <div className="bg-blue-900/40 border border-white/5 p-5 rounded-xl hover:border-orange-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Calculator className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Combinatorics</h3>
                            </div>
                            <p className="text-xs text-blue-300/70">
                                Counting. How many ways can you arrange a deck of cards? ($n!$)
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <GraphColoring />

                    {/* CONTEXT CARD */}
                    <div className="bg-blue-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Network size={18} className="text-orange-500" /> The Four Color Theorem
                        </h3>
                        <p className="text-xs text-blue-200/70 leading-relaxed mb-3">
                            It was the first major theorem to be proved using a computer. It states that any map in a plane can be colored using at most four colors such that no two adjacent regions have the same color.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
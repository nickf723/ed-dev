"use client";
import Link from "next/link";
import NumberBackground from "@/app/formal-science/mathematics/foundations/NumberBackground";
import VisualAdder from "@/app/formal-science/mathematics/foundations/VisualAdder";
import { 
  ArrowLeft, Blocks, Circle, Hash, 
  Scale, BoxSelect, Columns
} from "lucide-react";

export default function FoundationsPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans selection:bg-yellow-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <NumberBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-mono text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-rose-500/50 rounded">
                    <Blocks size={18} className="text-rose-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    FOUNDATIONS
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-rose-500/50 uppercase tracking-widest">
            Axioms & Arithmetic
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Axioms of Order</h2>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Before complex equations, there was simple counting. The Peano Axioms define the natural numbers ($0, 1, 2...$) recursively: 0 is a number, and every number has a successor ($n+1$).
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Hash size={14} className="text-rose-400" />
                                    <span className="text-xs font-mono">Integers</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Scale size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Equality</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-rose-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Columns className="text-rose-500" size={20} />
                                <h3 className="font-bold text-white">Arithmetic</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                The four basic operations: Addition, Subtraction, Multiplication, and Division.
                            </p>
                        </div>

                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-cyan-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Circle className="text-cyan-500" size={20} />
                                <h3 className="font-bold text-white">Basic Shapes</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Recognizing fundamental geometry: Circles, Polygons, and symmetry.
                            </p>
                        </div>
                        
                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-yellow-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <BoxSelect className="text-yellow-500" size={20} />
                                <h3 className="font-bold text-white">Grouping</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                The precursor to Set Theory. Organizing objects by shared properties.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <VisualAdder />

                    {/* PHILOSOPHY CARD */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">Is Math Invented or Discovered?</h3>
                        
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            When you put one rock next to another rock, you have two rocks. This truth exists regardless of whether humans are there to count them. This suggests math is the fundamental language of the universe.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
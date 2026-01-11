"use client";
import React from "react";
import Link from "next/link";
import GroupBackground from "./GroupBackground";
import { 
  ArrowLeft, RefreshCcw, ShieldCheck, 
  RotateCw, Undo2, Link as LinkIcon, 
  Shapes, Fingerprint
} from "lucide-react";

export default function GroupsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f050a] text-white overflow-hidden font-mono selection:bg-rose-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <GroupBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/abstract" className="flex items-center gap-2 text-xs text-rose-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Abstract_Algebra // Struct_01
             </Link>
             <div className="flex items-end gap-6 border-b border-rose-500/30 pb-6">
                 <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    <RefreshCcw size={40} className="text-rose-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       GROUP THEORY
                    </h1>
                    <p className="text-rose-400/60 max-w-md text-sm leading-relaxed">
                        The mathematics of symmetry. A set of elements and an operation that combines them.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE 4 AXIOMS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-rose-500" />
                <h2 className="text-xl font-bold text-rose-300 uppercase tracking-widest">01 // The Definition</h2>
            </div>
            
            <p className="text-sm text-zinc-400 mb-8 max-w-2xl">
                To be a Group, a structure must obey <strong>four sacred rules</strong>. If any breaks, the structure collapses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. CLOSURE */}
                <div className="p-6 bg-black/40 border border-rose-500/20 rounded-xl hover:border-rose-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <LinkIcon size={20} className="text-rose-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-rose-600">Rule 1</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Closure</div>
                    <p className="text-xs text-zinc-500 h-16">
                        If you combine two elements, the result must still be in the group. You cannot escape the universe.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-rose-200">
                        a • b ∈ G
                    </div>
                </div>

                {/* 2. ASSOCIATIVITY */}
                <div className="p-6 bg-black/40 border border-rose-500/20 rounded-xl hover:border-rose-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Shapes size={20} className="text-rose-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-rose-600">Rule 2</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Associativity</div>
                    <p className="text-xs text-zinc-500 h-16">
                        The order of operations doesn't matter (as long as the sequence stays same). Brackets are optional.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-rose-200">
                        (a•b)•c = a•(b•c)
                    </div>
                </div>

                {/* 3. IDENTITY */}
                <div className="p-6 bg-black/40 border border-rose-500/20 rounded-xl hover:border-rose-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Fingerprint size={20} className="text-rose-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-rose-600">Rule 3</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Identity</div>
                    <p className="text-xs text-zinc-500 h-16">
                        There exists a "do nothing" element (e). Combining with it changes nothing.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-rose-200">
                        a • e = a
                    </div>
                </div>

                {/* 4. INVERSE */}
                <div className="p-6 bg-black/40 border border-rose-500/20 rounded-xl hover:border-rose-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Undo2 size={20} className="text-rose-400 group-hover:-rotate-45 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-rose-600">Rule 4</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Inverse</div>
                    <p className="text-xs text-zinc-500 h-16">
                        For every action, there is an action that undoes it, returning you to Identity.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-rose-200">
                        a • a⁻¹ = e
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 2: SYMMETRY (Dihedral Groups) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-rose-500" />
                    <h2 className="text-xl font-bold text-rose-300 uppercase tracking-widest">02 // Symmetries</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    The Dihedral Group ($D_n$) describes the symmetries of a regular polygon. You can <strong>Rotate</strong> it ($r$) or you can <strong>Reflect</strong> it ($s$).
                </p>
                
                
                <div className="p-4 border border-rose-500/30 bg-rose-950/20 rounded-xl">
                    <h3 className="text-sm font-bold text-rose-200 mb-2">The Generators</h3>
                    <ul className="space-y-2 text-xs text-zinc-400 font-mono">
                        <li className="flex items-center gap-2">
                            <RotateCw size={14} className="text-rose-500" /> 
                            <span>r (Rotate): Moves vertices cyclicly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-rose-500" /> 
                            <span>s (Flip): Mirrors across an axis</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Visualizer: The Cayley Table */}
            <div className="aspect-square relative border border-rose-500/30 rounded-xl bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8">
                 <div className="absolute top-4 left-4 text-[10px] text-rose-500 font-bold uppercase tracking-widest">
                     Cayley Table (D₃)
                 </div>
                 
                 {/* The Grid */}
                 <div className="grid grid-cols-4 gap-2 text-center font-mono text-sm">
                     {/* Header */}
                     <div className="opacity-0">.</div>
                     <div className="text-rose-400 font-bold">e</div>
                     <div className="text-rose-400 font-bold">r</div>
                     <div className="text-rose-400 font-bold">s</div>
                     
                     {/* Row 1 */}
                     <div className="text-rose-400 font-bold">e</div>
                     <div className="bg-white/5 rounded p-2">e</div>
                     <div className="bg-white/5 rounded p-2">r</div>
                     <div className="bg-white/5 rounded p-2">s</div>

                     {/* Row 2 */}
                     <div className="text-rose-400 font-bold">r</div>
                     <div className="bg-white/5 rounded p-2">r</div>
                     <div className="bg-white/5 rounded p-2">r²</div>
                     <div className="bg-white/5 rounded p-2 text-rose-200">sr²</div>

                     {/* Row 3 */}
                     <div className="text-rose-400 font-bold">s</div>
                     <div className="bg-white/5 rounded p-2">s</div>
                     <div className="bg-white/5 rounded p-2 text-rose-200">sr</div>
                     <div className="bg-white/5 rounded p-2">e</div>
                 </div>

                 <div className="mt-8 text-xs text-zinc-500 text-center">
                     Notice: r • s ≠ s • r (Not commutative!)
                 </div>
            </div>
        </section>

        {/* SECTION 3: CAYLEY GRAPHS */}
        <section className="bg-black/40 border border-rose-500/30 rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
             
             <div className="relative z-10 max-w-2xl">
                 <h3 className="text-2xl font-bold text-white mb-4">The Shape of the Group</h3>
                 <p className="text-sm text-rose-200/60 mb-8">
                     We can draw groups as maps. Nodes are states, arrows are actions. This is called a <strong>Cayley Graph</strong>.
                 </p>
                 
                 
                 <div className="flex justify-center gap-8 text-sm font-mono text-white">
                     <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-rose-500" />
                         <span>Red Arrow = Rotate</span>
                     </div>
                     <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-blue-500" />
                         <span>Blue Arrow = Flip</span>
                     </div>
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}
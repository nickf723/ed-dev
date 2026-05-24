"use client";
import React from "react";
import Link from "next/link";
import GroupBackground from "./_components/GroupBackground";
import GroupCalculator from "./_components/GroupCalculator";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, RefreshCcw, ShieldCheck, 
  RotateCw, Undo2, Link as LinkIcon, 
  Shapes, Fingerprint, ArrowRight, CheckCircle2,
  Grid3X3, Minimize2, SplitSquareHorizontal, 
  Shuffle, Orbit, Scale3d
} from "lucide-react";

// --- SUB-DOMAINS OF GROUP THEORY ---
const SUB_MODULES = [
  {
    title: "Finite Groups",
    desc: "Cyclic, Dihedral, and Klein groups. The finite building blocks.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/finite-groups",
    icon: Grid3X3,
    color: "text-purple-400",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Subgroups",
    desc: "Groups hiding inside groups. Cosets and Lagrange's Theorem.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/subgroups",
    icon: Minimize2,
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50"
  },
  {
    title: "Quotient Groups",
    desc: "Normal subgroups and the algebra of collapsing symmetry.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/normal-groups",
    icon: SplitSquareHorizontal,
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "Permutations",
    desc: "The Symmetric Group, shuffling elements, and Cycle Notation.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/permutations",
    icon: Shuffle,
    color: "text-rose-400",
    border: "group-hover:border-rose-500/50"
  },
  {
    title: "Group Actions",
    desc: "How groups physically interact with sets. Orbit-Stabilizer Theorem.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/actions",
    icon: Orbit,
    color: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50"
  },
  {
    title: "Isomorphisms",
    desc: "The ultimate theorems proving when two structures are mathematically identical.",
    href: "/formal-science/mathematics/algebra/abstract-algebra/group-theory/isomorphisms",
    icon: Scale3d,
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50"
  }
];

export default function GroupsPage() {
  return (
    <main className="relative min-h-screen bg-[#090211] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <GroupBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/abstract-algebra" className="flex items-center gap-2 text-xs text-purple-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Abstract_Algebra // Struct_01
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-purple-500/30 pb-8">
                 <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.2)] group relative overflow-hidden">
                    <RefreshCcw size={48} className="text-purple-400 relative z-10 group-hover:-rotate-90 transition-transform duration-700" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       GROUP THEORY
                    </h1>
                    <p className="text-purple-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-purple-500/50 pl-6">
                        The mathematics of symmetry. A set of elements and a single operation that combines them without ever breaking the structure.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE 4 AXIOMS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-purple-500" />
                <h2 className="text-xl font-bold text-purple-300 uppercase tracking-widest">01 // The Definition</h2>
            </div>
            
            <p className="text-sm text-zinc-300 mb-8 max-w-3xl leading-relaxed">
                To be a Group <M>(G, \bullet)</M>, a mathematical structure must obey <strong>four sacred rules</strong>. If any single rule breaks, the structure collapses and it ceases to be a group.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. CLOSURE */}
                <div className="p-8 bg-black/40 border border-purple-500/20 rounded-3xl hover:border-purple-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform border border-purple-500/20">
                            <LinkIcon size={20} className="text-purple-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-purple-500 tracking-widest">Rule 1</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Closure</div>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        If you combine any two elements, the result must still exist within the group. You cannot escape the universe.
                    </p>
                    <div className="bg-black/60 p-3 rounded-xl border border-white/5 shadow-inner mt-auto text-center text-purple-200">
                        <M>a \bullet b \in G</M>
                    </div>
                </div>

                {/* 2. ASSOCIATIVITY */}
                <div className="p-8 bg-black/40 border border-cyan-500/20 rounded-3xl hover:border-cyan-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:scale-110 transition-transform border border-cyan-500/20">
                            <Shapes size={20} className="text-cyan-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest">Rule 2</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Associativity</div>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        The order in which you evaluate operations doesn't matter. Brackets are completely optional.
                    </p>
                    <div className="bg-black/60 p-3 rounded-xl border border-white/5 shadow-inner mt-auto text-center text-cyan-200 text-xs">
                        <M>(a \bullet b) \bullet c = a \bullet (b \bullet c)</M>
                    </div>
                </div>

                {/* 3. IDENTITY */}
                <div className="p-8 bg-black/40 border border-emerald-500/20 rounded-3xl hover:border-emerald-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform border border-emerald-500/20">
                            <Fingerprint size={20} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Rule 3</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Identity</div>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        There exists a "do nothing" element <M>(e)</M>. Combining anything with it changes absolutely nothing.
                    </p>
                    <div className="bg-black/60 p-3 rounded-xl border border-white/5 shadow-inner mt-auto text-center text-emerald-200">
                        <M>a \bullet e = a</M>
                    </div>
                </div>

                {/* 4. INVERSE */}
                <div className="p-8 bg-black/40 border border-rose-500/20 rounded-3xl hover:border-rose-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-rose-500/10 rounded-xl group-hover:-rotate-45 transition-transform border border-rose-500/20">
                            <Undo2 size={20} className="text-rose-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-rose-500 tracking-widest">Rule 4</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Inverse</div>
                    <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                        For every single action, there is a counter-action that perfectly undoes it, returning you to the Identity.
                    </p>
                    <div className="bg-black/60 p-3 rounded-xl border border-white/5 shadow-inner mt-auto text-center text-rose-200">
                        <M>{`a \\bullet a^{-1} = e`}</M>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 2: CAYLEY TABLES LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-purple-500" />
                <h2 className="text-xl font-bold text-purple-300 uppercase tracking-widest">02 // The Structure Map</h2>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed mb-6">
                When a group is finite, we can perfectly map out every possible operation using a <strong>Cayley Table</strong>. It is the Sudoku puzzle of abstract algebra. Notice how every row and every column contains each element exactly once (a Latin Square).
            </p>

            <GroupCalculator />
        </section>

        {/* SECTION 3: SYMMETRY (Dihedral Groups) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-purple-500" />
                    <h2 className="text-xl font-bold text-purple-300 uppercase tracking-widest">03 // Real Symmetries</h2>
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Dihedral Groups <M>(D_n)</M></h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Groups aren't just numbers. They describe physics. The Dihedral Group describes the exact symmetries of a regular polygon. For a triangle <M>(D_3)</M>, you can <strong>Rotate</strong> it or you can <strong>Reflect</strong> it. The combination of these actions forms a perfect group structure.
                </p>
                
                <div className="p-6 border border-purple-500/30 bg-black/40 backdrop-blur-md rounded-2xl shadow-inner mt-6">
                    <h4 className="text-xs font-bold text-purple-400 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">The Generators</h4>
                    <ul className="space-y-4 text-sm text-zinc-300">
                        <li className="flex items-center gap-4">
                            <div className="p-2 bg-purple-500/20 rounded border border-purple-500/30 text-purple-400"><RotateCw size={16} /></div> 
                            <div><span className="font-mono font-bold text-white"><M>r</M> (Rotate):</span> Shifts all vertices.</div>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/30 text-cyan-400"><ShieldCheck size={16} /></div> 
                            <div><span className="font-mono font-bold text-white"><M>s</M> (Flip):</span> Mirrors across an axis.</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-center flex-col items-center">
                <div className="relative border border-purple-500/30 rounded-3xl bg-black/60 backdrop-blur-xl p-8 shadow-2xl flex flex-col items-center mb-6">
                     <div className="text-6xl text-purple-400 font-bold mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                         <M>r \bullet s \neq s \bullet r</M>
                     </div>
                     <p className="text-center text-sm text-zinc-400 mt-4 max-w-sm">
                         WARNING: The order of operations changes the physical result. <M>D_3</M> is a <strong>Non-Abelian</strong> group.
                     </p>
                </div>
                
                
            </div>
        </section>

        {/* SECTION 4: SUB-DOMAINS NAVIGATION */}
        <section className="mt-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-purple-500" />
                <h2 className="text-xl font-bold text-purple-300 uppercase tracking-widest">04 // The Deep Dive</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUB_MODULES.map((module, i) => (
                    <Link 
                        key={i} 
                        href={module.href}
                        className={`p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${module.border}`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform ${module.color}`}>
                                <module.icon size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">{module.title}</h3>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {module.desc}
                        </p>
                        
                        <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${module.color}`}>
                            Initialize <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Axioms Verified</h3>
                    <p className="text-purple-100/50 text-sm font-sans font-light">The fundamental symmetry engine is online.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/abstract-algebra/maps" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-purple-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                Next Pillar: Maps <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}
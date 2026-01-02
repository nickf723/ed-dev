"use client";
import Link from "next/link";
import TheoryBackground from "@/app/formal-science/computer-science/theory/TheoryBackground";
import PathfindingLab from "@/app/formal-science/computer-science/theory/PathFindingLab";
import { 
  ArrowLeft, Binary, Network, Lock, 
  Sigma, Clock, Scale
} from "lucide-react";

// --- CONFIG: DISCIPLINES ---
const DISCIPLINES = [
  {
    id: "algo", title: "Algorithms", icon: Scale,
    desc: "Step-by-step procedures for calculation. Sorting, searching, and optimization.",
    color: "text-purple-400", border: "border-purple-500/20"
  },
  {
    id: "complexity", title: "Complexity Theory", icon: Clock,
    desc: "Classifying problems by how hard they are (Time & Space). P vs NP.",
    color: "text-pink-400", border: "border-pink-500/20"
  },
  {
    id: "crypto", title: "Cryptography", icon: Lock,
    desc: "Secure communication in the presence of adversaries. Math of secrets.",
    color: "text-emerald-400", border: "border-emerald-500/20"
  },
  {
    id: "graph", title: "Graph Theory", icon: Network,
    desc: "Modeling pairwise relations between objects. The math of the internet.",
    color: "text-blue-400", border: "border-blue-500/20"
  }
];

export default function TheoryPage() {
  return (
    <main className="relative min-h-screen bg-[#1c1917] text-zinc-300 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <TheoryBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#1c1917]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/computer-science" className="flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Computer Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-800 border border-purple-500/50 rounded">
                    <Binary size={18} className="text-purple-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    THEORY
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            The Limits of Computation
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-[#262626] border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Math Behind the Machine</h2>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                                Before you can write code, you must understand logic. Theoretical Computer Science asks the fundamental questions: What can be computed? How fast can we compute it? And are there limits to what we can know?
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Sigma size={14} className="text-purple-400" />
                                    <span className="text-xs font-mono">Proof</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Clock size={14} className="text-purple-400" />
                                    <span className="text-xs font-mono">Time</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/formal-science/computer-science/theory/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border bg-[#262626] transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-zinc-800
                                    ${d.border}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <d.icon className={d.color} size={18} />
                                    <h3 className="font-bold text-zinc-100 text-sm font-sans">{d.title}</h3>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <PathfindingLab />

                    {/* P vs NP CARD */}
                    <div className="bg-[#262626] border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Clock size={18} className="text-pink-500" /> The Million Dollar Question
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            <strong>P vs NP:</strong> If the solution to a problem is easy to <em>check</em>, is it also easy to <em>find</em>? Most computer scientists believe the answer is "No", but no one has proven it yet.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
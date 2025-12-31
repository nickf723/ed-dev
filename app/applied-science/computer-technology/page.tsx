"use client";
import Link from "next/link";
import CircuitBackground from "@/app/applied-science/computer-technology/CircuitBackground";
import SortingVisualizer from "@/app/applied-science/computer-technology/SortingVisualizer";
import { 
  ArrowLeft, Terminal, Cpu, Network, Database, 
  Lock, Code, Layers, BrainCircuit, Binary
} from "lucide-react";

// --- DATA: THE STACK ---
const STACK = [
  {
    id: "theory", label: "01. THEORY", icon: Binary, color: "text-purple-400", border: "border-purple-500/30",
    topics: ["Discrete Math", "Algorithms", "Data Structures", "Computability", "Complexity Theory"]
  },
  {
    id: "systems", label: "02. SYSTEMS", icon: Layers, color: "text-cyan-400", border: "border-cyan-500/30",
    topics: ["Operating Systems", "Compilers", "Distributed Systems", "Parallel Computing"]
  },
  {
    id: "data", label: "03. DATA", icon: Database, color: "text-emerald-400", border: "border-emerald-500/30",
    topics: ["Databases (SQL/NoSQL)", "Big Data", "Information Theory", "Data Mining"]
  },
  {
    id: "networks", label: "04. NETWORKS", icon: Network, color: "text-orange-400", border: "border-orange-500/30",
    topics: ["Internet Protocols", "Cybersecurity", "Cryptography", "Blockchain"]
  },
  {
    id: "intel", label: "05. INTELLIGENCE", icon: BrainCircuit, color: "text-rose-400", border: "border-rose-500/30",
    topics: ["Machine Learning", "Neural Networks", "Computer Vision", "NLP", "Robotics"]
  }
];

export default function ComputerSciencePage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-300 font-mono selection:bg-green-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <CircuitBackground />
      
      {/* OVERLAY: Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-0 opacity-50" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/" className="flex items-center gap-2 text-xs text-green-600 hover:text-green-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Root
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <Terminal size={20} className="text-green-500" />
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    COMPUTER_SCIENCE <span className="animate-pulse">_</span>
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] text-zinc-600 uppercase tracking-widest">
            System.Status: ONLINE
         </div>
      </header>

      {/* 3. THE SERVER RACK (Bento Grid) */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* --- HERO: THE CPU (Span 2) --- */}
                <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest mb-4">
                            <Cpu size={16} /> Central Processing
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            The Science of<br/>Discrete Structures
                        </h2>
                        <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
                            Computers do not understand ambiguity. They operate on absolute logic: 0 or 1, True or False. Computer Science is the study of what can be computed and how to compute it efficiently.
                        </p>
                    </div>
                </div>

                {/* --- WIDGET: SORTING (Span 1) --- */}
                <div className="md:col-span-1 min-h-[250px]">
                    <SortingVisualizer />
                </div>

                {/* --- INFO: TURING (Span 1) --- */}
                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
                    <div>
                        <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Foundation</div>
                        <h3 className="text-xl font-bold text-white mb-2">The Turing Machine</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            A mathematical model of computation that defines an abstract machine. If a problem can be solved by an algorithm, there exists a Turing machine that can solve it.
                        </p>
                    </div>
                    <div className="mt-4 p-3 bg-black rounded border border-white/5 font-mono text-[10px] text-green-500 overflow-hidden whitespace-nowrap">
                        0 1 1 0 1 0 0 1 [HEAD] 0 1
                    </div>
                </div>

                {/* --- STACK MODULES --- */}
                {STACK.map((layer) => (
                    <div 
                        key={layer.id}
                        className={`
                            bg-zinc-900/40 backdrop-blur-md border rounded-xl p-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                            ${layer.border} hover:bg-zinc-900/60
                        `}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <layer.icon size={24} className={layer.color} />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{layer.label}</span>
                        </div>
                        
                        <div className="space-y-2">
                            {layer.topics.map(topic => (
                                <div key={topic} className="flex items-center gap-2 group/item cursor-pointer">
                                    <span className="text-zinc-600 text-xs group-hover/item:text-green-500 transition-colors">{">"}</span>
                                    <span className="text-sm text-zinc-300 group-hover/item:text-white transition-colors">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
      </div>
    </main>
  );
}
"use client";
import Link from "next/link";
import CircuitBackground from "@/app/formal-science/computer-science/CircuitBackground";
import TuringMachine from "@/app/formal-science/computer-science/TuringMachine";
import { 
  ArrowLeft, Terminal, Cpu, BrainCircuit, 
  Code2, Network, Binary, ArrowUpRight
} from "lucide-react";

// --- CONFIG: DISCIPLINES ---
const DISCIPLINES = [
  {
    id: "software", title: "Software", icon: Code2,
    desc: "The construction of virtual systems. Operating systems, compilers, and applications.",
    color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10"
  },
  {
    id: "hardware", title: "Hardware", icon: Cpu,
    desc: "The physical substrate. Computer architecture, logic gates, and circuits.",
    color: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/10"
  },
  {
    id: "theory", title: "Theory", icon: Binary, // or Sigma
    desc: "The mathematical foundations. Algorithms, complexity classes (P vs NP), and cryptography.",
    color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10"
  },
  {
    id: "ai", title: "Artificial Intelligence", icon: BrainCircuit,
    desc: "Agents that perceive and act. Machine Learning, Neural Networks, and NLP.",
    color: "text-green-400", border: "border-green-500/20", bg: "bg-green-500/10"
  }
];

export default function ComputerSciencePage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-300 overflow-hidden font-sans selection:bg-green-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <CircuitBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science" className="flex items-center gap-2 text-xs font-mono text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Formal Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-slate-900 border border-green-500/50 rounded">
                    <Terminal size={18} className="text-green-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    COMPUTER_SCIENCE
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-green-500/50 uppercase tracking-widest">
            The Study of Information
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Universal Machine</h2>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-mono">
                                Computer Science is not just about programming. It is the study of what can be computed (Theory), how to compute it efficiently (Algorithms), and how to build the machines to do it (Hardware).
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Binary size={14} className="text-blue-400" />
                                    <span className="text-xs font-mono">0s & 1s</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Network size={14} className="text-green-400" />
                                    <span className="text-xs font-mono">Systems</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of von Neumann architecture diagram]


                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/formal-science/computer-science/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-slate-900/40 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-slate-900/60
                                    ${d.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${d.bg}`}>
                                            <d.icon className={d.color} size={18} />
                                        </div>
                                        <h3 className="font-bold text-white text-sm font-sans">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <TuringMachine />

                    {/* CHURCH-TURING THESIS CARD */}
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2 font-mono">
                            <Binary size={18} className="text-purple-500" /> The Church-Turing Thesis
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Any problem that can be solved by an algorithm can be solved by a Turing Machine. This means your smartphone is fundamentally no more powerful than the infinite tape machine above—just faster.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
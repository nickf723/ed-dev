"use client";
import Link from "next/link";
import LogicBackground from "@/app/formal-science/logic/LogicBackground";
import TruthMachine from "@/app/formal-science/logic/TruthMachine";
import { 
  ArrowLeft, BrainCircuit, Scale, Network, 
  Binary, FileText, ShieldQuestion, Quote
} from "lucide-react";

// --- CONFIG: SUB-DOMAINS ---
const DISCIPLINES = [
  {
    id: "propositional", title: "Propositional Logic", icon: Binary,
    desc: "The logic of statements and connectives (AND, OR, NOT). Zero-order logic.",
    color: "text-amber-400", border: "border-amber-500/20"
  },
  {
    id: "predicate", title: "Predicate Logic", icon: Network,
    desc: "Quantifiers (For All, There Exists) and variables. First-order logic.",
    color: "text-cyan-400", border: "border-cyan-500/20"
  },
  {
    id: "modal", title: "Modal Logic", icon: FileText,
    desc: "The logic of necessity and possibility. 'It must be true' vs 'It might be true'.",
    color: "text-purple-400", border: "border-purple-500/20"
  },
  {
    id: "informal", title: "Informal Logic", icon: ShieldQuestion,
    desc: "The study of natural language arguments, critical thinking, and fallacies.",
    color: "text-rose-400", border: "border-rose-500/20"
  }
];

export default function LogicPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-serif selection:bg-amber-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <LogicBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science" className="flex items-center gap-2 text-xs font-mono text-amber-600 hover:text-amber-500 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Formal Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-amber-500/30 rounded">
                    <Scale size={18} className="text-amber-500" />
                 </div>
                 <h1 className="text-xl font-black text-white tracking-tight font-sans">
                    LOGIC
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-amber-500/50 uppercase tracking-widest">
            The Structure of Reason
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-8">
                    
                    {/* HERO CARD */}
                    <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Axioms of Thought</h2>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                                Logic is the study of the principles of valid inference and correct reasoning. It is the tool we use to distinguish truth from falsehood, and valid arguments from fallacies. It underpins all of mathematics and computer science.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <BrainCircuit size={14} className="text-amber-400" />
                                    <span className="text-xs font-mono">Deduction</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Scale size={14} className="text-amber-400" />
                                    <span className="text-xs font-mono">Validity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of Venn diagram logical sets]


                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/formal-science/logic/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-300 
                                    ${d.border}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <d.icon className={d.color} size={20} />
                                    <h3 className="font-bold text-zinc-200 text-sm font-sans">{d.title}</h3>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <TruthMachine />

                    {/* SYLLOGISM CARD */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 w-full font-serif">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2 font-sans">
                            <Quote size={16} className="text-zinc-500" /> The Classic Syllogism
                        </h3>
                        <div className="space-y-2 text-sm pl-4 border-l-2 border-amber-500/30">
                            <p className="text-zinc-300"><strong className="text-amber-500">P1:</strong> All men are mortal.</p>
                            <p className="text-zinc-300"><strong className="text-amber-500">P2:</strong> Socrates is a man.</p>
                            <p className="text-white font-bold mt-2 pt-2 border-t border-white/5">
                                <span className="text-amber-500 mr-2">∴</span> Socrates is mortal.
                            </p>
                        </div>
                        
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
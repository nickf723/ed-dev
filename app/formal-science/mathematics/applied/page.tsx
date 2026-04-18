"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Cpu, Lock, Network, 
  LineChart, Waves, Zap, BookOpen, Calculator, Braces
} from "lucide-react";
// Assumes you have your assessment and the new widget in your _components folder
import Assessment, { AssessmentQuestion } from "@/app/_components/Assessment"; 
import CipherWidget from "./_components/CipherWidget";

// --- CONFIGURATION ---
const SUBDOMAINS = [
  {
    id: "cryptography", title: "Cryptography", subtitle: "Secrets & Security",
    desc: "The mathematical foundation of secure communication, encryption algorithms, and digital signatures.",
    icon: Lock, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-950/20",
    equation: "E(x) = (x + k) mod 26", href: "formal-science/mathematics/applied/cryptography",
    span: "col-span-1 md:col-span-2 lg:col-span-2" 
  },
  {
    id: "game-theory", title: "Game Theory", subtitle: "Strategic Decision Making",
    desc: "Mathematical models of strategic interactions among rational decision-makers.",
    icon: Network, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-950/20",
    equation: "max U_i(s_i, s_-i)", href: "formal-science/mathematics/applied/game-theory",
    span: "col-span-1 md:col-span-2 lg:col-span-2" 
  },
  {
    id: "operations", title: "Operations Research", subtitle: "Optimization",
    desc: "Using advanced analytical methods to help make better complex decisions and optimize systems.",
    icon: Cpu, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-950/20",
    equation: "min c^T x s.t. Ax ≤ b", href: "formal-science/mathematics/applied/operations", span: "col-span-1"
  },
  {
    id: "financial", title: "Financial Math", subtitle: "Markets & Risk",
    desc: "Applied mathematics used in financial markets, pricing derivatives, and risk management.",
    icon: LineChart, color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-950/20",
    equation: "dS_t = μS_t dt + σS_t dW_t", href: "formal-science/mathematics/applied/financial", span: "col-span-1"
  },
  {
    id: "fluid", title: "Fluid Dynamics", subtitle: "Flow & Mechanics",
    desc: "The study of fluids in motion, combining calculus, physics, and computational modeling.",
    icon: Waves, color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-950/20",
    equation: "∇ · v = 0", href: "formal-science/mathematics/applied/fluid-dynamics", span: "col-span-1 lg:col-span-2" 
  }
];

const appliedQuiz: AssessmentQuestion[] = [
  { id: 'a1', type: 'mcq', prompt: 'Which field of applied mathematics is primarily concerned with finding the absolute "best" outcome given a set of strict constraints (like maximizing profit while minimizing materials)?', options: ['Cryptography', 'Operations Research', 'Fluid Dynamics', 'Game Theory'], correctAnswer: 'Operations Research', explanation: 'Operations Research (Optimization) focuses on finding the maximum or minimum of a mathematical function subject to specific constraints.' },
  { id: 'a2', type: 'matching', prompt: 'Match the Applied Math field to its real-world application.', leftItems: ['Cryptography', 'Game Theory', 'Financial Math'], rightItems: ['Securing WhatsApp messages', 'Stock market derivatives pricing', 'Analyzing Cold War nuclear deterrence'], correctPairs: { 'Cryptography': 'Securing WhatsApp messages', 'Game Theory': 'Analyzing Cold War nuclear deterrence', 'Financial Math': 'Stock market derivatives pricing' }, explanation: 'Crypto hides data, Game Theory models strategic conflict/cooperation, and Financial math models economies.' },
  { id: 'a3', type: 'tf', prompt: 'True or False: A Caesar Cipher shifts letters by a set number and is considered unbreakable by modern computers.', correctAnswer: false, explanation: 'False. The Caesar Cipher has only 25 possible keys, making it incredibly easy for a modern computer to break in milliseconds via a "brute force" attack.' }
];

export default function AppliedMathPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-mono selection:bg-cyan-500/50">
      
      {/* VISUAL ENGINE (Tech Theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(6,182,212,0.03)_2px,transparent_2px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col mb-12">
             <Link href="/mathematics" className="flex items-center gap-2 text-xs text-cyan-400 hover:text-white transition-colors mb-4 uppercase tracking-widest group w-max">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Domain_01 // Mathematics
             </Link>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-cyan-500/20 pb-8">
                 <div className="flex items-center gap-6">
                     <div className="w-16 h-16 border border-cyan-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Cpu size={32} className="text-cyan-400 relative z-10" />
                     </div>
                     <div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                           APPLIED MATH
                        </h1>
                        <div className="flex gap-4 text-xs text-cyan-300/60 uppercase tracking-widest mt-2">
                            <span>Language: Implementation</span>
                            <span>Status: Operational</span>
                        </div>
                     </div>
                 </div>
                 
                 <div className="flex gap-4">
                    <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">Modules</div>
                        <div className="text-xl font-bold text-white">05</div>
                    </div>
                    <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">Live Simulators</div>
                        <div className="text-xl font-bold text-white">01</div>
                    </div>
                 </div>
             </div>
        </header>

        

        {/* CONTENT GRID */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-widest">Operational Domains</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SUBDOMAINS.map((item, i) => (
                    <Link 
                        key={item.id}
                        href={item.href}
                        className={`
                            ${item.span}
                            group relative flex flex-col justify-between
                            p-6 border rounded-lg backdrop-blur-md transition-all duration-300
                            hover:-translate-y-1 hover:shadow-2xl hover:bg-opacity-40
                            ${item.border} ${item.bg}
                        `}
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded border border-white/10 bg-black/40 ${item.color}`}>
                                <item.icon size={20} />
                            </div>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest">{`0${i+1}`}</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h2>
                            <div className={`text-[10px] font-bold uppercase mb-3 opacity-70 ${item.color}`}>{item.subtitle}</div>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-6 h-10 line-clamp-2">{item.desc}</p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity">{item.equation}</div>
                            <Braces size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- THE INTERACTIVE LAB --- */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-widest">The Implementation Lab</h2>
            </div>
            
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <CipherWidget />
            </div>
        </div>

        {/* --- THE DAILY HUB --- */}
        <div className="w-full mt-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          <div className="col-span-1 flex flex-col gap-8">
            <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors h-full">
                 <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors"><BookOpen size={64} /></div>
                 <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-6"><Zap size={14} className="text-amber-400" /> Core Terminology</div>
                 <h4 className="text-4xl font-serif italic text-white mb-2">Equilibrium</h4>
                 <div className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">noun | [ ee-kwuh-lib-ree-uhm ] | Game Theory</div>
                 <p className="text-sm text-slate-300 leading-relaxed mb-6">A state in a game where no player has an incentive to change their chosen strategy after considering an opponent's choice. Most commonly known as a "Nash Equilibrium."</p>
                 <div className="p-4 bg-cyan-950/30 border-l-2 border-cyan-500 rounded-r-lg mt-auto">
                    <p className="text-xs text-cyan-200/80 italic font-serif">"In the prisoner's dilemma, both players betraying each other is the Nash Equilibrium."</p>
                 </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Assessment title="Knowledge Check: Applied Mathematics" questions={appliedQuiz} onComplete={(score, total) => console.log(`Applied Quiz Scored: ${score}/${total}`)} />
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="border-t border-cyan-900/30 pt-6 flex justify-between items-center text-[10px] text-cyan-500/60 font-mono uppercase tracking-widest mt-8">
            <span>EXECUTED SUCCESSFULLY</span>
            <span>Turing Complete Architecture</span>
        </div>

      </div>
    </main>
  );
}
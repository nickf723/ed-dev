"use client";
import React from "react";
import { TheoryBackground } from "./TheoryBackground";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { 
  Sigma, 
  BrainCircuit, 
  Puzzle, 
  Scale, 
  FileCode, 
  Binary, 
  Infinity, 
  HelpCircle
} from "lucide-react";

export default function ComputationTheoryPage() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-500 font-mono">
      <TheoryBackground />
      
      {/* HEADER */}
      <header className="flex flex-col items-center text-center gap-6 py-8 border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-950/20 text-pink-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
           <Sigma size={12} /> Formal Systems
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          COMPUTATION THEORY
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
           Asking the fundamental questions: What is computable? How efficiently can we solve it?
        </p>
      </header>

      {/* THE THEORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* 1. AUTOMATA THEORY */}
        <DashboardCard 
          title="Automata Theory" 
          icon={BrainCircuit} 
          href="/formal-science/computer-science/theory/automata"
          accentColor="slate"
          className="bg-black/40 border-white/10"
        >
          <div className="mt-auto space-y-4">
             

[Image of finite state machine diagram]

             <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                <span>Finite State</span>
                <span>Pushdown</span>
             </div>
             <div className="text-xs text-slate-300">
                Mathematical models of abstract machines.
             </div>
          </div>
        </DashboardCard>

        {/* 2. COMPUTABILITY (Turing) */}
        <DashboardCard 
          title="Computability" 
          icon={Binary} 
          href="/formal-science/computer-science/theory/computability"
          accentColor="purple"
          className="bg-black/40 border-purple-500/20"
        >
          <div className="mt-auto space-y-2">
             <div className="p-2 bg-purple-900/20 border border-purple-500/20 rounded font-mono text-[10px] text-purple-300 overflow-hidden whitespace-nowrap">
                1 0 1 1 0 1 [HEAD] 0 0 1
             </div>
             <div className="text-xs text-slate-400">
                The Turing Machine & The Halting Problem.
             </div>
          </div>
        </DashboardCard>

        {/* 3. COMPLEXITY (P vs NP) - Hero Card */}
        <DashboardCard 
          title="Complexity Theory" 
          icon={Puzzle} 
          href="/formal-science/computer-science/theory/complexity-theory"
          accentColor="orange"
          className="row-span-2 bg-gradient-to-b from-orange-950/10 to-black/60 border-orange-500/20"
        >
           <div className="flex flex-col h-full items-center justify-center text-center space-y-4">
              <HelpCircle size={48} className="text-orange-500/50" />
              <div className="text-3xl font-black text-white">P vs NP</div>
              <p className="text-xs text-orange-200/70 max-w-[200px]">
                 The biggest unsolved problem in computer science. If a solution is easy to check, is it also easy to find?
              </p>
              <div className="grid grid-cols-2 gap-2 w-full mt-4">
                 <div className="p-2 bg-black/40 border border-orange-500/30 rounded text-[10px] text-orange-400">P (Easy)</div>
                 <div className="p-2 bg-black/40 border border-orange-500/30 rounded text-[10px] text-orange-400">NP (Hard?)</div>
              </div>
           </div>
        </DashboardCard>

        {/* 4. LOGIC */}
        <DashboardCard 
          title="Formal Logic" 
          icon={Scale} 
          href="/formal-science/computer-science/theory/logic"
          accentColor="slate"
          className="bg-black/40 border-white/10"
        >
           <div className="mt-auto font-mono text-xs text-slate-300">
              ∀x ∃y (P(x) → Q(y))
           </div>
        </DashboardCard>

        {/* 5. INFORMATION THEORY */}
        <DashboardCard 
          title="Information Theory" 
          icon={FileCode} 
          href="/formal-science/computer-science/theory/information-theory"
          accentColor="cyan"
          className="bg-black/40 border-cyan-500/20"
        >
           <div className="mt-auto text-xs text-slate-400">
              Quantifying data. Entropy, compression, and channel capacity.
           </div>
        </DashboardCard>

        {/* 6. QUANTUM COMPUTING (Theory) */}
        <DashboardCard 
          title="Quantum Theory" 
          icon={Infinity} 
          href="/formal-science/computer-science/theory/quantum-theory"
          accentColor="purple"
          className="lg:col-span-2 bg-purple-950/10 border-purple-500/20"
        >
           <div className="flex items-center justify-between mt-auto">
              <div>
                 <div className="text-sm font-bold text-white">Beyond Binary</div>
                 <div className="text-xs text-purple-400">Superposition & Entanglement</div>
              </div>
              <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75" />
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
              </div>
           </div>
        </DashboardCard>

      </div>
    </div>
  );
}
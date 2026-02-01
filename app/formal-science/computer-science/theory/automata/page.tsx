"use client";
import React from "react";
import { AutomataBackground } from "./AutomataBackground";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { Panel } from "@/components/ui/Panel";
import { 
  Bot, 
  GitCommit, 
  ArrowRightLeft, 
  Regex, 
  Braces, 
  CircleDot,
  ArrowRight
} from "lucide-react";

export default function AutomataPage() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-500 font-mono">
      <AutomataBackground />
      
      {/* HEADER */}
      <header className="flex flex-col gap-6 border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest">
           <Bot size={14} /> Abstract Machines
        </div>
        <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
              AUTOMATA
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
               The study of self-operating virtual machines. These simple mathematical models are the foundation of all compiler design, pattern matching, and AI behavior.
            </p>
        </div>
      </header>

      {/* THE CHOMSKY HIERARCHY (Visualized) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: FINITE AUTOMATA (Simplest) */}
        <div className="space-y-6">
           <div className="flex items-center gap-2 text-sky-500 text-xs font-bold uppercase tracking-widest mb-2">
               Level 1: Regular Languages
           </div>
           
           <DashboardCard 
              title="DFA & NFA" 
              icon={CircleDot} 
              href="/learn/automata/finite"
              accentColor="cyan"
              className="bg-slate-900/50 border-sky-500/20"
           >
              <div className="space-y-4 mt-auto">
                 <div className="flex justify-center py-4 opacity-80">
                    
                 </div>
                 <div className="text-xs text-slate-400">
                    Machines with no memory. They are in exactly one state at a time.
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="bg-sky-950/30 p-1 rounded text-center text-[10px] text-sky-400 border border-sky-500/20">
                        Vending Machines
                    </div>
                    <div className="bg-sky-950/30 p-1 rounded text-center text-[10px] text-sky-400 border border-sky-500/20">
                        Traffic Lights
                    </div>
                 </div>
              </div>
           </DashboardCard>

           <DashboardCard 
              title="Regular Expressions" 
              icon={Regex} 
              href="/learn/automata/regex"
              accentColor="slate"
              className="bg-slate-900/50"
           >
              <div className="mt-auto font-mono text-xs text-slate-300">
                 Pattern matching text using FSMs.
                 <br/><span className="text-pink-400">/^[a-z0-9]+$/i</span>
              </div>
           </DashboardCard>
        </div>

        {/* COLUMN 2: PUSHDOWN AUTOMATA (Memory) */}
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-purple-500 text-xs font-bold uppercase tracking-widest mb-2">
               Level 2: Context-Free
           </div>

           <DashboardCard 
              title="Pushdown Automata" 
              icon={ArrowRightLeft} 
              href="/learn/automata/pushdown"
              accentColor="purple"
              className="h-full bg-slate-900/50 border-purple-500/20"
           >
              <div className="flex flex-col h-full justify-between">
                 <div className="text-center py-8">
                     <div className="inline-block p-4 border-2 border-dashed border-purple-500/30 rounded-lg">
                        <div className="text-xs text-purple-300 mb-2">THE STACK</div>
                        <div className="w-12 h-4 bg-purple-500/20 mx-auto mb-1 rounded-sm" />
                        <div className="w-12 h-4 bg-purple-500/20 mx-auto mb-1 rounded-sm" />
                        <div className="w-12 h-4 bg-purple-500/20 mx-auto mb-1 rounded-sm" />
                        <div className="w-12 h-4 border border-purple-500/20 mx-auto rounded-sm" />
                     </div>
                 </div>
                 <div className="text-xs text-slate-400">
                    Automata with a "Stack" memory. Capable of parsing nested structures like HTML or Code.
                 </div>
              </div>
           </DashboardCard>
        </div>

        {/* COLUMN 3: TURING MACHINES (Infinite) */}
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">
               Level 0: Recursively Enumerable
           </div>

           <DashboardCard 
              title="The Turing Machine" 
              icon={GitCommit} 
              href="/learn/automata/turing"
              accentColor="emerald"
              className="h-full bg-slate-900/50 border-emerald-500/20"
           >
              <div className="flex flex-col h-full justify-between">
                 <div className="mt-auto text-xs text-slate-400 mb-4">
                    Infinite tape. Infinite time. Capable of computing anything that is computable.
                 </div>
                 <Panel className="bg-emerald-950/10 border-emerald-500/20">
                    <div className="flex items-center gap-4">
                        <Braces size={16} className="text-emerald-500" />
                        <div>
                            <div className="text-xs font-bold text-white">Universal Computation</div>
                            <div className="text-[10px] text-emerald-400">Godel, Escher, Bach</div>
                        </div>
                    </div>
                 </Panel>
              </div>
           </DashboardCard>
        </div>

      </div>

      {/* FOOTER: APPLICATIONS */}
      <div className="border-t border-white/5 pt-8">
         <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Real World Applications</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded border border-white/5 bg-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-sky-400 font-bold text-sm mb-1">Compilers</div>
                <div className="text-[10px] text-slate-400">Lexical Analysis</div>
            </div>
            <div className="p-4 rounded border border-white/5 bg-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-purple-400 font-bold text-sm mb-1">Text Editors</div>
                <div className="text-[10px] text-slate-400">Search & Replace</div>
            </div>
            <div className="p-4 rounded border border-white/5 bg-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-emerald-400 font-bold text-sm mb-1">Game AI</div>
                <div className="text-[10px] text-slate-400">State Behaviors</div>
            </div>
            <div className="p-4 rounded border border-white/5 bg-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-orange-400 font-bold text-sm mb-1">Hardware</div>
                <div className="text-[10px] text-slate-400">Circuit Design</div>
            </div>
         </div>
      </div>
    </div>
  );
}
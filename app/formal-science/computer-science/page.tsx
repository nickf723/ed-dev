"use client";
import React from "react";
import { ComputerScienceBackground } from "./ComputerScienceBackground";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { 
  Terminal, 
  Cpu, 
  Network, 
  BrainCircuit, 
  Code2, 
  Binary, 
  ShieldCheck, 
  Layers,
  Server
} from "lucide-react";

export default function ComputerScienceHub() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-500 font-mono">
      <ComputerScienceBackground />
      
      {/* HERO: THE TERMINAL HEADER */}
      <header className="border-b border-emerald-500/30 pb-8 relative">
        <div className="absolute top-0 right-0 flex gap-4 text-[10px] text-emerald-500/50">
            <span>UPTIME: 99.99%</span>
            <span>MEM: 64TB</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                <Terminal size={24} />
            </div>
            <div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                    SYSTEM_<span className="text-emerald-500">ROOT</span>
                </h1>
                <p className="text-emerald-400/60 text-sm">
                    &gt; sudo mount /formal-science/computer-science
                </p>
            </div>
        </div>
      </header>

      {/* THE ARCHITECTURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. HARDWARE (The Core) */}
        <DashboardCard 
          title="Hardware_Arch" 
          icon={Cpu} 
          href="/formal-science/computer-science/hardware"
          accentColor="emerald"
          className="lg:col-span-2 lg:row-span-2 bg-black/60 border-emerald-500/30"
        >
          <div className="flex flex-col h-full justify-between">
            <div className="my-auto text-center space-y-4">
                 

[Image of cpu architecture diagram]

                 <div className="text-xs text-emerald-500/50">Processing Unit Detected</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-8">
                <div className="p-2 bg-emerald-900/20 border border-emerald-500/20 rounded text-[10px] text-emerald-400 text-center">
                    LOGIC GATES
                </div>
                <div className="p-2 bg-emerald-900/20 border border-emerald-500/20 rounded text-[10px] text-emerald-400 text-center">
                    ISA
                </div>
            </div>
          </div>
        </DashboardCard>

        {/* 2. PROGRAMMING (The Input) */}
        <DashboardCard 
          title="Source_Code" 
          icon={Code2} 
          href="/formal-science/computer-science/software"
          accentColor="cyan"
          className="bg-black/60"
        >
          <div className="mt-auto font-mono text-xs text-cyan-300">
             fn main() &#123;<br/>
             &nbsp;&nbsp;init_world();<br/>
             &#125;
          </div>
        </DashboardCard>

        {/* 3. ALGORITHMS (The Optimization) */}
        <DashboardCard 
          title="Algos & Data" 
          icon={Binary} 
          href="/formal-science/computer-science/algorithms"
          accentColor="purple"
          className="bg-black/60"
        >
          <div className="mt-auto text-xs text-purple-300">
             O(n log n) Efficiency
          </div>
        </DashboardCard>

        {/* 4. AI (The Intelligence) */}
        <DashboardCard 
          title="Neural_Net" 
          icon={BrainCircuit} 
          href="/formal-science/computer-science/artificial-intelligence"
          accentColor="orange"
          className="bg-black/60"
        >
          <div className="mt-auto space-y-1">
             <div className="h-1 w-full bg-orange-900/30 rounded overflow-hidden">
                <div className="h-full w-3/4 bg-orange-500 animate-pulse" />
             </div>
             <div className="text-[10px] text-orange-400 text-right">TRAINING...</div>
          </div>
        </DashboardCard>

        {/* 5. THEORY (The Math) */}
        <DashboardCard 
          title="Comp_Theory" 
          icon={Layers} 
          href="/formal-science/computer-science/theory"
          accentColor="slate"
          className="bg-black/60"
        >
          <div className="mt-auto text-xs text-slate-400">
             Automata • Turing Machines • Complexity
          </div>
        </DashboardCard>

        {/* 6. NETWORKS (The Connection) */}
        <DashboardCard 
          title="Net_Sec" 
          icon={ShieldCheck} 
          href="/formal-science/computer-science/security-cryptography"
          accentColor="emerald"
          className="lg:col-span-2 bg-emerald-950/10 border-emerald-500/20"
        >
           <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center gap-2 text-emerald-400">
                <Network size={16} />
                <span className="text-sm font-bold">Protocol Layer</span>
             </div>
             <div className="text-[10px] font-mono text-emerald-600 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/20">
                ENCRYPTION: AES-256
             </div>
           </div>
        </DashboardCard>

      </div>
    </div>
  );
}
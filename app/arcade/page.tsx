"use client";
import PageHeader from "@/components/PageHeader";
import LudologyBackground from "@/components/LudologyBackground";
import Link from "next/link";
import { Gamepad2, Swords, Zap, Monitor, ArrowRight } from "lucide-react";

export default function ArcadeHub() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LudologyBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="The Arcade"
          subtitle="Active simulations and interactive experiments. Theory put into practice."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
            {/* Simulation 1: MTG */}
            <Link href="/interdisciplines/game-studies/library/magic-the-gathering" className="group relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 hover:border-red-500/50 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                 
                 {/* Content */}
                 <div className="relative z-20 p-10 h-full flex flex-col justify-end">
                    <div className="mb-auto p-4 rounded-2xl bg-red-500/20 text-red-500 w-fit backdrop-blur-md border border-red-500/30">
                        <Swords size={32} />
                    </div>
                    
                    <h3 className="text-4xl font-black text-white mb-2 tracking-tight">Battle Sim</h3>
                    <p className="text-neutral-400 max-w-sm mb-6">Test deck probability and combat mechanics in a vacuum environment.</p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 group-hover:text-white transition-colors">
                        Launch Simulation <ArrowRight size={14} />
                    </div>
                 </div>
            </Link>

            {/* Simulation 2: Game Theory */}
            <Link href="/interdisciplines/game-studies" className="group relative h-80 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 hover:border-blue-500/50 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                 
                 <div className="relative z-20 p-10 h-full flex flex-col justify-end">
                    <div className="mb-auto p-4 rounded-2xl bg-blue-500/20 text-blue-500 w-fit backdrop-blur-md border border-blue-500/30">
                        <Monitor size={32} />
                    </div>
                    
                    <h3 className="text-4xl font-black text-white mb-2 tracking-tight">Prisoner's Dilemma</h3>
                    <p className="text-neutral-400 max-w-sm mb-6">Challenge the algorithm in a game of trust, betrayal, and nash equilibria.</p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                        Enter Matrix <ArrowRight size={14} />
                    </div>
                 </div>
            </Link>

             {/* Simulation 3: UI Lab */}
            <Link href="/dev-playground" className="col-span-1 md:col-span-2 group relative h-48 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 hover:border-green-500/50 transition-all flex items-center px-12 gap-8">
                 <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="p-4 rounded-2xl bg-green-500/20 text-green-500 w-fit backdrop-blur-md border border-green-500/30 shrink-0">
                    <Zap size={32} />
                 </div>
                 
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">System Lab</h3>
                    <p className="text-neutral-400">Experimental UI components and physics engines. Access the backend visualization tools.</p>
                 </div>
                 
                 <div className="ml-auto relative z-10 p-4 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={24} />
                 </div>
            </Link>

        </div>
      </div>
    </main>
  );
}
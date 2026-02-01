"use client";
import React from "react";
import { CosmologyBackground } from "./CosmologyBackground"; // Import the Web
import { DashboardCard } from "@/components/ui/DashboardCard";
import { Panel } from "@/components/ui/Panel";
import { 
  Sparkles, 
  Flame, 
  Snowflake, 
  Atom, 
  Orbit, 
  CircleDashed,
  Infinity,
  Clock
} from "lucide-react";

export default function CosmologyPage() {
  return (
    <div className="p-8 md:p-12 min-h-screen space-y-12 animate-in fade-in duration-1000">
      <CosmologyBackground />

      {/* HERO: THE ORIGIN */}
      <header className="flex flex-col items-center text-center gap-6 py-12">
        <div className="relative">
            <div className="absolute inset-0 bg-white blur-3xl opacity-20 animate-pulse" />
            <Sparkles size={64} className="text-white relative z-10" />
        </div>
        <div>
            <h1 className="text-7xl font-black text-white tracking-tighter mb-2">
                COSMOLOGY
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-light">
                The chronology, structure, and ultimate fate of the universe.
            </p>
        </div>
        
        {/* KEY METRIC */}
        <div className="flex gap-8 mt-4">
            <div className="text-center">
                <div className="text-3xl font-black text-white">13.8 B</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Years Old</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
                <div className="text-3xl font-black text-white">93 B</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Light Years Wide</div>
            </div>
        </div>
      </header>

      {/* SECTION 1: COMPOSITION OF THE UNIVERSE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* DARK ENERGY */}
        <DashboardCard title="Dark Energy" icon={CircleDashed} accentColor="purple" className="bg-indigo-950/20">
            <div className="flex flex-col h-full justify-between">
                <div className="text-5xl font-black text-purple-400 mt-4">68%</div>
                <div className="text-sm text-indigo-200 mt-2">
                    An unknown form of energy affecting the universe on the largest scales. The driver of acceleration.
                </div>
            </div>
        </DashboardCard>

        {/* DARK MATTER */}
        <DashboardCard title="Dark Matter" icon={Infinity} accentColor="cyan" className="bg-indigo-950/20">
            <div className="flex flex-col h-full justify-between">
                <div className="text-5xl font-black text-cyan-400 mt-4">27%</div>
                <div className="text-sm text-indigo-200 mt-2">
                    Matter that does not interact with the electromagnetic force. The "glue" holding galaxies together.
                </div>
            </div>
        </DashboardCard>

        {/* NORMAL MATTER */}
        <DashboardCard title="Baryonic Matter" icon={Atom} accentColor="orange" className="bg-indigo-950/20">
            <div className="flex flex-col h-full justify-between">
                <div className="text-5xl font-black text-orange-400 mt-4">5%</div>
                <div className="text-sm text-indigo-200 mt-2">
                    Everything we can see. Stars, planets, gas, dust, and you.
                </div>
            </div>
        </DashboardCard>
      </div>

      {/* SECTION 2: THE TIMELINE */}
      <div className="max-w-6xl mx-auto space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Clock size={14} /> Chronology of Events
        </h2>
        
        <div className="relative border-l border-white/10 ml-4 space-y-12 py-4">
            
            {/* ERA 1: PLANCK EPOCH */}
            <div className="relative pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_white]" />
                
                <Panel className="border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                        <Flame className="text-orange-400" size={20} />
                        <span className="text-lg font-bold text-white">The Big Bang & Inflation</span>
                        <span className="ml-auto text-xs font-mono text-slate-400">t = 10⁻³² s</span>
                    </div>
                    <p className="text-sm text-slate-300">
                        The universe expands from a singularity to macroscopic size in a fraction of a second. Space is a hot, dense plasma.
                    </p>
                </Panel>
            </div>

            {/* ERA 2: RECOMBINATION */}
            <div className="relative pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
                
                <Panel className="border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-950/20 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                        <Snowflake className="text-cyan-400" size={20} />
                        <span className="text-lg font-bold text-white">Recombination</span>
                        <span className="ml-auto text-xs font-mono text-slate-400">t = 380,000 yrs</span>
                    </div>
                    <p className="text-sm text-slate-300">
                        The universe cools enough for protons and electrons to form neutral hydrogen. Light breaks free, creating the <strong className="text-white">Cosmic Microwave Background</strong>.
                    </p>
                </Panel>
            </div>

             {/* ERA 3: THE DARK AGES */}
             <div className="relative pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-700" />
                
                <Panel className="opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-5 h-5 rounded-full bg-black border border-white/20" />
                        <span className="text-lg font-bold text-slate-400">The Dark Ages</span>
                        <span className="ml-auto text-xs font-mono text-slate-500">t = 400M yrs</span>
                    </div>
                    <p className="text-sm text-slate-400">
                        No stars exist yet. The universe is filled with neutral hydrogen gas and dark matter. Gravity begins to pull matter into clumps.
                    </p>
                </Panel>
            </div>

            {/* ERA 4: STELLIFEROUS ERA (NOW) */}
            <div className="relative pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_purple]" />
                
                <Panel className="border-purple-500/20 bg-purple-950/10 hover:bg-purple-950/20 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                        <Orbit className="text-purple-400" size={20} />
                        <span className="text-lg font-bold text-white">The Era of Stars</span>
                        <span className="ml-auto text-xs font-mono text-slate-400">t = Now</span>
                    </div>
                    <p className="text-sm text-slate-300">
                        Gravity ignites the first stars and galaxies. Galaxies cluster along the filaments of the cosmic web. You are here.
                    </p>
                </Panel>
            </div>

        </div>
      </div>
    </div>
  );
}
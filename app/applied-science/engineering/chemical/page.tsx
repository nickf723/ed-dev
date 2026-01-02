"use client";
import Link from "next/link";
import ChemBackground from "@/app/applied-science/engineering/chemical/ChemBackground";
import ReactorLab from "@/app/applied-science/engineering/chemical/ReactorLab";
import { 
  ArrowLeft, FlaskConical, Factory, Dna, 
  Flame, Leaf, Recycle, Layers
} from "lucide-react";

export default function ChemicalPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-zinc-200 overflow-hidden font-sans selection:bg-lime-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <ChemBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#022c22]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science/engineering" className="flex items-center gap-2 text-xs font-mono text-lime-500 hover:text-lime-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Engineering
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-emerald-900 border border-lime-500/50 rounded">
                    <FlaskConical size={18} className="text-lime-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    CHEMICAL
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-lime-500/50 uppercase tracking-widest">
            Scaling the Reaction
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-emerald-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-lime-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">From Beaker to Barrel</h2>
                            <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                                Chemical engineers figure out how to take a reaction that works in a lab and scale it up to produce millions of tons. They design the processes that turn raw materials (oil, gas, minerals, biomass) into the products we use every day.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Factory size={14} className="text-lime-400" />
                                    <span className="text-xs font-mono">Process</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Recycle size={14} className="text-lime-400" />
                                    <span className="text-xs font-mono">Refine</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of chemical distillation column diagram]


                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-lime-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Factory className="text-lime-500" size={20} />
                                <h3 className="font-bold text-white">Process Eng.</h3>
                            </div>
                            <p className="text-xs text-emerald-200/60">
                                Designing continuous systems (Reactors, Heat Exchangers, Separators) for mass production.
                            </p>
                        </div>

                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-amber-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Flame className="text-amber-500" size={20} />
                                <h3 className="font-bold text-white">Petrochemical</h3>
                            </div>
                            <p className="text-xs text-emerald-200/60">
                                Refining oil and natural gas into fuels, plastics, and synthetic materials.
                            </p>
                        </div>
                        
                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-pink-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Dna className="text-pink-500" size={20} />
                                <h3 className="font-bold text-white">Biochemical</h3>
                            </div>
                            <p className="text-xs text-emerald-200/60">
                                Using biological organisms (yeast, bacteria) to produce pharmaceuticals and biofuels.
                            </p>
                        </div>

                        <div className="bg-emerald-950/40 border border-white/5 p-5 rounded-xl hover:border-cyan-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Layers className="text-cyan-500" size={20} />
                                <h3 className="font-bold text-white">Materials</h3>
                            </div>
                            <p className="text-xs text-emerald-200/60">
                                Developing polymers, nanomaterials, and ceramics with specific properties.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <ReactorLab />

                    {/* MASS BALANCE CARD */}
                    <div className="bg-emerald-950/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">Mass & Energy Balance</h3>
                        <p className="text-xs text-emerald-200/60 leading-relaxed mb-3">
                            The golden rule of ChemE: "What goes in must come out (or accumulate)."
                        </p>
                        <div className="bg-black/20 p-2 rounded text-center text-xs font-mono text-lime-400">
                            Accumulation = In - Out + Generation - Consumption
                        </div>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
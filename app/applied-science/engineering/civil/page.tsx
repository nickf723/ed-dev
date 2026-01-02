"use client";
import Link from "next/link";
import CivilBackground from "@/app/applied-science/engineering/civil/CivilBackground";
import BeamLab from "@/app/applied-science/engineering/civil/BeamLab";
import { 
  ArrowLeft, HardHat, Building2, Truck, Droplets, 
  Trees, Ruler, Anchor
} from "lucide-react";

export default function CivilPage() {
  return (
    <main className="relative min-h-screen bg-[#18181b] text-zinc-200 overflow-hidden font-sans selection:bg-yellow-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <CivilBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#18181b]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science" className="flex items-center gap-2 text-xs font-mono text-yellow-500 hover:text-yellow-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Applied Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-800 border border-yellow-500/50 rounded">
                    <HardHat size={18} className="text-yellow-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    CIVIL_ENGINEERING
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-yellow-500/50 uppercase tracking-widest">
            Structuring Society
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Skeleton of Society</h2>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Civil engineering is the art of directing the great sources of power in nature for the use and convenience of man. It deals with the design, construction, and maintenance of the physical and naturally built environment.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Building2 size={14} className="text-yellow-500" />
                                    <span className="text-xs font-mono">Structures</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Droplets size={14} className="text-cyan-500" />
                                    <span className="text-xs font-mono">Fluids</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-yellow-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Building2 className="text-yellow-500" size={20} />
                                <h3 className="font-bold text-white">Structural</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Analyzing load paths. Making sure buildings, bridges, and towers don't fall down.
                            </p>
                        </div>

                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-cyan-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Droplets className="text-cyan-500" size={20} />
                                <h3 className="font-bold text-white">Water Resources</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Hydraulics, dams, and canals. Controlling the flow of water and preventing floods.
                            </p>
                        </div>
                        
                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-yellow-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Truck className="text-yellow-500" size={20} />
                                <h3 className="font-bold text-white">Transportation</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Moving people and goods. Designing highways, railways, and traffic systems.
                            </p>
                        </div>

                        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl hover:border-green-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Trees className="text-green-500" size={20} />
                                <h3 className="font-bold text-white">Environmental</h3>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Waste treatment and pollution control. Harmonizing the built environment with nature.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <BeamLab />

                    {/* STATICS CARD */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Anchor size={18} className="text-zinc-400" /> Statics vs Dynamics
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            <strong>Statics</strong> is the study of bodies at rest (forces are balanced, $\Sigma F = 0$). <br/>
                            <strong>Dynamics</strong> is the study of bodies in motion. Civil engineers mostly want things to stay put!
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}
"use client";
import Link from "next/link";
import BlueprintBackground from "@/app/applied-science/architecture/BlueprintBackground";
import VitruvianTotem from "@/app/applied-science/architecture/VitruvianTotem";
import { 
  ArrowLeft, Building, Ruler, PenTool, Layers, Map, 
  Compass, HardHat, Boxes
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-sky-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <BlueprintBackground />
      
      {/* VIGNETTE & OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      {/* Subtle paper texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/applied-science" className="flex items-center gap-2 text-xs font-mono text-sky-500 hover:text-sky-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Applied_Science // Domain_01
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-sky-900/30 border border-sky-500/50 rounded-sm shadow-[0_0_15px_rgba(56,189,248,0.2)] relative overflow-hidden">
                        <Ruler size={32} className="text-sky-400 relative z-10" />
                        {/* Blueprint scanline effect */}
                        <div className="absolute inset-0 bg-sky-400/20 animate-[scanline_2s_linear_infinite] -translate-y-full" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg font-serif">
                        ARCHITECTURE
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-sky-500/60 text-xs bg-slate-900/80 p-4 rounded-sm border border-sky-500/20 backdrop-blur-md">
                 <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"/> STATUS: DRAFTING
                 </div>
                 <div>PROJECT: NTERFACE_HUB.dwg</div>
                 <div>SCALE: 1:100</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE DESIGN PROCESS (Workflow visualization) */}
            <div className="lg:col-span-7 space-y-8">
                
                <div className="bg-slate-900/60 backdrop-blur-md border border-sky-500/20 rounded-2xl p-8 relative overflow-hidden">
                    <h2 className="text-2xl font-bold text-white font-serif mb-6 flex items-center gap-3">
                        <PenTool className="text-sky-400" /> The Design Process
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Architecture is the bridge between the abstract and the concrete. It is a recursive process of imagining, refining, and realizing spaces for human habitation.
                    </p>

                    {/* Process Flowchart visual */}
                    <div className="relative">
                        {/* Connector Line */}
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-sky-500/20 border-t border-dashed border-sky-500/40 z-0" />
                        
                        <div className="grid grid-cols-4 gap-4 relative z-10">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 bg-slate-800 border border-sky-500/50 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform bg-[url('/grid.svg')] bg-center">
                                    <Compass size={20} className="text-sky-300" />
                                </div>
                                <div className="text-xs font-bold text-white mb-1">CONCEPT</div>
                                <div className="text-[9px] font-mono text-slate-500 uppercase">Ideation & Sketch</div>
                            </div>
                            {/* Node 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 bg-slate-800 border border-sky-500/50 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <Layers size={20} className="text-sky-300" />
                                </div>
                                <div className="text-xs font-bold text-white mb-1">SCHEMATIC</div>
                                <div className="text-[9px] font-mono text-slate-500 uppercase">Spatial Org.</div>
                            </div>
                            {/* Node 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 bg-slate-800 border border-sky-500/50 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <Boxes size={20} className="text-sky-300" />
                                </div>
                                <div className="text-xs font-bold text-white mb-1">DEVELOPMENT</div>
                                <div className="text-[9px] font-mono text-slate-500 uppercase">Systems Integration</div>
                            </div>
                            {/* Node 4 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 bg-sky-900/50 border border-sky-400 rounded-full flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-110 transition-transform">
                                    <HardHat size={20} className="text-white" />
                                </div>
                                <div className="text-xs font-bold text-white mb-1">CONSTRUCTION</div>
                                <div className="text-[9px] font-mono text-sky-400 uppercase">Realization</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SCALES OF IMPACT */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-sky-500/30 transition-colors group">
                        <div className="flex items-center gap-3 mb-4">
                            <Building className="text-sky-500 group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="text-lg font-bold text-white">The Edifice</h3>
                        </div>
                        <p className="text-sm text-slate-400">
                            Designing individual buildings. Focusing on form, material, facade, and the human experience within a single structure.
                        </p>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors group">
                        <div className="flex items-center gap-3 mb-4">
                            <Map className="text-amber-500 group-hover:scale-110 transition-transform" size={24} />
                            <h3 className="text-lg font-bold text-white">Urban Planning</h3>
                        </div>
                        <p className="text-sm text-slate-400">
                            Designing cities and communities. Focusing on infrastructure, zoning, public spaces, and how buildings interact at scale.
                        </p>
                    </div>
                </div>

            </div>


            {/* RIGHT: FOUNDATIONAL PRINCIPLES (Widget) */}
            <div className="lg:col-span-5 h-full min-h-[500px]">
                <VitruvianTotem />
            </div>

        </div>
      </div>
    </main>
  );
}
"use client";
import Link from "next/link";
import MicrobialBackground from "@/app/natural-science/biology/microbiology/MicrobialBackground";
import CulturePlateWidget from "@/app/natural-science/biology/microbiology/CulturePlateWidget";
import { 
  ArrowLeft, Bug, Shield, Dna, Microscope, 
  FlaskConical, Skull, Activity, Biohazard 
} from "lucide-react";

export default function MicrobiologyPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-lime-50 overflow-hidden selection:bg-lime-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <MicrobialBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-16 pointer-events-auto">
             <div>
                 <Link href="/natural-science/biology" className="flex items-center gap-2 text-xs font-mono text-lime-500 hover:text-lime-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Biology // Micro
                 </Link>
                 <div className="flex items-center gap-4">
                     <div className="p-3 bg-lime-900/30 border border-lime-500/20 rounded-xl">
                        <Microscope size={32} className="text-lime-400" />
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg font-serif">
                        MICRO<br/>BIOLOGY
                     </h1>
                 </div>
             </div>
             
             <div className="hidden md:block text-right font-mono text-lime-500/60 text-xs bg-black/40 p-4 rounded border border-lime-500/20">
                 <div>SCALE: 1 - 10 µm</div>
                 <div>HAZARD LEVEL: BIO-SAFETY 1</div>
                 <div className="mt-2 text-white/40">CLICK TO DEPLOY ANTIBODIES</div>
             </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE INVISIBLE KINGDOMS */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* BACTERIA CARD */}
                <div className="bg-neutral-900/80 backdrop-blur-md border border-lime-500/20 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6">
                        <Bug size={24} className="text-lime-400" />
                        <h2 className="text-2xl font-bold text-white">Bacteriology</h2>
                    </div>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Single-celled prokaryotes. They are everywhere—in the soil, the ocean, and your gut. While some cause disease (pathogens), most are essential for life (nitrogen fixation, digestion).
                    </p>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="w-8 h-8 mx-auto rounded-full bg-lime-500/20 border border-lime-500 mb-2"></div>
                            <span className="text-[10px] text-lime-300 font-bold">COCCI</span>
                            <div className="text-[9px] text-neutral-500">Spherical</div>
                        </div>
                        <div className="flex-1 bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="w-8 h-4 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 mb-2 mt-2"></div>
                            <span className="text-[10px] text-emerald-300 font-bold">BACILLI</span>
                            <div className="text-[9px] text-neutral-500">Rod-shaped</div>
                        </div>
                        <div className="flex-1 bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="w-8 h-8 mx-auto text-cyan-500 text-2xl leading-none">⌇</div>
                            <span className="text-[10px] text-cyan-300 font-bold">SPIRILLA</span>
                            <div className="text-[9px] text-neutral-500">Spiral</div>
                        </div>
                    </div>
                </div>

                {/* VIROLOGY CARD */}
                <div className="bg-neutral-900/80 backdrop-blur-md border border-red-500/20 rounded-3xl p-8 group hover:border-red-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Biohazard size={24} className="text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Virology</h2>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        Viruses are not technically alive. They are genetic code (DNA or RNA) wrapped in protein. They must hijack a host cell to replicate.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                        <Skull size={14} /> <span>OBLIGATE PARASITES</span>
                    </div>
                </div>

            </div>


            {/* RIGHT: DEFENSE & LAB */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* CULTURE PLATE WIDGET */}
                <CulturePlateWidget />

                {/* IMMUNOLOGY */}
                <div className="bg-neutral-900/80 border border-cyan-500/20 rounded-2xl p-6">
                    <h3 className="font-bold text-cyan-200 mb-2 flex items-center gap-2">
                        <Shield size={18} className="text-cyan-500" /> Immunology
                    </h3>
                    <p className="text-xs text-cyan-100/60 leading-relaxed mb-4">
                        The body's defense system. White blood cells identify "non-self" antigens and produce antibodies to neutralize them.
                    </p>
                    
                    {/* Visual: Antibody Y shape */}
                    <div className="h-16 flex items-center justify-center gap-8 opacity-50">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M12 22V12M12 12L5 5M12 12L19 5" />
                        </svg>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M12 22V12M12 12L5 5M12 12L19 5" />
                        </svg>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}
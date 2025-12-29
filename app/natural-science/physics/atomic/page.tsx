"use client";
import Link from "next/link";
import { M } from "@/components/Math";
import ShellBackground from "@/app/natural-science/physics/atomic/ShellBackground";
import { ArrowLeft, Circle, Disc, Zap, Activity, ScanLine } from "lucide-react";
import { useState } from "react";

export default function AtomicPhysicsPage() {
  const [model, setModel] = useState<"bohr" | "quantum">("bohr");

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-cyan-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <ShellBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD UI */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-white/10 pb-6">
             <div>
                 <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs font-mono text-cyan-500 hover:text-cyan-400 transition-colors mb-4 uppercase tracking-widest">
                    <ArrowLeft size={12} /> Physics_Engine // Sector_07
                 </Link>
                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-200 tracking-tighter drop-shadow-lg">
                    ATOMIC<br/>PHYSICS
                 </h1>
             </div>

             {/* SPECTRAL ANALYZER DECORATION */}
             <div className="mt-8 md:mt-0 w-full md:w-64">
                 <div className="text-[10px] font-mono text-neutral-500 mb-2 uppercase tracking-widest flex justify-between">
                     <span>Emission Spectrum</span>
                     <span>H (Z=1)</span>
                 </div>
                 <div className="h-12 bg-neutral-900 rounded border border-white/20 relative overflow-hidden flex items-center">
                     {/* Spectral Lines */}
                     <div className="absolute left-[15%] w-[2px] h-full bg-red-500 shadow-[0_0_10px_red]" />
                     <div className="absolute left-[40%] w-[2px] h-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
                     <div className="absolute left-[70%] w-[2px] h-full bg-blue-600 shadow-[0_0_10px_blue]" />
                     <div className="absolute left-[85%] w-[2px] h-full bg-violet-600 shadow-[0_0_10px_violet]" />
                 </div>
             </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
            
            {/* LEFT: CONTROLS & INFO */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* MODEL SWITCHER */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-widest">Atomic Model</h3>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl">
                        <button 
                            onClick={() => setModel("bohr")}
                            className={`py-3 rounded-lg text-sm font-bold transition-all ${model === "bohr" ? "bg-cyan-500 text-black shadow-lg" : "text-neutral-400 hover:text-white"}`}
                        >
                            BOHR
                        </button>
                        <button 
                            onClick={() => setModel("quantum")}
                            className={`py-3 rounded-lg text-sm font-bold transition-all ${model === "quantum" ? "bg-fuchsia-500 text-black shadow-lg" : "text-neutral-400 hover:text-white"}`}
                        >
                            QUANTUM
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-neutral-300 leading-relaxed">
                        {model === "bohr" ? (
                            <p>
                                <strong className="text-cyan-400 block mb-1">The Planetary Model (1913)</strong>
                                Electrons orbit the nucleus in distinct, quantized energy levels. They jump between shells by absorbing or emitting photons.
                            </p>
                        ) : (
                            <p>
                                <strong className="text-fuchsia-400 block mb-1">The Cloud Model (1926)</strong>
                                Electrons behave as probability waves defined by orbitals (s, p, d, f). We cannot know their exact path, only where they are <em>likely</em> to be.
                            </p>
                        )}
                    </div>
                </div>

                {/* INSTRUCTION CARD */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-transparent border-l-4 border-cyan-500 p-6 rounded-r-xl">
                    <div className="flex items-center gap-3 text-cyan-400 mb-2 font-bold">
                        <Zap size={18} />
                        <span>INTERACTIVE DEMO</span>
                    </div>
                    <p className="text-sm text-cyan-100/70">
                        Click anywhere on the screen to bombard the atom with energy. Watch the electron get <strong>excited</strong> to a higher shell, then <strong>relax</strong> back down, emitting light.
                    </p>
                </div>

            </div>

            {/* RIGHT: DATA READOUTS */}
            <div className="lg:col-span-8 flex flex-col justify-end">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* QUANTIZATION */}
                    <div className="group bg-neutral-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
                        <div className="mb-4 p-3 bg-white/5 rounded-full w-fit group-hover:bg-cyan-500/10 transition-colors">
                            <Disc size={20} className="text-neutral-400 group-hover:text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-white mb-1">Quantization</h3>
                        <p className="text-xs text-neutral-500 mb-4">Energy comes in packets.</p>
                        <div className="text-lg font-serif text-cyan-200">
                            <M>{"E_n = -\\frac{13.6 \\text{eV}}{n^2}"}</M>
                        </div>
                    </div>

                    {/* SPECTROSCOPY */}
                    <div className="group bg-neutral-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-fuchsia-500/30 transition-colors">
                        <div className="mb-4 p-3 bg-white/5 rounded-full w-fit group-hover:bg-fuchsia-500/10 transition-colors">
                            <ScanLine size={20} className="text-neutral-400 group-hover:text-fuchsia-400" />
                        </div>
                        <h3 className="font-bold text-white mb-1">Spectroscopy</h3>
                        <p className="text-xs text-neutral-500 mb-4">Light fingerprints.</p>
                        <div className="text-lg font-serif text-fuchsia-200">
                            <M>{"\\Delta E = hf = \\frac{hc}{\\lambda}"}</M>
                        </div>
                    </div>

                    {/* FINE STRUCTURE */}
                    <div className="group bg-neutral-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-green-500/30 transition-colors">
                        <div className="mb-4 p-3 bg-white/5 rounded-full w-fit group-hover:bg-green-500/10 transition-colors">
                            <Activity size={20} className="text-neutral-400 group-hover:text-green-400" />
                        </div>
                        <h3 className="font-bold text-white mb-1">Fine Structure</h3>
                        <p className="text-xs text-neutral-500 mb-4">Spin-orbit coupling.</p>
                        <div className="text-lg font-serif text-green-200">
                            <M>{"\\alpha \\approx \\frac{1}{137}"}</M>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </main>
  );
}
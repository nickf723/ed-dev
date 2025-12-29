"use client";
import { useState } from "react";
import Link from "next/link";
import { M } from "@/components/Math";
import ObserverBackground from "@/app/natural-science/physics/quantum-mechanics/ObserverBackground";
import { ArrowLeft, Atom, Box, Eye, Cat, Skull, Shuffle, Zap } from "lucide-react";

export default function QuantumMechanicsPage() {
  // SUPERPOSITION STATE
  const [boxState, setBoxState] = useState<"closed" | "alive" | "dead">("closed");
  const [isCollapsing, setIsCollapsing] = useState(false);

  const observeBox = () => {
    if (boxState !== "closed") {
        setBoxState("closed"); // Reset
        return;
    }
    
    setIsCollapsing(true);
    // Simulate "Calculation" time
    setTimeout(() => {
        setIsCollapsing(false);
        setBoxState(Math.random() > 0.5 ? "alive" : "dead");
    }, 800);
  };

  return (
    <main className="relative min-h-screen bg-[#020205] text-white overflow-hidden selection:bg-fuchsia-500/30 font-mono">
      
      {/* 1. VISUAL ENGINE */}
      <ObserverBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16 border-b border-fuchsia-900/30 pb-6">
             <Link href="/natural-science/physics" className="flex items-center gap-2 text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Physics_Engine // Sector_05
             </Link>
             <div className="flex justify-between items-end">
                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-fuchsia-600 drop-shadow-[0_0_25px_rgba(232,121,249,0.4)]">
                    QUANTUM<br/>MECHANICS
                 </h1>
                 <div className="hidden md:block text-right">
                     <div className="flex items-center justify-end gap-2 text-fuchsia-500 mb-1">
                        <Eye size={16} /> <span className="text-xs tracking-widest">OBSERVER ACTIVE</span>
                     </div>
                     <div className="text-2xl font-bold text-white">h = 6.626 × 10⁻³⁴</div>
                 </div>
             </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: THE THEORY */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* Intro Card */}
                <div className="p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-fuchsia-500/20 shadow-[0_0_50px_-20px_rgba(232,121,249,0.1)]">
                    <h2 className="text-2xl font-bold text-fuchsia-200 mb-4 flex items-center gap-3">
                        <Atom className="text-fuchsia-500" /> Wave-Particle Duality
                    </h2>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        Matter doesn't exist as definite points in space. Until measured, particles exist as a <span className="text-fuchsia-300">probability wave</span>. 
                        Moving your mouse around this page simulates the "Observer Effect"—your observation forces the waves to collapse into particles.
                    </p>
                    
                    <div className="bg-black/40 rounded-xl p-6 border-l-4 border-fuchsia-500">
                        <div className="text-xs text-fuchsia-500/80 mb-2 uppercase">The Schrödinger Equation</div>
                        <div className="text-xl md:text-2xl text-center py-2 text-white overflow-x-auto">
                            <M>{"i\\hbar\\frac{\\partial}{\\partial t}\\Psi(r,t) = \\hat{H}\\Psi(r,t)"}</M>
                        </div>
                        <div className="mt-2 text-[10px] text-neutral-500 text-center">
                            Describes how the quantum state of a physical system changes over time.
                        </div>
                    </div>
                </div>

                {/* Heisenberg Card */}
                <div className="p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 hover:border-fuchsia-500/30 transition-colors">
                     <div className="flex items-center gap-4 mb-4">
                        <Shuffle className="text-fuchsia-400" />
                        <h2 className="text-xl font-bold text-white">Uncertainty Principle</h2>
                     </div>
                     <p className="text-sm text-neutral-400 mb-6">
                        You cannot know both the position and momentum of a particle with perfect precision. The more you know one, the less you know the other.
                     </p>
                     <div className="flex justify-center">
                         <div className="px-8 py-3 bg-fuchsia-500/10 rounded-full border border-fuchsia-500/30 text-fuchsia-200 font-serif text-xl">
                            <M>{"\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}"}</M>
                         </div>
                     </div>
                </div>

            </div>


            {/* RIGHT COLUMN: THE INTERACTIVE (Schrödinger's Cat) */}
            <div className="lg:col-span-5">
                <div className="sticky top-12">
                    <div className="p-1 rounded-3xl bg-gradient-to-b from-fuchsia-500/30 to-fuchsia-900/10">
                        <div className="bg-black/80 rounded-[22px] p-8 text-center relative overflow-hidden">
                            
                            {/* Header */}
                            <div className="relative z-10 mb-8">
                                <h3 className="text-lg font-bold text-white mb-1">SUPERPOSITION TEST</h3>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest">Thought Experiment No. 42</p>
                            </div>

                            {/* The Box */}
                            <div className="relative h-64 flex items-center justify-center mb-8 perspective-[1000px]">
                                {boxState === "closed" ? (
                                    <button 
                                        onClick={observeBox}
                                        disabled={isCollapsing}
                                        className={`
                                            w-40 h-40 bg-neutral-800 rounded-xl border-2 border-neutral-600 
                                            flex items-center justify-center shadow-2xl group hover:border-fuchsia-500 transition-all
                                            ${isCollapsing ? "animate-[shake_0.5s_linear_infinite]" : "hover:scale-105"}
                                        `}
                                    >
                                        <Box size={64} className="text-neutral-400 group-hover:text-fuchsia-400 transition-colors" />
                                        {/* Question Mark */}
                                        <div className="absolute -top-4 -right-4 w-10 h-10 bg-fuchsia-600 rounded-full flex items-center justify-center font-bold text-xl border-4 border-black">
                                            ?
                                        </div>
                                    </button>
                                ) : (
                                    <div className="animate-[popIn_0.5s_ease-out]">
                                        <div className={`
                                            w-40 h-40 rounded-full flex items-center justify-center border-4
                                            ${boxState === "alive" ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"}
                                        `}>
                                            {boxState === "alive" ? (
                                                <Cat size={80} className="text-green-400" />
                                            ) : (
                                                <Skull size={80} className="text-red-400" />
                                            )}
                                        </div>
                                        <div className={`mt-4 text-2xl font-bold uppercase tracking-widest ${boxState === "alive" ? "text-green-400" : "text-red-400"}`}>
                                            {boxState}
                                        </div>
                                        <button 
                                            onClick={observeBox}
                                            className="mt-6 text-xs text-neutral-500 underline hover:text-white"
                                        >
                                            RESET EXPERIMENT
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Status Text */}
                            <div className="border-t border-white/10 pt-6">
                                <div className="flex justify-between text-xs font-mono mb-2">
                                    <span className="text-neutral-500">STATE:</span>
                                    <span className={boxState === "closed" ? "text-fuchsia-400 animate-pulse" : "text-white"}>
                                        {boxState === "closed" ? "|Ψ⟩ = α|Alive⟩ + β|Dead⟩" : "COLLAPSED"}
                                    </span>
                                </div>
                                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                                    <div className={`h-full ${isCollapsing ? "bg-fuchsia-500 w-full animate-[scanline_1s_linear_infinite]" : "bg-neutral-600 w-0"}`} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}
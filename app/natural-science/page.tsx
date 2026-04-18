"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Telescope, Globe, Dna, FlaskConical, Atom, 
  ArrowLeft, Eye, TestTubeDiagonal, GitPullRequest, ArrowUpRight,
  Layers, Microscope, Radar
} from "lucide-react";

import { useAppStore } from "@/lib/store";
import { ParticleButton } from "@/app/_components/ui/ParticleButton";
import { cn } from "@/lib/utils";
import { NaturalScienceBackground } from "./NaturalScienceBackground";
import VocabDrawer, { VocabWord } from "@/app/_components/ui/VocabDrawer";
import { naturalScienceFoundationsTerms } from "@/app/_data/vocab/n/natural-science";

// --- INTERACTIVE CARDS ---
const SCIENCES = [
  {
    id: "astronomy",
    title: "Astronomy",
    scale: "10²⁶m",
    desc: "Cosmology & Astrophysics",
    icon: Telescope,
    bgId: "cosmos-dark",
    mode: "cosmos" as const,
    href: "/natural-science/astronomy" 
  },
  {
    id: "earth-science",
    title: "Earth Science",
    scale: "10⁷m",
    desc: "Geology & Oceanography",
    icon: Globe,
    bgId: "earth-texture",
    mode: "earth" as const,
    href: "/natural-science/earth-science"
  },
  {
    id: "biology",
    title: "Biology",
    scale: "10⁰m",
    desc: "Genetics & Ecology",
    icon: Dna,
    bgId: "bio-slime",
    mode: "bio" as const,
    href: "/natural-science/biology"
  },
  {
    id: "chemistry",
    title: "Chemistry",
    scale: "10⁻⁹m",
    desc: "Molecular Interactions",
    icon: FlaskConical,
    bgId: "chem-reaction",
    mode: "chem" as const,
    href: "/natural-science/chemistry"
  },
  {
    id: "physics",
    title: "Physics",
    scale: "10⁻¹⁵m",
    desc: "Quantum Mechanics",
    icon: Atom,
    bgId: "quantum-grid",
    mode: "physics" as const,
    href: "/natural-science/physics"
  }
];

const LESSON_VOCAB: VocabWord[] = Object.entries(naturalScienceFoundationsTerms).map(([term, details]) => ({
    term,
    ...details,
}));

export default function NaturalSciencesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Default to biology if nothing is hovered.
  const activeId = hoveredId || "biology";

  return (
    <main className="relative min-h-screen bg-black text-slate-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
        <VocabDrawer vocabList={LESSON_VOCAB} themeColor="emerald" />
        
        {/* Pass the exact ID string (e.g. "biology", "physics") */}
        <NaturalScienceBackground activeId={activeId} />
        
        <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
            
            {/* --- TOP: INTERACTIVE HERO SECTION --- */}
            <div className="flex flex-col lg:flex-row min-h-[80vh] gap-12 items-center justify-center mb-24 animate-in fade-in duration-700">
                
                {/* 1. THE SCALE RULER (Visual Indicator) */}
                <div className="hidden lg:flex flex-col items-center h-[500px] w-16 relative">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        Macro
                    </div>
                    
                    {/* The Track */}
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-purple-500 via-emerald-500 to-blue-500 opacity-30 rounded-full relative">
                        {/* The Active Puck */}
                        <div 
                            className="absolute w-4 h-4 bg-white rounded-full -left-[7px] shadow-[0_0_20px_white] transition-all duration-500 ease-out"
                            style={{ 
                                top: `${SCIENCES.findIndex(s => s.id === activeId) * 25}%` 
                            }}
                        />
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-4" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        Micro
                    </div>
                </div>

                {/* 2. THE CARD STACK */}
                <div className="flex-1 max-w-2xl grid gap-4 w-full">
                    <header className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
                            <ArrowLeft size={14} /> Knowledge Network
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                            NATURAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">SCIENCES</span>
                        </h1>
                        <p className="text-lg text-slate-400 font-light">
                            Select a magnitude of reality to investigate. From the cosmic web of galaxies down to the quantum foam.
                        </p>
                    </header>

                    {SCIENCES.map((science) => {
                        const isHovered = hoveredId === science.id;
                        const isDimmed = hoveredId !== null && !isHovered;

                        return (
                            <div 
                                key={science.id}
                                onMouseEnter={() => setHoveredId(science.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={cn(
                                    "transition-all duration-500 ease-out transform",
                                    isHovered ? "scale-105 translate-x-2 z-10" : "scale-100",
                                    isDimmed ? "opacity-30 blur-[2px]" : "opacity-100"
                                )}
                            >
                                <Link href={science.href} className="block group">
                                    <ParticleButton mode={science.mode}>
                                        <div className="flex items-center gap-4 py-3">
                                            <science.icon size={28} className={isHovered ? "text-white" : "opacity-70 text-slate-300"} />
                                            <div>
                                                <div className="text-xl font-black text-white tracking-wide">{science.title}</div>
                                                <div className="text-[11px] font-mono opacity-60 text-slate-300 uppercase tracking-widest mt-0.5">
                                                    {science.desc}
                                                </div>
                                            </div>
                                            <div className="ml-auto font-mono text-sm font-bold opacity-80 bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg shadow-inner">
                                                {science.scale}
                                            </div>
                                        </div>
                                    </ParticleButton>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- BOTTOM: THEORETICAL FRAMEWORK --- */}
            <div className="pt-24 border-t border-white/10 flex flex-col gap-24">
                
                {/* ROW 1: Empiricism and Scientific Method */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-5 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Eye className="text-emerald-400" /> The Empirical Universe
                            </h2>
                            <p className="text-slate-400 leading-relaxed font-light mb-4">
                                In the <em>Formal Sciences</em> (like Mathematics), truth is absolute. <span className="font-mono text-emerald-300">1 + 1 = 2</span> is a proven, undeniable fact based on rigid axioms. The Natural Sciences do not share this luxury.
                            </p>
                            
                            <div className="p-5 bg-emerald-950/20 border-l-4 border-emerald-500 text-sm text-slate-300 font-serif italic rounded-r-xl shadow-inner mb-6">
                                "In science, there are no absolute proofs. There are only hypotheses that have survived every attempt to destroy them."
                            </div>

                            <p className="text-slate-400 leading-relaxed font-light">
                                Natural science is strictly <strong>Empirical</strong>. It relies entirely on sensory observation and physical evidence. We cannot mathematically "prove" that gravity exists; we can only drop an apple a million times and observe that it falls down every single time.
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <TestTubeDiagonal className="text-cyan-400" /> The Scientific Method
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                    <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2"><Eye size={16}/> 1. Observe</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Notice a phenomenon in the physical world that you do not understand.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ArrowUpRight size={16}/> 2. Hypothesize</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Formulate a testable, <em>falsifiable</em> explanation for the phenomenon.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                    <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><TestTubeDiagonal size={16}/> 3. Experiment</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Design a rigorous test to isolate variables and actively try to prove your hypothesis wrong.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                                    <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><GitPullRequest size={16}/> 4. Analyze</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Compare the empirical data against your prediction. If the data disagrees, the hypothesis dies.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* ROW 2: Hierarchy and Observation Limits */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Layers className="text-purple-400" /> The Hierarchy of Sciences
                            </h2>
                            <p className="text-slate-400 leading-relaxed font-light mb-6">
                                The natural sciences are not isolated silos; they are stacked upon one another in a framework known as <strong>Reductionism</strong>. To understand a complex system, you must understand the simpler parts that build it.
                            </p>
                            
                            <div className="flex flex-col gap-3 mt-6">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <Atom className="text-purple-400 shrink-0" />
                                    <p className="text-sm text-slate-300 font-light"><strong>Physics</strong> dictates the absolute rules of energy and matter.</p>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <FlaskConical className="text-cyan-400 shrink-0" />
                                    <p className="text-sm text-slate-300 font-light"><strong>Chemistry</strong> is just applied physics—how atoms bond based on those rules.</p>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <Dna className="text-emerald-400 shrink-0" />
                                    <p className="text-sm text-slate-300 font-light"><strong>Biology</strong> is just applied chemistry—how complex molecules self-replicate.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Microscope className="text-amber-400" /> Extending Human Senses
                            </h2>
                            <p className="text-slate-400 leading-relaxed font-light mb-4">
                                Because empirical science requires observation, we are entirely limited by our biological senses. Human eyes can only see a tiny fraction of the electromagnetic spectrum (visible light).
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-amber-500 text-sm text-slate-300 rounded-r-xl shadow-inner mb-6">
                                <Radar className="text-amber-500 mb-2" size={20} />
                                To overcome this, humanity builds tools that act as sensory extensions. We use <strong>Electron Microscopes</strong> to bypass the physical wavelength limit of light, and <strong>Radio Telescopes</strong> to "see" the invisible cosmic microwave background left over from the Big Bang.
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    </main>
  );
}
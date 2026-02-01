"use client";
import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  Telescope, Globe, Dna, FlaskConical, Atom 
} from "lucide-react";
import { NaturalScienceBackground } from "./NaturalScienceBackground";
import UnifiedBackground from "./UnifiedBackground";

// DATA with correct route paths and background IDs
const SCIENCES = [
  {
    id: "astronomy",
    title: "Astronomy",
    scale: "10²⁶m",
    desc: "Cosmology & Astrophysics",
    icon: Telescope,
    bgId: "cosmos-dark", // Needs to exist in registry
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

export default function NaturalSciencesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // If hovering, show that background. If not, default to Biology (Life scale)
  const activeId = hoveredId || "biology";


  return (
    <div className="flex min-h-screen p-8 md:p-12 gap-12 animate-in fade-in duration-700 items-center justify-center">
      <NaturalScienceBackground mode={activeId} />
 
      {/* 1. THE SCALE RULER (Visual Indicator) */}
      <div className="hidden md:flex flex-col items-center h-[500px] w-16 relative">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 vertical-text">
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

        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-4 vertical-text">
            Micro
        </div>
      </div>

      {/* 2. THE CARD STACK (All visible) */}
      <div className="flex-1 max-w-2xl grid gap-4">
        <header className="mb-8">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                NATURAL <span className="text-slate-600">SCIENCES</span>
            </h1>
            <p className="text-slate-400">Select a magnitude of reality to investigate.</p>
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
                        isHovered ? "scale-105 translate-x-2" : "scale-100",
                        isDimmed ? "opacity-30 blur-[1px]" : "opacity-100"
                    )}
                >
                    <Link href={science.href} className="block group">
                        <ParticleButton mode={science.mode}>
                            <div className="flex items-center gap-4 py-2">
                                <science.icon size={24} className={isHovered ? "text-white" : "opacity-70"} />
                                <div>
                                    <div className="text-lg font-black">{science.title}</div>
                                    <div className="text-[10px] font-mono opacity-60 normal-case tracking-normal">
                                        {science.desc}
                                    </div>
                                </div>
                                <div className="ml-auto font-mono text-xs opacity-50 bg-black/30 px-2 py-1 rounded">
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
  );
}
"use client";
import React from 'react';
import Link from 'next/link';
// Ensure you create the component file and install dependencies!
import UBCampusMap from "./UBCampusMap"; 
import CircuitBoardSnow from "./CircuitBoardSnow";
import { 
  ArrowLeft, GraduationCap, Microscope, 
  ExternalLink, BookOpen, Trophy, Map as MapIcon 
} from "lucide-react";

export default function UBPage() {
  return (
    <main className="relative min-h-screen bg-[#005bbb] text-white overflow-hidden font-sans selection:bg-white/30">
      
      {/* 1. VISUAL ENGINE */}
      <CircuitBoardSnow />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#002f6c] via-transparent to-transparent opacity-90" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations/buffalo" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200 hover:text-white transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Buffalo
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                <GraduationCap size={12} /> EST. 1846
            </div>
        </div>

        {/* HERO */}
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-lg">
                    UNIVERSITY <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">AT BUFFALO</span>
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed border-l-4 border-white pl-6">
                    New York's Flagship. A premier research-intensive public university dedicated to academic excellence and making a global impact.
                </p>
                <div className="flex gap-4 mt-8">
                     <a href="https://www.buffalo.edu/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-[#005bbb] font-bold uppercase rounded hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg">
                        Official Site <ExternalLink size={14} />
                    </a>
                </div>
            </div>
            
            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard label="Student Body" value="32,000+" />
                <StatCard label="Campuses" value="3" />
                <StatCard label="Research $$" value="$400M+" />
                <StatCard label="Mascot" value="Victor E. Bull" />
            </div>
        </header>

        {/* SECTION 1: THE INTERACTIVE MAP (NEW) */}
        <section className="mb-24">
            <h2 className="text-2xl font-bold uppercase mb-8 flex items-center gap-2">
                <MapIcon /> Campus Cartography
            </h2>
            {/* This is the new robust map component */}
            <UBCampusMap />
            <div className="mt-4 flex gap-4 text-[10px] text-blue-200/60 font-mono uppercase">
               <span>// Real-time Coordinates</span>
               <span>// North: 43.00° N</span>
               <span>// South: 42.95° N</span>
            </div>
        </section>

        {/* SECTION 2: ACADEMIC PILLARS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <PillarCard 
                title="Engineering"
                icon={Microscope}
                desc="A top-tier engineering school. Famous for aerospace, AI research, and civil engineering."
            />
            <PillarCard 
                title="Medicine"
                icon={BookOpen}
                desc="The Jacobs School of Medicine. A downtown hub driving innovation in healthcare and biotechnology."
            />
            <PillarCard 
                title="Athletics"
                icon={Trophy}
                desc="The UB Bulls. Division I powerhouse in the MAC. Home to legends like Khalil Mack."
            />
        </section>

        {/* FOOTER */}
        <div className="border-t border-white/20 pt-12 text-center">
            <p className="text-xs text-blue-200 font-mono">
                "Here is the place where our boldest dreams take flight."
            </p>
        </div>

      </div>
    </main>
  );
}

function StatCard({ label, value }: any) {
    return (
        <div className="p-4 bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="text-[10px] uppercase font-bold text-blue-200 mb-1">{label}</div>
            <div className="text-2xl font-black text-white">{value}</div>
        </div>
    )
}

function PillarCard({ title, icon: Icon, desc }: any) {
    return (
        <div className="p-8 bg-[#004c99] border border-white/10 rounded-2xl hover:bg-[#003d7a] transition-colors group">
            <div className="mb-6 p-3 bg-white/10 w-fit rounded-lg text-white group-hover:scale-110 transition-transform">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase mb-2">{title}</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
                {desc}
            </p>
        </div>
    )
}
"use client";
import React from 'react';
import Link from 'next/link';
import BloodMoonFog from "./BloodMoonFog";
import FearBioMonitor from "./FearBioMonitor";
import SamhainRitualWheel from "./SamhainRitualWheel";
import GlitchText from "@/components/GlitchText";
import { 
  Skull, Flame, ArrowLeft, Eye, 
  Database, Map, BookOpen, ExternalLink 
} from "lucide-react";
import GrimoireBackground from './GrimoireBackground';

export default function HalloweenHub() {
  return (
    <main className="relative min-h-screen bg-black text-red-500 overflow-hidden font-serif selection:bg-red-900/90">
      
      {/* ATMOSPHERE */}
      <BloodMoonFog />
      <GrimoireBackground />
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-90" />

      {/* HUD */}
      <FearBioMonitor />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24 opacity-70 hover:opacity-100 transition-opacity">
            <Link href="/humanities/culture" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-900 hover:text-red-500 transition-colors font-sans">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Culture
            </Link>
            <div className="text-[10px] font-sans font-bold text-red-900 uppercase tracking-[0.3em]">
                October 31 // The Hub
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 text-center">
            <div className="inline-block mb-4">
                <Skull className="w-12 h-12 text-red-600 mx-auto mb-2 animate-pulse" strokeWidth={1} />
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <GlitchText text="HALLOWEEN" />
            </h1>
            <p className="mt-6 text-xl text-red-400/80 font-serif italic max-w-xl mx-auto">
                "The thinning of the veil. Explore the archives of fear."
            </p>
        </header>

        {/* DEPARTMENT GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32 max-w-6xl mx-auto">
            
            {/* LINK 1: THE BESTIARY */}
            <DepartmentCard 
                href="/humanities/culture/holidays/halloween/bestiary"
                title="The Bestiary"
                subtitle="Entity Containment"
                icon={Database}
                desc="Access classified files on Undead, Cryptid, and Eldritch entities. Threat assessment protocols active."
                color="text-red-500"
                bg="bg-red-950/30"
            />

            {/* LINK 2: LOCATIONS */}
            <DepartmentCard 
                href="/humanities/culture/holidays/halloween/locations"
                title="Surveillance"
                subtitle="Location Monitoring"
                icon={Eye}
                desc="Live CCTV feeds from active hauntings. Asylums, Cornfields, and Gothic Manors."
                color="text-red-500"
                bg="bg-red-950/30"
            />

            {/* LINK 3: HISTORY (Anchor Link to Wheel below) */}
            <DepartmentCard 
                href="#ritual"
                title="The Ritual"
                subtitle="Historical Origins"
                icon={Flame}
                desc="Trace the holiday from the bonfires of Samhain to the plastic masks of today."
                color="text-orange-500"
                bg="bg-orange-950/30"
            />

        </section>

        {/* FEATURE: THE HISTORY WHEEL */}
        <section id="ritual" className="mb-32 scroll-mt-24">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-red-900 w-24" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest font-sans flex items-center gap-2">
                    <BookOpen size={20} className="text-orange-600" /> Origins
                </h2>
                <div className="h-px bg-red-900 w-24" />
            </div>
            <SamhainRitualWheel />
        </section>

        {/* FOOTER */}
        <div className="border-t border-red-900/30 pt-12 text-center font-sans">
            <div className="text-[10px] text-red-900 uppercase">
                The Black Archives v6.6.6 // Authorized Personnel Only
            </div>
        </div>

      </div>
    </main>
  );
}

function DepartmentCard({ href, title, subtitle, icon: Icon, desc, color, bg }: any) {
    return (
        <Link 
            href={href}
            className={`group relative p-8 border border-red-900/30 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 ${bg}`}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-black border border-red-900/50 ${color}`}>
                        <Icon size={24} />
                    </div>
                    <ExternalLink size={16} className="text-red-900 group-hover:text-red-500 transition-colors" />
                </div>
                
                <div className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">
                    {subtitle}
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-4 font-serif group-hover:translate-x-2 transition-transform duration-500">
                    {title}
                </h3>
                <p className="text-sm text-stone-400 font-sans leading-relaxed group-hover:text-stone-300 transition-colors">
                    {desc}
                </p>
            </div>

            {/* Hover Glitch Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </Link>
    )
}
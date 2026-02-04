"use client";
import React from 'react';
import Link from 'next/link';
import NightForestRadar from "./NightForestRadar";
import EvidenceTerminal from "./EvidenceTerminal";
import CryptidFrequencyTuner from "./CryptidFrequencyTuner";
import LiveSightingsTicker from "./LiveSightingsTicker";
import GlitchText from "../../../../../components/GlitchText";
import { 
  Ghost, ArrowLeft, Eye, 
  AlertTriangle, Radio, ExternalLink,
  Map, Database
} from "lucide-react";

export default function CryptidsPage() {
  return (
    <main className="relative min-h-screen bg-black text-green-500 overflow-hidden font-mono selection:bg-green-900/50">
      <NightForestRadar />
      
      {/* Dark Vignette & Noise */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-90" />
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />

      {/* Ticker at the very top */}
      <div className="relative z-20 mt-16 md:mt-0">
          <LiveSightingsTicker />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/folklore" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-800 hover:text-green-400 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Folklore
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full" /> Recording Active
            </div>
        </div>

        {/* HERO */}
        <header className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-green-900/20 border border-green-800 text-green-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <AlertTriangle size={10} /> Department of Cryptozoology
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                    <GlitchText text="UNVERIFIED" /> <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">PHENOMENA</span>
                </h1>
                <p className="text-sm text-green-700 max-w-lg leading-relaxed border-l border-green-800 pl-4">
                    Science requires a specimen. Folklore requires a witness. 
                    We operate in the shadows, documenting what the mainstream scientific community refuses to acknowledge.
                </p>
            </div>
            
            {/* Frequency Tuner (New Feature) */}
            <div className="lg:pl-12">
                <CryptidFrequencyTuner />
            </div>
        </header>

        {/* TERMINAL WIDGET */}
        <div className="mb-24">
            <div className="flex items-center gap-2 mb-2 text-green-800 text-xs font-bold uppercase">
                <Database size={12} /> Accessing Secure Archives...
            </div>
            <EvidenceTerminal />
        </div>

        {/* DEEP WEB RESOURCES */}
        <div className="border-t border-green-900/30 pt-12">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <ExternalLink className="text-green-600" size={20} /> Field Resources
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* RESOURCE 1 */}
                <ResourceCard 
                    title="B.F.R.O."
                    subtitle="Bigfoot Field Researchers Org"
                    desc="The oldest and largest database of sasquatch sightings in North America."
                    href="https://www.bfro.net/"
                />

                {/* RESOURCE 2 */}
                <ResourceCard 
                    title="The Mothman Museum"
                    subtitle="Point Pleasant, WV"
                    desc="Historical archives regarding the 1966-1967 sightings and the Silver Bridge disaster."
                    href="https://www.mothmanmuseum.com/"
                />

                {/* RESOURCE 3 */}
                <ResourceCard 
                    title="Center for Fortean Zoology"
                    subtitle="Global Research"
                    desc="Dedicated to the investigation of unknown animals and strange phenomena."
                    href="http://www.cfz.org.uk/"
                />

            </div>
        </div>

        {/* THEORY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-6 bg-green-900/5 border border-green-900/30 rounded-xl">
             <div>
                <h4 className="text-sm font-bold text-green-400 uppercase mb-2">The Interdimensional Hypothesis</h4>
                <p className="text-xs text-green-800 leading-relaxed">
                    Some researchers argue cryptids are not biological animals, but interdimensional entities that "slip" into our reality, explaining why they disappear without a trace when cornered.
                </p>
             </div>
             <div>
                <h4 className="text-sm font-bold text-green-400 uppercase mb-2">The Relict Hominid</h4>
                <p className="text-xs text-green-800 leading-relaxed">
                    The biological counter-argument: The discovery of *Homo floresiensis* ("Hobbits") in 2003 proves that other human species survived much longer than previously thought.
                </p>
             </div>
        </div>

      </div>
    </main>
  );
}

function ResourceCard({ title, subtitle, desc, href }: any) {
    return (
        <a 
            href={href} target="_blank" rel="noopener noreferrer"
            className="group block p-6 bg-black border border-green-900/50 hover:border-green-500 hover:bg-green-900/10 transition-all rounded-lg"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-green-400 group-hover:text-white transition-colors flex items-center gap-2">
                        {title} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <div className="text-[10px] text-green-700 uppercase tracking-wider">{subtitle}</div>
                </div>
                <Map size={16} className="text-green-900 group-hover:text-green-500 transition-colors" />
            </div>
            <p className="text-xs text-green-800 group-hover:text-green-600 leading-relaxed">
                {desc}
            </p>
        </a>
    )
}
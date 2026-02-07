"use client";
import React from 'react';
import Link from 'next/link';
import SedimentFlow from "./SedimentFlow";
import TimeLens from "./TimeLens";
import PhyloPicSearch from "./PhyloPicSearch";
import { 
  ArrowLeft, Bone, Pickaxe, 
  Hourglass, Layers, Search 
} from "lucide-react";

export default function PaleozoologyPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-stone-200 overflow-hidden font-sans selection:bg-amber-900/50">
      
      {/* 1. VISUAL ENGINE */}
      <SedimentFlow />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/sciences/biology" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-amber-500 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Biology
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-stone-900 border border-stone-800 px-3 py-1 rounded text-stone-400">
                <Bone size={12} /> The Fossil Record
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-900/20 text-amber-600 mb-6 border border-amber-900/50">
                <Hourglass size={24} />
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-stone-100 tracking-tighter uppercase leading-none mb-8">
                DEEP <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-500 to-stone-800">TIME</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-stone-500 font-serif italic border-t border-stone-800 pt-8">
                "We are separated from the dinosaurs not just by time, but by layers of earth. Every rock is a page in the book of life."
            </p>
        </header>

        

[Image of geologic time scale diagram]


        {/* SECTION 1: THE REPOSITORY (Time Lens) */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-stone-800 w-24" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Layers size={20} className="text-amber-700" /> Stratigraphy
                </h2>
                <div className="h-px bg-stone-800 w-24" />
            </div>
            
            <TimeLens />
            
            <div className="mt-6 text-center text-xs text-stone-600 font-mono uppercase">
                * Note: Reconstructions are theoretical based on osteological correlates.
            </div>
        </section>

        {/* SECTION 2: GLOBAL SEARCH (PhyloPic API) */}
        <section className="mb-32 max-w-4xl mx-auto">
             <div className="flex items-center gap-4 mb-8">
                <Search size={24} className="text-amber-600" />
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Taxonomic Search</h2>
                    <p className="text-xs text-stone-500">Access over 40,000 silhouettes via PhyloPic API</p>
                </div>
            </div>
            <PhyloPicSearch />
        </section>

        {/* FOOTER */}
        <div className="border-t border-stone-800 pt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-600 mb-4">
                <Pickaxe size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Excavation in Progress</span>
            </div>
        </div>

      </div>
    </main>
  );
}
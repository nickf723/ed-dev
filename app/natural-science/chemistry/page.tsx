"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Atom, Layers } from "lucide-react";
import ChemistryBackground from "./ChemistryBackground";
import PeriodicTable from "./PeriodicTable";
import MoleculeViewer from "./MoleculeViewer";
import ElementInspector from "./ElementInspector";
import { ELEMENTS, ChemicalElement } from "./chemistry-data";
import BohrAtom from "./BohrAtom";

export default function ChemistryPage() {
  // Default to Carbon (Index 5 in our array, Z=6)
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(ELEMENTS[5]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-300 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-lime-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <ChemistryBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-lime-900/10 to-slate-900/80 pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-8 flex justify-between items-end">
            <div>
                <Link href="/natural-science" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-500 hover:text-white transition-colors mb-4">
                    <ArrowLeft size={10} /> Natural Science
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
                    CHEMISTRY <FlaskConical className="opacity-20 text-lime-400" size={48} />
                </h1>
                <p className="text-lime-500/60 font-mono text-xs uppercase tracking-widest">
                    The Central Science // Elemental Analysis
                </p>
            </div>
            
            <div className="hidden md:flex flex-col items-end text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-2 text-lime-500"><Atom size={12} className="animate-spin-slow" /> SPECTROMETER ACTIVE</div>
                <div>STP: 273.15 K, 100 kPa</div>
            </div>
        </header>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
            
            {/* LEFT COL: TOOLS (Span 2) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* PERIODIC TABLE CONTAINER */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative group min-h-[400px]">
                    <div className="absolute top-0 left-0 p-4 opacity-50">
                        <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-lime-400">
                            <Layers size={14} /> Periodic Table
                        </h3>
                    </div>
                    <div className="mt-8">
                        <PeriodicTable onSelect={setSelectedElement} activeZ={selectedElement.z} />
                    </div>
                </div>

                {/* 3D MOLECULE VIEWER */}
                <div className="relative">
                     <MoleculeViewer />
                </div>
            </div>

            {/* RIGHT COL: INSPECTOR (Span 1) */}
            <div className="flex flex-col gap-6">
                {/* THE INSPECTOR COMPONENT */}
                <ElementInspector element={selectedElement} />
                <BohrAtom element={selectedElement} />

                {/* Legend (Optional, if space permits) */}
                <div className="p-4 rounded-xl border border-white/5 bg-slate-900/50">
                    <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-3">Group Key</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Alkali', 'Alkaline', 'Transition', 'Halogen', 'Noble Gas'].map(g => (
                            <span key={g} className="px-2 py-1 bg-white/5 rounded text-[9px] text-slate-400 uppercase border border-white/5">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}
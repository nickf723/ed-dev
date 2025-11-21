"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  Scale,
  ArrowRightLeft,
  Check,
  X,
  Zap
} from "@/components/icons";
import React, { useState } from "react";

// Data for comparison
const conceptA = {
    name: "Classical Mechanics",
    desc: "Deterministic. The state of a system is known exactly at all times.",
    points: ["Predictable", "Continuous", "Macroscopic Scale"]
};

const conceptB = {
    name: "Quantum Mechanics",
    desc: "Probabilistic. The state is described by a wave function of probabilities.",
    points: ["Uncertainty", "Quantized (Discrete)", "Atomic Scale"]
};

export default function ComparativeLayoutPage() {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'Split'>('Split');

  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["A", "B", "≠", "≈"]} />
      <PageHeader
        eyebrow="Layout Pattern"
        title="Comparative Layout"
        subtitle="Building intuition through contrast. Use this layout to highlight the differences between two opposing or related concepts."
      />

      <div className="w-full max-w-6xl mx-auto text-left space-y-16 pb-24">

        {/* 1. Split View Card */}
        <section>
            <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-2">
                <Scale className="text-teal-400" /> 1. The "Vs." Card
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 shadow-2xl">
                {/* Side A */}
                <div className="p-8 md:border-r border-neutral-800 bg-gradient-to-br from-blue-900/10 to-transparent">
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{conceptA.name}</h3>
                    <p className="text-neutral-300 mb-6 h-12">{conceptA.desc}</p>
                    <ul className="space-y-3">
                        {conceptA.points.map(p => (
                            <li key={p} className="flex items-center gap-3 text-sm text-neutral-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Side B */}
                <div className="p-8 bg-gradient-to-bl from-purple-900/10 to-transparent relative">
                    {/* VS Badge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 border border-neutral-800 rounded-full p-2 z-10 hidden md:block">
                        <span className="font-black text-xs text-neutral-500">VS</span>
                    </div>

                    <h3 className="text-2xl font-bold text-purple-400 mb-2">{conceptB.name}</h3>
                    <p className="text-neutral-300 mb-6 h-12">{conceptB.desc}</p>
                    <ul className="space-y-3">
                        {conceptB.points.map(p => (
                            <li key={p} className="flex items-center gap-3 text-sm text-neutral-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

        {/* 2. Toggle Switcher */}
        <section>
            <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-2">
                <ArrowRightLeft className="text-amber-400" /> 2. Interactive Toggle
            </h2>
            <p className="text-neutral-400 mb-6">Useful for mobile layouts or when the user needs to focus on one model at a time.</p>

            <div className="max-w-xl mx-auto">
                {/* Controls */}
                <div className="flex p-1 bg-neutral-900 rounded-lg border border-neutral-800 mb-6">
                    <button 
                        onClick={() => setActiveTab('A')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'A' ? 'bg-neutral-800 text-blue-400 shadow' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Model A
                    </button>
                    <button 
                        onClick={() => setActiveTab('B')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'B' ? 'bg-neutral-800 text-purple-400 shadow' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                        Model B
                    </button>
                </div>

                {/* Content Area */}
                <div className="glass p-8 rounded-2xl min-h-[200px] flex flex-col items-center justify-center text-center border border-neutral-800">
                    {activeTab === 'A' ? (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-300">The Deterministic View</h3>
                            <p className="text-neutral-400 mt-2">Everything happens for a reason, and that reason can be calculated.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-purple-300">The Probabilistic View</h3>
                            <p className="text-neutral-400 mt-2">Nothing is certain. We only know the likelihood of an event occurring.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* 3. Do's and Don'ts (Grid) */}
        <section>
             <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-2">
                <Check className="text-green-400" /> 3. Do's and Don'ts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-green-900/30 bg-green-950/10">
                    <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2"><Check size={18} /> Correct Syntax</h4>
                    <code className="block p-4 rounded bg-black/30 text-green-200 font-mono text-sm border-l-2 border-green-500">
                        import React from 'react';
                    </code>
                </div>
                <div className="p-6 rounded-xl border border-red-900/30 bg-red-950/10">
                    <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2"><X size={18} /> Incorrect Syntax</h4>
                    <code className="block p-4 rounded bg-black/30 text-red-200 font-mono text-sm border-l-2 border-red-500">
                        import react from 'react';
                    </code>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}
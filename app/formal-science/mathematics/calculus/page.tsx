"use client";
import React from "react";
import Link from "next/link";
import CalculusBackground from "./CalculusBackground";
import { CALCULUS_BRANCHES } from "./calculus-data";
import { ArrowLeft, FunctionSquare, ChevronRight, Sigma } from "lucide-react";
import RiemannBackground from "./RiemannBackground";
import VectorFieldBackground from "./VectorFieldBackground";

// Helper for LaTeX rendering (Simulation)
const Latex = ({ children }: { children: string }) => (
    <span className="font-serif italic font-bold tracking-wide text-lg opacity-90">
        {children}
    </span>
);

export default function CalculusPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-cyan-500/30">
      <RiemannBackground />
      {/* 1. VISUAL ENGINE */}
      <VectorFieldBackground />
      
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/natural-science/mathematics" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Mathematics Dept
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                CALCULUS <Sigma className="opacity-20" size={64} />
            </h1>
            <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
                The mathematical study of continuous change. The language used to describe the motion of stars, the flow of electricity, and the growth of economies.
            </p>
        </header>

        {/* INTERACTIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {CALCULUS_BRANCHES.map((branch) => {
                const Icon = branch.icon;
                return (
                    <div 
                        key={branch.id}
                        className={`
                            group relative p-8 rounded-xl bg-[#1e293b]/60 border border-white/5 backdrop-blur-sm 
                            hover:bg-[#1e293b]/80 hover:-translate-y-1 transition-all duration-300
                            ${branch.border}
                        `}
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-lg bg-black/30 border border-white/10 ${branch.color}`}>
                                <Icon size={24} />
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-black/20 text-slate-400">
                                {branch.level}
                            </div>
                        </div>

                        {/* Title & Formula */}
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {branch.title}
                        </h2>
                        
                        {/* Mathematical Notation Display */}
                        <div className="mb-4 h-12 flex items-center text-slate-300">
                            {/* We just render the string as is for now, in a real app we'd use Katex/MathJax */}
                            <div className="font-serif text-xl italic opacity-80 border-l-2 border-white/10 pl-4">
                                {branch.formula}
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            {branch.desc}
                        </p>

                        {/* Footer Link */}
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                            Explore Module <ChevronRight size={12} />
                        </div>

                        {/* Special Tag for Diff Eq */}
                        {branch.id === 'diffeq' && (
                             <div className="absolute -top-3 right-6 px-3 py-1 bg-red-900/80 border border-red-500/50 text-red-200 text-[9px] font-bold uppercase tracking-widest rounded shadow-lg">
                                 Mastery Level
                             </div>
                        )}
                    </div>
                )
            })}
        </div>
        
        {/* Footer Note */}
        <div className="mt-auto border-t border-white/5 pt-8 text-center md:text-left text-slate-500 text-sm font-mono">
             "If I have seen further, it is by standing on the shoulders of giants." — Isaac Newton
        </div>

      </div>
    </main>
  );
}
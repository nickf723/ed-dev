"use client";
import React, { useState } from "react";
import Link from "next/link";
import AppliedBackground from "./AppliedBackground";
import { APPLIED_DOMAINS, APPLIED_FIELDS, Domain } from "./applied-data";
import GlobalVisualMedia from "@/components/GlobalVisualMedia";
import { ArrowLeft, Settings, ExternalLink } from "lucide-react";

export default function AppliedSciencePage() {
  const [activeDomain, setActiveDomain] = useState<Domain | "ALL">("ALL");

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans relative overflow-hidden selection:bg-cyan-500/30">
      
      <AppliedBackground />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_100%)] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Knowledge Base
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                APPLIED SCIENCES <Settings className="text-cyan-500 animate-spin-slow opacity-80" size={48} />
            </h1>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest max-w-xl">
                The Engineering Trinity // Transforming Theory into Reality.
            </p>
        </header>

        {/* DOMAIN SELECTOR */}
        <div className="flex flex-wrap gap-4 mb-12">
            <button 
                onClick={() => setActiveDomain("ALL")}
                className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${activeDomain === "ALL" ? "bg-white text-black border-white" : "bg-black/40 border-slate-700 text-slate-500 hover:border-white hover:text-white"}`}
            >
                Overview
            </button>
            {(Object.keys(APPLIED_DOMAINS) as Domain[]).map((d) => {
                const info = APPLIED_DOMAINS[d];
                return (
                    <button 
                        key={d}
                        onClick={() => setActiveDomain(d)}
                        className={`
                            px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2
                            ${activeDomain === d 
                                ? `${info.bg} ${info.color} ${info.border}` 
                                : "bg-black/40 border-slate-700 text-slate-500 hover:border-slate-400 hover:text-slate-300"}
                        `}
                    >
                        <info.icon size={14} /> {info.title}
                    </button>
                )
            })}
        </div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-24 pb-20">
            {(Object.keys(APPLIED_DOMAINS) as Domain[]).map((domainKey) => {
                if (activeDomain !== "ALL" && activeDomain !== domainKey) return null;
                
                const domain = APPLIED_DOMAINS[domainKey];
                const fields = APPLIED_FIELDS.filter(f => f.domain === domainKey);

                return (
                    <section key={domainKey} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Section Header */}
                        <div className={`flex items-end gap-4 mb-8 pb-4 border-b border-white/5 ${domain.color}`}>
                            <domain.icon size={32} />
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">{domain.title}</h2>
                                <p className="text-xs font-mono opacity-80 mt-1">{domain.desc}</p>
                            </div>
                        </div>

                        {/* Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {fields.map((field) => (
                                <div 
                                    key={field.id}
                                    className={`
                                        group relative p-6 rounded-xl bg-slate-900/40 border border-white/5 hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1
                                        ${domain.border} border-l-4
                                    `}
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded bg-black/50 ${domain.color}`}>
                                            <field.icon size={20} />
                                        </div>
                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{field.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-4 h-10 line-clamp-2">
                                        {field.desc}
                                    </p>

                                    {/* THE VISUAL ENGINE */}
                                    {/* THE VISUAL ENGINE */}
                                    <div className="grid grid-cols-3 gap-2 h-32 mt-4">
                                        
                                        {/* Main Concept Image */}
                                        <div className="col-span-2 rounded-lg overflow-hidden relative bg-black border border-white/5 group-hover:border-white/20 transition-colors">
                                            <GlobalVisualMedia 
                                                query={field.imageQuery} // e.g. "Boston Dynamics robot"
                                                alt={field.title}
                                            />
                                            <div className="absolute bottom-1 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur rounded text-[8px] font-bold uppercase tracking-widest text-white border border-white/10">
                                                Visual
                                            </div>
                                        </div>

                                        {/* Secondary Concept Image (Was Diagram) */}
                                        {/* Since we removed schematic mode, we just query the diagram topic on Wiki */}
                                        <div className="col-span-1 rounded-lg overflow-hidden relative bg-slate-950 border border-white/5 group-hover:border-white/20 transition-colors">
                                            <GlobalVisualMedia 
                                                query={field.diagramQuery} // e.g. "Robotic arm diagram"
                                                alt={`${field.title} Detail`} 
                                            />
                                            <div className="absolute bottom-1 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur rounded text-[8px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-900/50">
                                                Detail
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>

      </div>
    </main>
  );
}
"use client";
import React from 'react';
import Link from 'next/link';
import ContainmentUnit from "./ContainmentUnit";
import { ArrowLeft, Database, Skull } from "lucide-react";

export default function BestiaryPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-stone-300 p-6 md:p-12 font-sans selection:bg-red-900/50">
        
        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <Link href="/humanities/culture/holidays/halloween" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors mb-6">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Hub
                </Link>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-800 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                    <Database size={10} /> The Black Archives
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    The <span className="text-red-600">Bestiary</span>
                </h1>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-xs text-stone-500 font-mono">
                    SECURE CONNECTION ESTABLISHED<br/>
                    ACCESS LEVEL: 5
                </div>
            </div>
        </div>

        {/* THE MAIN UNIT */}
        <div className="max-w-7xl mx-auto mb-16">
            <ContainmentUnit />
        </div>

        {/* FOOTNOTES */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-900 pt-8">
            <div className="text-xs text-stone-500 leading-relaxed">
                <strong className="text-stone-300 block mb-2 uppercase">Classification Protocol</strong>
                Entities are categorized by their origin and biological makeup. "Eldritch" entities exist outside standard physics and often require psionic containment.
            </div>
            <div className="text-xs text-stone-500 leading-relaxed">
                <strong className="text-stone-300 block mb-2 uppercase">Safety Warning</strong>
                Prolonged observation of Class-5 entities (e.g. Pennywise) via digital screens has been known to cause mild hallucinations. Proceed with caution.
            </div>
            <div className="text-xs text-stone-500 leading-relaxed">
                <strong className="text-stone-300 block mb-2 uppercase">API Status</strong>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Nodes Online: 5/5
                </span>
            </div>
        </div>

    </main>
  )
}
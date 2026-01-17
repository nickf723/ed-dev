"use client";
import React from "react";
import Link from "next/link";
import CultureBackground from "./CultureBackground";
import { ArrowLeft, Globe, BookOpen, Users, Map, Heart } from "lucide-react";

const SECTORS = [
  { id: "folklore", label: "Folklore & Myth", icon: BookOpen, desc: "Oral histories, legends, and cryptids.", link: "/humanities/culture/folklore" },
  { id: "sociology", label: "Sociology", icon: Users, desc: "The study of social life and change.", link: "#" },
  { id: "geography", label: "Human Geography", icon: Map, desc: "Communities, cultures, and economies.", link: "#" },
  { id: "religion", label: "Theology", icon: Heart, desc: "Faith, divinity, and sacred truths.", link: "#" },
];

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-[#0f0a0a] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-orange-500/30">
      <CultureBackground />
      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        <header className="mb-16">
            <Link href="/humanities" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 hover:text-orange-400 transition-colors mb-6">
                <ArrowLeft size={10} /> Humanities Division
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">CULTURAL STUDIES</h1>
            <p className="text-orange-500/60 font-mono text-xs uppercase tracking-widest">Anthropological Sector // Sector C</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 max-w-4xl">
            {SECTORS.map((sector) => {
                const Icon = sector.icon;
                return (
                    <Link 
                        key={sector.id} 
                        href={sector.link}
                        className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-orange-500 group-hover:scale-110 transition-transform">
                                <Icon size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{sector.label}</h2>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed">{sector.desc}</p>
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowLeft className="rotate-180 text-orange-500" />
                        </div>
                    </Link>
                )
            })}
        </div>
      </div>
    </main>
  );
}
"use client";
import React from "react";
import Link from "next/link";
import { Utensils, ShoppingCart, ArrowRight } from "lucide-react";
import CulinaryBackground from "./CulinaryBackground";

const SECTORS = [
  { 
    id: "recipes", label: "The Kitchen", sub: "Recipe Database", icon: Utensils, 
    desc: "Full meal preparation, techniques, and plating guides.",
    link: "/humanities/culinary-arts/recipes",
    color: "text-orange-400", border: "group-hover:border-orange-500/50"
  },
  { 
    id: "market", label: "The Market", sub: "Inventory & Supply", icon: ShoppingCart, 
    desc: "Live inventory of raw ingredients and packaged provisions.",
    link: "/humanities/culinary-arts/market",
    color: "text-emerald-400", border: "group-hover:border-emerald-500/50"
  }
];

export default function CulinaryHub() {
  return (
    <main className="min-h-screen bg-[#1c1917] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden">
      <CulinaryBackground />
      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col justify-center">
         <header className="mb-16">
             <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-4">Humanities Division</div>
             <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">CULINARY ARTS</h1>
             <p className="text-stone-400 max-w-xl text-lg leading-relaxed">The intersection of chemistry, culture, and sustenance.</p>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
             {SECTORS.map((sector) => {
                 const Icon = sector.icon;
                 return (
                     <Link key={sector.id} href={sector.link} className={`group relative p-8 bg-black/40 border border-white/5 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-black/60 ${sector.border}`}>
                         <div className={`p-4 rounded-xl bg-white/5 w-fit mb-6 ${sector.color}`}><Icon size={32} /></div>
                         <div className="mb-4">
                             <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${sector.color}`}>{sector.sub}</div>
                             <h2 className="text-3xl font-black text-white">{sector.label}</h2>
                         </div>
                         <p className="text-stone-400 text-sm leading-relaxed mb-8">{sector.desc}</p>
                         <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                             Enter Sector <ArrowRight size={12} />
                         </div>
                     </Link>
                 )
             })}
         </div>
      </div>
    </main>
  );
}
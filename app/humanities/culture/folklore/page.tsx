"use client";
import React from "react";
import Link from "next/link";
import FolkloreBackground from "./FolkloreBackground";
import { ArrowLeft, Scroll, Moon, Sword, Map } from "lucide-react";

const ARCHIVES = [
  { 
    id: "halloween", 
    label: "Halloween & Samhain", 
    icon: Moon, 
    desc: "The thinning of the veil. Origins, entities, and traditions.", 
    link: "/humanities/culture/folklore/halloween",
    special: true 
  },
  { id: "arthurian", label: "Arthurian Legend", icon: Sword, desc: "The Matter of Britain. Knights, quests, and grails.", link: "#" },
  { id: "urban", label: "Urban Legends", icon: Map, desc: "Modern folklore and cryptids of the industrial age.", link: "#" },
  { id: "nordic", label: "Norse Saga", icon: Scroll, desc: "Tales of the Edda. Gods, giants, and the end times.", link: "#" },
];

export default function FolklorePage() {
  return (
    <main className="min-h-screen bg-[#050205] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-violet-500/30">
      <FolkloreBackground />
      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        <header className="mb-16">
            <Link href="/humanities/culture" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Cultural Studies
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-indigo-600 tracking-tighter mb-2">FOLKLORE</h1>
            <p className="text-violet-500/60 font-mono text-xs uppercase tracking-widest">Oral History // Mythos</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {ARCHIVES.map((item) => {
                const Icon = item.icon;
                return (
                    <Link 
                        key={item.id} 
                        href={item.link}
                        className={`
                            group relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1
                            ${item.special 
                                ? "bg-orange-950/20 border-orange-500/30 hover:bg-orange-950/40 hover:border-orange-500/60" 
                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-violet-500/30"}
                        `}
                    >
                        {item.special && (
                            <div className="absolute -top-3 left-8 px-3 py-1 bg-orange-600 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                                Seasonal Archive
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-lg bg-black/40 border border-white/10 group-hover:scale-110 transition-transform ${item.special ? 'text-orange-500' : 'text-violet-400'}`}>
                                <Icon size={24} />
                            </div>
                            <h2 className={`text-2xl font-bold ${item.special ? 'text-orange-100' : 'text-white'}`}>
                                {item.label}
                            </h2>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                    </Link>
                )
            })}
        </div>
      </div>
    </main>
  );
}
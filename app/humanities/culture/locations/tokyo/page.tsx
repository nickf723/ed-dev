"use client";
import React from 'react';
import Link from 'next/link';
import TokyoHighway from "./TokyoHighway";
import YamanoteLoop from "./YamanoteLoop";
import { 
  Zap, ShoppingBag, Landmark, 
  MapPin, ArrowLeft, ExternalLink,
  Smartphone
} from "lucide-react";

export default function TokyoPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-pink-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <TokyoHighway />
      {/* Scanline Overlay for Cyberpunk feel */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-pink-500 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                <MapPin size={12} /> Edo / Tokyo
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_25px_rgba(236,72,153,0.5)] mb-6">
                    TOK<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">YO</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed border-l-4 border-pink-500 pl-6 bg-black/60 p-4 rounded-r-xl backdrop-blur-sm">
                    The Neon Metropolis. A seamless fusion of Edo-period tradition and cyberpunk future. Where 37 million people drift between ancient shrines and electric skyscrapers.
                </p>
                
                <div className="flex gap-4 mt-8">
                     <a href="https://www.gotokyo.org/en/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-pink-600 text-white font-bold uppercase rounded hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                        Enter the Void <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="w-full">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest animate-pulse">
                        System Link: JR East
                    </div>
                </div>
                <YamanoteLoop />
            </div>
        </div>

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: AKIHABARA */}
            <PortalCard 
                title="Electric Town"
                icon={Zap}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Akihabara_Electric_Town_night.jpg/800px-Akihabara_Electric_Town_night.jpg"
                desc="Akihabara. The spiritual home of anime, gaming, and tech. Multi-story arcades, maid cafes, and shops selling components for robots."
                color="text-cyan-400"
                border="border-cyan-500/30"
                links={[
                    { label: "Akiba Guide", href: "https://akihabara-japan.com/" },
                    { label: "Super Potato", href: "https://www.superpotato.com/" }
                ]}
            />

            {/* CARD 2: SHIBUYA */}
            <PortalCard 
                title="The Scramble"
                icon={ShoppingBag}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Shibuya_Crossing_by_Tom_Bricker.jpg/800px-Shibuya_Crossing_by_Tom_Bricker.jpg"
                desc="Shibuya Crossing. The busiest intersection on Earth. A chaotic ballet of humanity surrounded by giant video screens and fashion towers."
                color="text-pink-400"
                border="border-pink-500/30"
                links={[
                    { label: "Shibuya Sky", href: "https://www.shibuya-scramble-square.com/sky/" },
                    { label: "Hachiko Statue", href: "https://en.wikipedia.org/wiki/Hachik%C5%8D" }
                ]}
            />

            {/* CARD 3: ASAKUSA */}
            <PortalCard 
                title="Old Edo"
                icon={Landmark}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sensoji_2019.jpg/800px-Sensoji_2019.jpg"
                desc="Asakusa. Home to Senso-ji, Tokyo's oldest temple. Walk under the giant red lantern of Kaminarimon and smell the incense of centuries past."
                color="text-red-400"
                border="border-red-500/30"
                links={[
                    { label: "Senso-ji Temple", href: "https://www.senso-ji.jp/english/" },
                    { label: "Nakamise Street", href: "https://www.japan-guide.com/e/e3001.html" }
                ]}
            />

        </div>
        
        {/* FOOTER FACT */}
        <div className="mt-16 p-6 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                <Smartphone size={14} />
                <span className="text-xs font-mono">
                    FACT: There is 1 vending machine for every 23 people in Tokyo.
                </span>
            </div>
        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function PortalCard({ title, icon: Icon, img, desc, links, color, border }: any) {
    return (
        <div className={`group relative h-[400px] bg-slate-900 border ${border} rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className={`w-10 h-10 rounded-lg bg-black/50 ${color} flex items-center justify-center mb-4 border ${border} backdrop-blur-md`}>
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-white transition-colors drop-shadow-md">{title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3 font-medium font-mono">
                    {desc}
                </p>

                {/* Quick Links */}
                <div className="space-y-2">
                    {links.map((link: any) => (
                        <a 
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded bg-black/40 hover:bg-white/10 border border-white/10 transition-colors text-xs font-bold text-white uppercase tracking-wide group/link"
                        >
                            {link.label}
                            <ExternalLink size={12} className="text-slate-500 group-hover/link:text-cyan-400" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
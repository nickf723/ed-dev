"use client";
import React from 'react';
import Link from 'next/link';
import SnowStormBackground from "./SnowStormBackground";
import LakeEffectRadar from "./LakeEffectRadar";
import { 
  Building, Utensils, Trophy, 
  MapPin, ArrowLeft, ExternalLink,
  ThermometerSnowflake 
} from "lucide-react";

export default function BuffaloPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-blue-600/30">
      
      {/* 1. ATMOSPHERE */}
      <SnowStormBackground />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-blue-300 font-bold uppercase tracking-widest border border-blue-500/30 px-3 py-1 rounded-full bg-blue-900/20 backdrop-blur-md">
                <ThermometerSnowflake size={12} /> The Queen City
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl mb-6">
                    BUF<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-white">FALO</span>
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed border-l-4 border-red-600 pl-6 bg-slate-900/40 p-4 rounded-r-xl backdrop-blur-sm">
                    The City of Good Neighbors. An architectural treasure chest hidden in a snowglobe. Home to the loudest fans in football and the birthplace of the chicken wing.
                </p>
                
                <div className="flex gap-4 mt-8">
                     <a href="https://www.visitbuffaloniagara.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-600 text-white font-bold uppercase rounded hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-red-900/50">
                        Visit Buffalo <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="w-full">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Lake Erie Surveillance
                    </div>
                </div>
                <LakeEffectRadar />
            </div>
        </div>

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: ARCHITECTURE */}
            <PortalCard 
                title="The Built"
                icon={Building}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Buffalo_City_Hall_2020.jpg/800px-Buffalo_City_Hall_2020.jpg"
                desc="A living museum of American architecture. From the Art Deco majesty of City Hall to Frank Lloyd Wright's Martin House."
                links={[
                    { label: "City Hall Tours", href: "https://www.visitbuffaloniagara.com/businesses/buffalo-city-hall/" },
                    { label: "Darwin Martin House", href: "https://martinhouse.org/" }
                ]}
            />

            {/* CARD 2: FOOD */}
            <PortalCard 
                title="The Flavor"
                icon={Utensils}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Anchor_Bar_Wing.jpg/800px-Anchor_Bar_Wing.jpg"
                desc="It's not just wings (though the Anchor Bar invented them). It's Beef on Weck, Sponge Candy, and Pizza with cup-and-char pepperoni."
                links={[
                    { label: "The Anchor Bar", href: "https://anchorbar.com/" },
                    { label: "Schwabl's", href: "https://schwabls.com/" }
                ]}
            />

            {/* CARD 3: THE MAFIA */}
            <PortalCard 
                title="The Mafia"
                icon={Trophy}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Highmark_Stadium_2021.jpg/800px-Highmark_Stadium_2021.jpg"
                desc="Bills Mafia. A fanbase that braves blizzards, smashes tables, and donates millions to charity. The heartbeat of the city."
                links={[
                    { label: "Buffalo Bills", href: "https://www.buffalobills.com/" },
                    { label: "The Sabres", href: "https://www.nhl.com/sabres" }
                ]}
            />

        </div>
        
        {/* FOOTER FACT */}
        <div className="mt-16 p-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500 font-mono">
                DID YOU KNOW? Buffalo was the first city in America to have electric streetlights (1886), earning it the nickname "The City of Light."
            </p>
        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENT (Reusable) ---
function PortalCard({ title, icon: Icon, img, desc, links }: any) {
    return (
        <div className="group relative h-[400px] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30 backdrop-blur-md">
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3 font-medium">
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
                            className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-bold text-white uppercase tracking-wide group/link"
                        >
                            {link.label}
                            <ExternalLink size={12} className="text-slate-500 group-hover/link:text-white" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
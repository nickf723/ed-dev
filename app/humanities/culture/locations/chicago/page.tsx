"use client";
import React from 'react';
import Link from 'next/link';
import WindyCityBackground from "./WindyCityBackground";
import ChicagoTransitMap from "./ChicagoTransitMap";
import ChicagoLiveDash from "./ChicagoLiveDash";
import { 
  Building2, Utensils, Music, 
  MapPin, ArrowLeft, ExternalLink,
  Ticket, Calendar, Info
} from "lucide-react";

export default function ChicagoPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-sky-500/30">
      <WindyCityBackground />
      
      {/* VIGNETTE & NOISE */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex gap-2">
                {/* Chicago Flag Stars (Red) */}
                <StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-900/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <MapPin size={10} /> 41.8781° N, 87.6298° W
                </div>
                <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl mb-6">
                    CHI<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">CAGO</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed border-l-2 border-sky-500 pl-6">
                    The City of Broad Shoulders. A metropolis of steel and soul, defined by its architecture, its music, and its resilience against the wind.
                </p>
                
                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-8">
                    <a href="https://www.choosechicago.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-bold uppercase rounded hover:bg-sky-500 hover:text-white transition-colors flex items-center gap-2">
                        Official Guide <ExternalLink size={14} />
                    </a>
                    <a href="https://www.transitchicago.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/20 text-white font-bold uppercase rounded hover:bg-white/10 transition-colors">
                        CTA Maps
                    </a>
                </div>
            </div>

            {/* LIVE TRANSIT WIDGET */}
            <div className="flex flex-col justify-end">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Transit Uplink
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-400 uppercase font-mono">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        System Online
                    </div>
                </div>
                <ChicagoTransitMap />
            </div>
        </div>

        {/* LIVE DASHBOARD */}
        <ChicagoLiveDash />

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: ARCHITECTURE */}
            <PortalCard 
                title="The Skyline"
                icon={Building2}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chicago_Skyline_Hi-Res.jpg/1200px-Chicago_Skyline_Hi-Res.jpg"
                desc="Birthplace of the skyscraper. Home to the Willis Tower and the neo-gothic Tribune Tower."
                links={[
                    { label: "Architecture Boat Tour", href: "https://www.architecture.org/tours" },
                    { label: "Skydeck Tickets", href: "https://theskydeck.com/" }
                ]}
            />

            {/* CARD 2: FOOD */}
            <PortalCard 
                title="The Kitchen"
                icon={Utensils}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pizza_Deep_Dish.jpg/800px-Pizza_Deep_Dish.jpg"
                desc="Deep Dish is the tourist draw, but the Italian Beef and Tavern Style pizza are the locals' fuel."
                links={[
                    { label: "Lou Malnati's", href: "https://www.loumalnatis.com/" },
                    { label: "Portillo's Menu", href: "https://www.portillos.com/" }
                ]}
            />

            {/* CARD 3: CULTURE */}
            <PortalCard 
                title="The Stage"
                icon={Music}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Chicago_Theatre_blend.jpg/800px-Chicago_Theatre_blend.jpg"
                desc="Electric Blues, House Music, and Improv Comedy all grew up here."
                links={[
                    { label: "The Second City", href: "https://www.secondcity.com/" },
                    { label: "Green Mill Jazz", href: "https://greenmilljazz.com/" }
                ]}
            />

        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENTS ---

function StarIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
    )
}

function PortalCard({ title, icon: Icon, img, desc, links }: any) {
    return (
        <div className="group relative h-[400px] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-end">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className="w-10 h-10 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/30">
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-sky-400 transition-colors">{title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
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
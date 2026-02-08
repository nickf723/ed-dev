"use client";
import React from 'react';
import Link from 'next/link';
import FreedomTrailEngine from "./FreedomTrailEngine";
import MBTAStatusBoard from "./MBTAStatusBoard";
import { 
  Landmark, GraduationCap, Utensils, 
  MapPin, ArrowLeft, ExternalLink,
  Anchor
} from "lucide-react";

export default function BostonPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-zinc-200 overflow-hidden font-serif selection:bg-red-900/50">
      
      {/* 1. VISUAL ENGINE */}
      <FreedomTrailEngine />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent opacity-90" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors font-sans">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold uppercase tracking-widest border border-amber-500/30 px-3 py-1 rounded-full bg-amber-900/20 backdrop-blur-md font-sans">
                <Anchor size={12} /> Est. 1630
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl mb-6 font-sans">
                    BOS<span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-amber-600">TON</span>
                </h1>
                <p className="text-lg text-zinc-300 leading-relaxed border-l-4 border-amber-600 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    The Hub of the Universe. A city where the cobblestones of the Revolution meet the fiber optics of MIT. Home to champions, scholars, and revolutionaries.
                </p>
                
                <div className="flex gap-4 mt-8 font-sans">
                     <a href="https://www.bostonusa.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-700 text-white font-bold uppercase rounded hover:bg-red-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-red-900/50">
                        Visit The Hub <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="w-full font-sans">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        Transit Authority Uplink
                    </div>
                </div>
                <MBTAStatusBoard />
            </div>
        </div>

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            {/* CARD 1: ACADEMIA */}
            <PortalCard 
                title="The Minds"
                icon={GraduationCap}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Harvard_gate.jpg/800px-Harvard_gate.jpg"
                desc="With over 35 colleges, including Harvard and MIT, the intellectual density here is unmatched. The ideas that shape the future are born here."
                links={[
                    { label: "Harvard University", href: "https://www.harvard.edu/" },
                    { label: "MIT", href: "https://www.mit.edu/" }
                ]}
            />

            {/* CARD 2: HISTORY */}
            <PortalCard 
                title="The History"
                icon={Landmark}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Old_North_Church_Boston.jpg/800px-Old_North_Church_Boston.jpg"
                desc="Walk the Freedom Trail. Stand where the massacre happened. See the lanterns of the Old North Church. History isn't in a museum; it's the street."
                links={[
                    { label: "Freedom Trail Info", href: "https://www.thefreedomtrail.org/" },
                    { label: "Faneuil Hall", href: "https://faneuilhallmarketplace.com/" }
                ]}
            />

            {/* CARD 3: FOOD */}
            <PortalCard 
                title="The Flavor"
                icon={Utensils}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cannoli.jpg/800px-Cannoli.jpg"
                desc="From the clam chowder of Union Oyster House to the legendary cannoli wars of the North End (Mike's vs Modern). Don't forget the Lobstah."
                links={[
                    { label: "Union Oyster House", href: "https://www.unionoysterhouse.com/" },
                    { label: "North End Guide", href: "https://www.northendboston.com/" }
                ]}
            />

        </div>
        
        {/* FOOTER FACT */}
        <div className="mt-16 p-6 border-t border-white/10 text-center font-sans">
            <p className="text-xs text-zinc-500 font-mono">
                DID YOU KNOW? The Boston Common (est. 1634) is the oldest public park in the United States.
            </p>
        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function PortalCard({ title, icon: Icon, img, desc, links }: any) {
    return (
        <div className="group relative h-[400px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-[#1e1b4b]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/30 backdrop-blur-md">
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6 line-clamp-3 font-medium">
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
                            <ExternalLink size={12} className="text-zinc-500 group-hover/link:text-white" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
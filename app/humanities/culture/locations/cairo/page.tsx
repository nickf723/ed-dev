"use client";
import React from 'react';
import Link from 'next/link';
import DesertHorizon from "./DesertHorizon";
import GizaNecropolis from "./GizaNecropolis";
import { 
  Pyramid, MapPin, ArrowLeft, ExternalLink,
  Sun, Scroll, ShoppingBag
} from "lucide-react";

export default function CairoPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-amber-50 overflow-hidden font-serif selection:bg-amber-900/50">
      
      {/* 1. VISUAL ENGINE */}
      <DesertHorizon />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-amber-400 transition-colors font-sans">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold uppercase tracking-widest border border-amber-900/30 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md font-sans">
                <Sun size={12} /> Est. 969 AD
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl mb-6 font-sans">
                    CAI<span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">RO</span>
                </h1>
                <p className="text-lg text-amber-100/80 leading-relaxed border-l-4 border-amber-600 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    The Mother of the World (Umm al-Dunya). A megalopolis where 20 million people live amidst the dust of pharaohs, the call of minarets, and the flow of the Nile.
                </p>
                
                <div className="flex gap-4 mt-8 font-sans">
                     <a href="https://www.experienceegypt.eg/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-amber-600 text-white font-bold uppercase rounded hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-amber-900/50">
                        Visit Egypt <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="w-full font-sans">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                        Satellite Archaeology
                    </div>
                </div>
                <GizaNecropolis />
            </div>
        </div>

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            {/* CARD 1: ANCIENT */}
            <PortalCard 
                title="The Ancients"
                icon={Pyramid}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg"
                desc="Stand before the Great Pyramid of Giza. Visit the Egyptian Museum to see the mask of Tutankhamun. The scale of history here is crushing."
                links={[
                    { label: "Giza Plateau", href: "https://egymonuments.gov.eg/" },
                    { label: "Grand Egyptian Museum", href: "https://grandegyptianmuseum.org/" }
                ]}
            />

            {/* CARD 2: ISLAMIC CAIRO */}
            <PortalCard 
                title="The City"
                icon={ShoppingBag}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Khan_El_Khalili_Market.jpg/800px-Khan_El_Khalili_Market.jpg"
                desc="Get lost in the Khan el-Khalili bazaar. Smell the spices, haggle for lanterns, and walk the medieval streets of Al-Muizz, the greatest open-air museum of Islamic art."
                links={[
                    { label: "Khan el-Khalili", href: "https://www.lonelyplanet.com/egypt/cairo/attractions/khan-al-khalili/a/poi-sig/1005888/355225" },
                    { label: "Al-Azhar Park", href: "https://www.azharpark.com/" }
                ]}
            />

            {/* CARD 3: THE NILE */}
            <PortalCard 
                title="The River"
                icon={Scroll}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Nile_River_in_Cairo.jpg/800px-Nile_River_in_Cairo.jpg"
                desc="The lifeblood of civilization. Take a Felucca (traditional sailboat) at sunset and watch the chaotic city fade into a peaceful silhouette."
                links={[
                    { label: "Nile Cruises", href: "https://www.memphistours.com/Egypt/Egypt-Cruises/Nile-Cruises" },
                    { label: "Cairo Tower", href: "https://www.cairotower.net/" }
                ]}
            />

        </div>
        
        {/* FOOTER FACT */}
        <div className="mt-16 p-6 border-t border-amber-900/30 text-center font-sans">
            <p className="text-xs text-amber-800 font-mono">
                DID YOU KNOW? The Great Pyramid was originally covered in polished white limestone, shining like a gem in the desert.
            </p>
        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function PortalCard({ title, icon: Icon, img, desc, links }: any) {
    return (
        <div className="group relative h-[400px] bg-[#1c1917] border border-amber-900/20 rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/30 backdrop-blur-md">
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-amber-50 uppercase mb-2 group-hover:text-amber-400 transition-colors">{title}</h3>
                <p className="text-xs text-amber-200/70 leading-relaxed mb-6 line-clamp-3 font-medium">
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
                            className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-bold text-amber-100 uppercase tracking-wide group/link"
                        >
                            {link.label}
                            <ExternalLink size={12} className="text-amber-700 group-hover/link:text-amber-100" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
"use client";
import React from 'react';
import Link from 'next/link';
import FlatironsEngine from "./FlatironsEngine";
import TrailMaster from "./TrailMaster";
import { 
  Mountain, Microscope, ShoppingBag, 
  ArrowLeft, ExternalLink, CloudSun
} from "lucide-react";

export default function BoulderPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-stone-200 overflow-hidden font-sans selection:bg-orange-900/50">
      
      {/* 1. VISUAL ENGINE */}
      <FlatironsEngine />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent opacity-90" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
            <Link href="/humanities/culture/locations" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Map
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-orange-400 font-bold uppercase tracking-widest border border-orange-500/30 px-3 py-1 rounded-full bg-stone-900/50 backdrop-blur-md">
                <Mountain size={12} /> Elev. 5,430′
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl mb-6">
                    BOUL<span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-stone-500">DER</span>
                </h1>
                <p className="text-lg text-stone-300 leading-relaxed border-l-4 border-orange-600 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    The fittest city in America. A place where atmospheric scientists hike 14ers before breakfast, and downtown is paved with bricks and street performers.
                </p>
                
                <div className="flex gap-4 mt-8">
                     <a href="https://www.bouldercoloradousa.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-stone-800 text-white font-bold uppercase rounded hover:bg-stone-700 transition-colors flex items-center gap-2 border border-stone-600 shadow-lg">
                        Visit Boulder <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="w-full">
                <div className="mb-2 flex justify-between items-end">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                        Terrain Analysis
                    </div>
                </div>
                <TrailMaster />
            </div>
        </div>

        {/* DEEP DIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: OUTDOORS */}
            <PortalCard 
                title="The Rock"
                icon={Mountain}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Chautauqua_Park_Boulder.jpg/800px-Chautauqua_Park_Boulder.jpg"
                desc="Chautauqua Park is the living room of Boulder. From here, tackle the Royal Arch or free-solo the Flatirons (if you dare)."
                links={[
                    { label: "Chautauqua Park", href: "https://bouldercolorado.gov/locations/chautauqua-park" },
                    { label: "Eldorado Canyon", href: "https://cpw.state.co.us/placestogo/parks/EldoradoCanyon" }
                ]}
            />

            {/* CARD 2: SCIENCE */}
            <PortalCard 
                title="The Lab"
                icon={Microscope}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NCAR_Mesa_Lab.jpg/800px-NCAR_Mesa_Lab.jpg"
                desc="Home to NCAR, NOAA, and NIST. The Mesa Lab, designed by I.M. Pei, sits in the foothills like a fortress of science, studying the atmosphere."
                links={[
                    { label: "NCAR Mesa Lab", href: "https://scied.ucar.edu/visit" },
                    { label: "NIST Boulder", href: "https://www.nist.gov/campus-access/boulder-campus" }
                ]}
            />

            {/* CARD 3: PEARL STREET */}
            <PortalCard 
                title="The Street"
                icon={ShoppingBag}
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Pearl_Street_Mall%2C_Boulder.jpg/800px-Pearl_Street_Mall%2C_Boulder.jpg"
                desc="A four-block pedestrian mall filled with tulips, street performers, and microbreweries. The social heart of the People's Republic of Boulder."
                links={[
                    { label: "Downtown Boulder", href: "https://boulderdowntown.com/" },
                    { label: "Boulder Theaters", href: "https://www.bouldertheater.com/" }
                ]}
            />

        </div>
        
        {/* FOOTER FACT */}
        <div className="mt-16 p-6 border-t border-stone-800 text-center">
            <p className="text-xs text-stone-500 font-mono">
                DID YOU KNOW? Boulder has controlled urban sprawl by purchasing over 45,000 acres of open space surrounding the city.
            </p>
        </div>

      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function PortalCard({ title, icon: Icon, img, desc, links }: any) {
    return (
        <div className="group relative h-[400px] bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-end shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <div className="w-10 h-10 rounded-lg bg-orange-900/40 text-orange-500 flex items-center justify-center mb-4 border border-orange-500/30 backdrop-blur-md">
                    <Icon size={20} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-orange-500 transition-colors">{title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-6 line-clamp-3 font-medium">
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
                            <ExternalLink size={12} className="text-stone-500 group-hover/link:text-white" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}